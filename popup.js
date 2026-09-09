function withActiveTab(fn) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || tab.id == null) {
      document.getElementById("status").textContent = "No tab";
      return;
    }
    fn(tab);
  });
}

function ensureContentScript(tabId, done) {
  chrome.tabs.sendMessage(tabId, { action: "ping" }, (response) => {
    if (chrome.runtime.lastError || !response) {
      chrome.scripting.executeScript(
        { target: { tabId }, files: ["content.js"] },
        () => done(Boolean(!chrome.runtime.lastError))
      );
      return;
    }
    done(true);
  });
}

document.getElementById("startBtn").addEventListener("click", () => {
  const delay = parseInt(document.getElementById("delay").value, 10);

  if (delay < 100 || delay > 5000) {
    alert("Delay must be between 100ms and 5000ms");
    return;
  }

  withActiveTab((tab) => {
    if (!tab.url || !tab.url.includes("linkedin.com")) {
      document.getElementById("status").textContent = "Open LinkedIn";
      document.getElementById("status").style.color = "#dc3545";
      return;
    }

    ensureContentScript(tab.id, (ok) => {
      if (!ok) {
        document.getElementById("status").textContent = "Inject failed";
        document.getElementById("status").style.color = "#dc3545";
        return;
      }

      chrome.tabs.sendMessage(
        tab.id,
        { action: "startClicking", delay },
        (response) => {
          if (chrome.runtime.lastError) {
            document.getElementById("status").textContent = "Unavailable";
            document.getElementById("status").style.color = "#dc3545";
            return;
          }
          if (response && (response.status === "started" || response.status === "already_running")) {
            document.getElementById("startBtn").disabled = true;
            document.getElementById("stopBtn").disabled = false;
            document.getElementById("status").textContent =
              response.status === "already_running" ? "Already running" : "Running...";
            document.getElementById("status").style.color = "#28a745";
          }
        }
      );
    });
  });
});

document.getElementById("stopBtn").addEventListener("click", () => {
  withActiveTab((tab) => {
    chrome.tabs.sendMessage(tab.id, { action: "stopClicking" }, (response) => {
      if (chrome.runtime.lastError) {
        document.getElementById("status").textContent = "Unavailable";
        document.getElementById("status").style.color = "#dc3545";
        return;
      }
      if (response && response.status === "stopped") {
        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        document.getElementById("status").textContent = "Stopped";
        document.getElementById("status").style.color = "#dc3545";
      }
    });
  });
});

chrome.runtime.onMessage.addListener((request) => {
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

chrome.storage.sync.get(["delay"], (result) => {
  if (result.delay) {
    document.getElementById("delay").value = result.delay;
  }
});

document.getElementById("delay").addEventListener("change", (e) => {
  chrome.storage.sync.set({ delay: e.target.value });
});

chrome.storage.sync.get(["clicked", "remaining"], (result) => {
  if (result.clicked !== undefined) {
    document.getElementById("clicked").textContent = result.clicked;
  }
  if (result.remaining !== undefined) {
    document.getElementById("remaining").textContent = result.remaining;
  }
});
