/**
 * This function will open given url in new tab
 * @param url
 */
const openInNewTab = (url: string) => {
  window.open(url, '_blank');
};

export default openInNewTab;
