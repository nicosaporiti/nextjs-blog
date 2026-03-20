import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import slug from 'remark-slug';

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

export function extractHeadings(contentHtml) {
  const headings = [];
  const regex = /<(h[23])\s+id="([^"]*)"[^>]*>(.*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(contentHtml)) !== null) {
    headings.push({
      level: match[1] === 'h2' ? 2 : 3,
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''),
    });
  }
  return headings;
}

function normalizeTags(tags) {
  return Array.isArray(tags) ? tags : [];
}

function countSharedTags(leftTags, rightTags) {
  const rightSet = new Set(normalizeTags(rightTags));
  return normalizeTags(leftTags).filter(tag => rightSet.has(tag)).length;
}

export function getRelatedPosts(currentId, category, tags, limit = 2) {
  const allPosts = getSortedPostsData();
  return allPosts
    .filter(post => post.id !== currentId)
    .map(post => {
      const sharedTags = countSharedTags(tags, post.tags);
      const sameCategory = post.category === category ? 1 : 0;
      const score = sameCategory * 10 + sharedTags * 3;

      return {
        ...post,
        score,
        sharedTags,
        sameCategory,
      };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.sameCategory !== left.sameCategory) {
        return right.sameCategory - left.sameCategory;
      }

      if (right.sharedTags !== left.sharedTags) {
        return right.sharedTags - left.sharedTags;
      }

      return right.date.localeCompare(left.date);
    })
    .slice(0, limit)
    .map(({ score, sharedTags, sameCategory, ...post }) => post);
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
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

  const matterResult = matter(fileContents);
  const markdownContent = prepareMarkdownContent(matterResult.content);

  const processedContent = await remark()
    .use(gfm)
    .use(slug)
    .use(html)
    .process(markdownContent);
  const contentHtml = renderTweetEmbeds(processedContent.toString());

  const headings = extractHeadings(contentHtml);
  const relatedPosts = getRelatedPosts(id, matterResult.data.category, matterResult.data.tags);

  return {
    id,
    contentHtml,
    headings,
    relatedPosts,
    ...matterResult.data,
  };
}
