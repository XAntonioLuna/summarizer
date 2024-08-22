(() => {
  // Send the tab content back to the extensions
  function notifyExtension(content) {
    browser.runtime.sendMessage({ page_content: content });
  }

  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function readPageContent() {
    return document.body.innerText;
  }

  const content = readPageContent();
  notifyExtension(content);
})();
