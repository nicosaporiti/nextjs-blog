import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), "posts");
const TWEET_PLACEHOLDER_PREFIX = "TWEET_EMBED::";

function normalizeTweetUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.toLowerCase();
    const isTwitterHost =
      hostname === "twitter.com" ||
      hostname === "www.twitter.com" ||
      hostname === "mobile.twitter.com" ||
      hostname === "x.com" ||
      hostname === "www.x.com";

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
      return tweetUrl ? `\n\n${encodeTweetPlaceholder(tweetUrl)}\n\n` : "";
    }
  );
}

function escapeHtmlAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function renderTweetEmbeds(contentHtml) {
  return contentHtml.replace(
    new RegExp(`<p>${TWEET_PLACEHOLDER_PREFIX}([^<]+)<\\/p>`, "g"),
    (_, encodedUrl) => {
      const tweetUrl = decodeURIComponent(encodedUrl);
      return `<blockquote class="twitter-tweet"><a href="${escapeHtmlAttribute(tweetUrl)}"></a></blockquote>`;
    }
  );
}

function prepareMarkdownContent(markdown) {
  return replaceTweetEmbedHtml(markdown);
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const markdownContent = prepareMarkdownContent(matterResult.content);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(markdownContent);
  const contentHtml = renderTweetEmbeds(processedContent.toString());

  // Combine the data whith the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
