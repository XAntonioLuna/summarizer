function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    apiKey: document.querySelector("#api-key").value,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#api-key").value = result.apiKey || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("apiKey");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
