async function openAIRequest(apiKey, pageContent) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Summarize the following content " + pageContent,
        },
      ],
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return response;
}

async function updateSummary(pageMessage) {
  try {
    // Update user on status
    document.getElementById("page-content").innerText = "Loading summary...";

    // Try fetching the API key
    const { apiKey } = await browser.storage.sync.get("apiKey");

    // Issue request to open AI
    const response = await openAIRequest(apiKey, pageMessage.page_content);
    const jsonResponse = await response.json();

    // Parse and update result
    processOpenAIResponse(jsonResponse);
  } catch (error) {
    document.getElementById(
      "page-content"
    ).innerText = `Failed to update summary. ${error}`;
  }
}

function processOpenAIResponse(jsonResponse) {
  const result = jsonResponse.choices[0].message.content;
  document.getElementById("page-content").innerText = result;
}

// Create a listener that will wait for the page content to be fetched
browser.runtime.onMessage.addListener(updateSummary);

// Inject the content script to the tab
browser.tabs.executeScript({ file: "/content/share_content.js" });
