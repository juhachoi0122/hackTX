document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate');
    const inputTextarea = document.getElementById('input');
    const summaryDiv = document.getElementById('summary');
  
    generateButton.addEventListener('click', async function() {
      const inputText = inputTextarea.value;
      if (inputText.trim() === '') {
        summaryDiv.textContent = 'Enter text:';
        return;
      }
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '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'
        },
        body: JSON.stringify({
          'messages': [{'role': 'system', 'content': 'You: ' + inputText}, {'role': 'system', 'content': 'You: Generate a 10-word summary.'}],
          'max_tokens': 10
        })
      });
  
      const data = await response.json();
      const summary = data.choices[0].message.content;
      summaryDiv.textContent = summary;
    });
  });  