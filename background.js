const axios = require("axios");

const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/engines/davinci/completions"; // Use the endpoint for GPT-3 completions

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.keywords) {
    const text = message.keywords.join("\n");
    const maxTokens = 50; // You can adjust this to control the response length

    const response = await axios.post(
      apiUrl,
      {
        prompt: `Extract keywords from the following text:\n\n${text}`,
        max_tokens: maxTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const generatedKeywords = response.data.choices[0].text.trim().split("\n");
    chrome.action.setBadgeText({ text: generatedKeywords.length.toString() });
  }
});
