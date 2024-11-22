function saveOptions(e) {
  e.preventDefault();
  browser.storage.local
    .set({
      apiKey: document.querySelector("#api-key").value,
    })
    .catch((error) => console.error("Failed to save options:", error));
}

function restoreOptions() {
  browser.storage.local
    .get("apiKey")
    .then((result) => {
      document.querySelector("#api-key").value = result.apiKey || "";
    })
    .catch((error) => console.error("Failed to restore options:", error));
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
