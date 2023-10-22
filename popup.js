document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generateSummary');
  const inputTextarea = document.getElementById('userInput');
  const summaryDiv = document.getElementById('summary');

  generateButton.addEventListener('click', async function() {
    const inputText = inputTextarea.value;
    console.log("HAHAHAHAH "+inputText);
    if (inputText.trim() === '') {
      summaryDiv.textContent = summaryDiv;
      return;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'enter your own API key' //need to be adjusted by user
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo', // Specify the model you want to use
        'messages': [
          {'role': 'system', 'content': 'You: ' + inputText},
          {'role': 'system', 'content': 'You: Generate a 10-word summary.'}
        ],
        'max_tokens': 20
      })
    });
    
    console.log(JSON.stringify({
      'messages': [{'role': 'system', 'content': 'You: ' + inputText}, {'role': 'system', 'content': 'You: Generate a 10-word summary.'}],
      'max_tokens': 20
    }));
    const data = await response.json();
console.log(data); // Log the data to the console

// Access specific properties of the data object
const summary = data.choices[0].message.content;
console.log(summary); // Log the summary to the console
summaryDiv.textContent = summary;
    
  });
}); 
