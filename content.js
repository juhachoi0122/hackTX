const keywords = document.body.innerText
  .split(/\s+/)
  .filter((word) => word.length > 3); // Filter out short words

chrome.runtime.sendMessage({ keywords });
