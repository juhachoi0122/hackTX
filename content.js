// content.js

// Function to capture user input on the web page
function captureUserInput() {
  // Your code to capture user input here.
  // This could involve selecting a specific element or listening for user interactions.
  // For this example, we'll capture text from the first paragraph on the page.
  const userInput = document.querySelector('p:first-of-type').textContent;

  // Send the user input to the background script
  chrome.runtime.sendMessage({ userInput }, response => {
    // Handle the response from the background script if needed.
  });
}

// Add a listener to run the captureUserInput function when the extension icon is clicked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'userClicked') {
    captureUserInput();
  }
});