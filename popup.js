document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getKeywords,
    });
  });
});

function getKeywords() {
  chrome.runtime.sendMessage({ action: "getKeywords" });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayKeywords") {
    const keywordList = document.getElementById("keywordList");
    keywordList.innerHTML = ""; // Clear previous keywords

    if (message.keywords.length === 0) {
      const noKeywordsText = document.createElement("p");
      noKeywordsText.textContent = "No keywords found on this page.";
      keywordList.appendChild(noKeywordsText);
    } else {
      message.keywords.forEach((keyword) => {
        const li = document.createElement("li");
        li.textContent = keyword;
        keywordList.appendChild(li);
      });
    }
  }
});