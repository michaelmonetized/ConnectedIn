# ConnectedIn Installation Guide

## Quick Start (2 minutes)

### Step 1: Download the Extension
```bash
# Clone the repository
git clone https://github.com/michaelmonetized/ConnectedIn.git
cd ConnectedIn
```

Or download the ZIP from GitHub and extract it.

### Step 2: Load into Chrome

1. **Open Chrome Extensions:**
   - Go to `chrome://extensions/` in your browser
   - OR click menu (⋮) → More tools → Extensions

2. **Enable Developer Mode:**
   - Toggle **Developer mode** in the top right corner

3. **Load the Extension:**
   - Click **Load unpacked**
   - Select the `ConnectedIn` folder you just downloaded
   - Wait a few seconds for it to load

4. **Verify Installation:**
   - You should see "ConnectedIn" in your extensions list
   - A puzzle icon should appear in your Chrome toolbar

### Step 3: Use It

1. **Go to LinkedIn Recommendations:**
   - Navigate to [LinkedIn People Search](https://www.linkedin.com/search/results/people/)
   - Or any LinkedIn page with "Connect" buttons

2. **Click the Extension Icon:**
   - Find the ConnectedIn puzzle icon in your toolbar
   - Click it to open the popup

3. **Configure and Start:**
   - Adjust the **Delay** if needed (default 500ms is safe)
   - Click **Start Clicking**
   - Watch the progress stats update

4. **Stop Anytime:**
   - Click the **Stop** button in the popup

## Configuration

### Delay Settings

| Delay | Speed | Safety | Recommendation |
|-------|-------|--------|-----------------|
| 100-200ms | Very Fast | ⚠️ Risky | Not recommended |
| 250-400ms | Fast | ⚠️ Moderate risk | If you know limits |
| 500-800ms | Balanced | ✅ Safe | **Recommended** |
| 1000-2000ms | Slow | ✅ Very Safe | Conservative users |

**LinkedIn's limit:** ~1,100 connections/week (Monday-Sunday reset)

### Save Settings
Your delay preference is automatically saved. It will be remembered next time you use the extension.

## Troubleshooting

### "Extension not found" or "Not installed"
- Make sure **Developer mode** is ON (chrome://extensions/)
- Try clicking "Load unpacked" again
- Select the exact folder where you extracted ConnectedIn

### "No buttons found to click"
- Make sure you're on a LinkedIn page with connection recommendations
- Try LinkedIn's People Search: https://www.linkedin.com/search/results/people/
- Wait a moment for the page to fully load before clicking Start

### "Buttons aren't being clicked"
- Check the browser console (F12 → Console tab)
- Look for messages like `[ConnectedIn] Clicked 1: "Connect"`
- LinkedIn's page structure might have changed — report an issue

### Extension disappeared from toolbar
- Go to chrome://extensions/
- Look for ConnectedIn in the list
- If it's not there, re-load it using "Load unpacked"

### Rate-limited (can't connect anymore)
- You've hit LinkedIn's weekly limit (~1,100 connections)
- Wait until Monday for the limit to reset
- Check your LinkedIn settings to see remaining connections

### Want to update the extension
1. Download the latest version from GitHub
2. Go to chrome://extensions/
3. Click the refresh icon next to ConnectedIn
4. Or remove it and re-load the new version

## Advanced Usage

### Monitor Activity
- Open browser console: **F12** or **⌘+Option+J** (Mac)
- Switch to **Console** tab
- You'll see messages like:
  ```
  [ConnectedIn] Clicked 1: "Connect"
  [ConnectedIn] Clicked 2: "Connect"
  [ConnectedIn] Finished. Clicked 47 buttons.
  ```

### Check Progress
- The popup always shows:
  - **Status:** Ready, Running, Stopped, Finished
  - **Clicked:** Number of connections sent this session
  - **Remaining:** Approximate buttons still available

### Spread Connections Over Time
Instead of clicking 1,100 all at once:
1. Run the extension for 5-10 minutes
2. Wait 30 minutes or longer
3. Run again on a different LinkedIn page
4. Repeat throughout the week

This avoids raising any rate-limit flags.

## Uninstall

1. Go to `chrome://extensions/`
2. Find **ConnectedIn** in the list
3. Click the **Remove** button
4. Confirm

You can always reinstall later by loading the folder again.

## Support

**Something not working?**
- Check the [README.md](README.md) for more details
- Open an issue on [GitHub](https://github.com/michaelmonetized/ConnectedIn/issues)
- Make sure you're on a LinkedIn page with "Connect" buttons

**Legal Note:**
This extension is for personal use. LinkedIn's ToS generally don't allow automation, but using your own account to send your own connection requests is usually acceptable. Use responsibly and don't share your account.

---

**Happy connecting! 🔗**
