document.getElementById("startBtn").addEventListener("click", () => {
  const delay = parseInt(document.getElementById("delay").value);
  
  if (delay < 100 || delay > 5000) {
    alert("Delay must be between 100ms and 5000ms");
    return;
  }
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {action: "startClicking", delay},
      (response) => {
        if (response && response.status === "started") {
          document.getElementById("startBtn").disabled = true;
          document.getElementById("stopBtn").disabled = false;
          document.getElementById("status").textContent = "Running...";
          document.getElementById("status").style.color = "#28a745";
        }
      }
    );
  });
});

document.getElementById("stopBtn").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "stopClicking"}, (response) => {
      if (response && response.status === "stopped") {
        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("status").textContent = "Stopped";
        document.getElementById("status").style.color = "#dc3545";
      }
    });
  });
});

// Listen for updates from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "updateStats") {
    document.getElementById("clicked").textContent = request.clicked;
    document.getElementById("remaining").textContent = request.remaining;
  } else if (request.type === "finished") {
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("status").textContent = "Finished";
    document.getElementById("status").style.color = "#0a66c2";
  }
});

// Load saved settings
chrome.storage.sync.get(["delay"], (result) => {
  if (result.delay) {
    document.getElementById("delay").value = result.delay;
  }
});

// Save settings on change
document.getElementById("delay").addEventListener("change", (e) => {
  chrome.storage.sync.set({delay: e.target.value});
});

// Load stats on popup open
chrome.storage.sync.get(["clicked", "remaining"], (result) => {
  if (result.clicked !== undefined) {
    document.getElementById("clicked").textContent = result.clicked;
  }
  if (result.remaining !== undefined) {
    document.getElementById("remaining").textContent = result.remaining;
  }
});
