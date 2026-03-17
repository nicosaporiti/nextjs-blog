const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');
const SITE_URL = 'https://blog.saporiti.cl';
const TWEET_PLACEHOLDER_PREFIX = 'TWEET_EMBED::';

function normalizeTweetUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.toLowerCase();
    const isTwitterHost =
      hostname === 'twitter.com' ||
      hostname === 'www.twitter.com' ||
      hostname === 'mobile.twitter.com' ||
      hostname === 'x.com' ||
      hostname === 'www.x.com';

    if (!isTwitterHost) {
      return null;
    }

    const statusMatch = url.pathname.match(/^\/([A-Za-z0-9_]+)\/status\/(\d+)\/?$/);
    if (!statusMatch) {
      return null;
    }

    const [, username, statusId] = statusMatch;
    return `https://twitter.com/${username}/status/${statusId}`;
  } catch {
    return null;
  }
}

function encodeTweetPlaceholder(tweetUrl) {
  return `${TWEET_PLACEHOLDER_PREFIX}${encodeURIComponent(tweetUrl)}`;
}

function replaceTweetEmbedHtml(markdown) {
  return markdown.replace(
    /<blockquote[^>]*class=["'][^"']*twitter-tweet[^"']*["'][^>]*>[\s\S]*?<a[^>]*href=["']([^"']+)["'][^>]*>[\s\S]*?<\/blockquote>\s*(?:<script[^>]*src=["']https:\/\/platform\.twitter\.com\/widgets\.js["'][^>]*><\/script>)?/gi,
    (_, rawUrl) => {
      const tweetUrl = normalizeTweetUrl(rawUrl);
      return tweetUrl ? `\n\n${encodeTweetPlaceholder(tweetUrl)}\n\n` : '';
    }
  );
}

function escapeHtmlAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function renderTweetEmbeds(contentHtml) {
  return contentHtml.replace(
    new RegExp(`<p>${TWEET_PLACEHOLDER_PREFIX}([^<]+)<\\/p>`, 'g'),
    (_, encodedUrl) => {
      const tweetUrl = decodeURIComponent(encodedUrl);
      return `<blockquote class="twitter-tweet"><a href="${escapeHtmlAttribute(tweetUrl)}"></a></blockquote>`;
    }
  );
}

function prepareMarkdownContent(markdown) {
  return replaceTweetEmbedHtml(markdown);
}

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
      const markdownContent = prepareMarkdownContent(matterResult.content);

      const processedContent = await remark()
        .use(gfm)
        .use(html)
        .process(markdownContent);
      const contentHtml = renderTweetEmbeds(processedContent.toString());

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
