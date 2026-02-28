const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');
const SITE_URL = 'https://blog.saporiti.cl';

async function getPostsWithContent() {
  const remark = (await import('remark')).default;
  const html = (await import('remark-html')).default;
  const gfm = (await import('remark-gfm')).default;

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const processedContent = await remark()
        .use(gfm)
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      return { id, contentHtml, ...matterResult.data };
    })
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateRss() {
  const posts = await getPostsWithContent();

  const items = posts
    .map((post) => {
      const pubDate = new Date(post.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/posts/${post.id}</link>
      <guid>${SITE_URL}/posts/${post.id}</guid>
      <description>${escapeXml(post.resume || '')}</description>
      <content:encoded><![CDATA[${post.contentHtml}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author || 'Nicolás Saporiti')}</author>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>BLOG de Nicolás Saporiti</title>
    <link>${SITE_URL}</link>
    <description>Blog de Nicolás Saporiti</description>
    <language>es</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  const outputPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(outputPath, rss, 'utf8');
  console.log(`RSS feed generated at ${outputPath}`);
}

generateRss();
