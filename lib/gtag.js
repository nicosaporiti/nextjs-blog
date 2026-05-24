export const GA_ID = 'G-PXKER2TTH1';

function compactAnalyticsParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}

function getPageLocation(pagePath) {
  return `${window.location.origin}${pagePath}`;
}

function queueGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag.apply(null, arguments);
}

export function sendPageView(pagePath, pageProps = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const postData = pageProps.postData;
  const normalizedPath = pagePath || `${window.location.pathname}${window.location.search}`;
  const articleTags = Array.isArray(postData?.tags) ? postData.tags.join(',') : undefined;

  queueGtag(
    'event',
    'page_view',
    compactAnalyticsParams({
      send_to: GA_ID,
      page_path: normalizedPath,
      page_location: getPageLocation(normalizedPath),
      page_title: postData?.title || document.title,
      content_type: postData ? 'post' : normalizedPath === '/' ? 'home' : 'page',
      content_group: postData?.category,
      article_id: postData?.id,
      article_title: postData?.title,
      article_category: postData?.category,
      article_tags: articleTags,
    })
  );
}
