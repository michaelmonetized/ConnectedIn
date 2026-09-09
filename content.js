let isRunning = false;
let clickCount = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ping") {
    sendResponse({status: "ready"});
    return;
  }

  if (request.action === "startClicking") {
    if (isRunning) {
      sendResponse({status: "already_running", count: clickCount});
      return;
    }
    
    isRunning = true;
    clickCount = 0;
    clickConnectButtons(request.delay);
    sendResponse({status: "started", count: 0});
  } else if (request.action === "stopClicking") {
    isRunning = false;
    sendResponse({status: "stopped", count: clickCount});
  }
});

function clickConnectButtons(delay) {
  const buttons = document.querySelectorAll('button[type="button"]');
  let index = 0;
  
  function clickNext() {
    if (!isRunning || index >= buttons.length) {
      console.log(`[ConnectedIn] Finished. Clicked ${clickCount} buttons.`);
      isRunning = false;
      chrome.runtime.sendMessage({
        type: "finished",
        totalClicked: clickCount
      }).catch(() => {
        // Popup might be closed, ignore
      });
      return;
    }
    
    const button = buttons[index];
    const buttonText = button.innerText.trim().toLowerCase();
    
    // Check if button text is "connect" and doesn't already have pending status
    if (buttonText === "connect" && !button.innerText.includes("Pending")) {
      try {
        button.click();
        clickCount++;
        console.log(`[ConnectedIn] Clicked ${clickCount}: "${button.innerText}"`);
        
        // Update popup with stats
        chrome.runtime.sendMessage({
          type: "updateStats",
          clicked: clickCount,
          remaining: buttons.length - index - 1
        }).catch(() => {
          // Popup might be closed, ignore
        });
        
        // Save stats
        chrome.storage.sync.set({
          clicked: clickCount,
          remaining: buttons.length - index - 1
        });
      } catch (e) {
        console.error(`[ConnectedIn] Error clicking button:`, e);
      }
    }
    
    index++;
    
    // Only continue if still running
    if (isRunning) {
      setTimeout(clickNext, delay);
    }
  }
  
  clickNext();
}

// Log when content script loads
console.log("[ConnectedIn] Content script loaded. Ready to auto-connect on LinkedIn.");
