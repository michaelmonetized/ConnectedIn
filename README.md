# ConnectedIn — LinkedIn Auto-Connect Chrome Extension

**Automatically click Connect buttons on LinkedIn recommendations with smart rate-limiting.**

## Features

✅ **Auto-Click Connect Buttons** — Find all "Connect" buttons and click them automatically  
✅ **Smart Delays** — Configurable delays (100-5000ms) to avoid LinkedIn rate-limiting  
✅ **Progress Tracking** — See how many connects have been sent  
✅ **Easy Controls** — One-click start/stop from the popup  
✅ **Persistent Settings** — Your preferences are saved across sessions  
✅ **Rate-Limit Aware** — Built-in warning about LinkedIn's ~1,100 connects/week limit  

## Installation

1. **Clone or download this repo:**
   ```bash
   git clone https://github.com/michaelmonetized/ConnectedIn.git
   cd ConnectedIn
   ```

2. **Load in Chrome:**
   - Go to `chrome://extensions/`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked**
   - Select the `ConnectedIn` folder

3. **Done!** The extension icon appears in your Chrome toolbar

## Usage

1. Go to [LinkedIn recommendations page](https://www.linkedin.com/search/results/people/?keywords=&origin=SWITCH_SEARCH_VERTICAL&sid=*) or any page with connection recommendations

2. Click the **ConnectedIn** extension icon

3. Adjust the delay if needed (default 500ms is safe):
   - **100-300ms** — Fast (risky, may hit rate limits)
   - **300-800ms** — Balanced (recommended)
   - **800-5000ms** — Slow (safe, takes longer)

4. Click **Start Clicking**

5. Watch the stats update as connections are sent

6. Click **Stop** anytime to pause

## ⚠️ Important Notes

### LinkedIn Rate Limits
- **~1,100 connections per week** (Monday-Sunday)
- Once you hit the limit, you're blocked until the next week
- Don't run continuously — spread connections across multiple sessions

### Safe Usage Tips
- Use **300-800ms delays** (don't go too fast)
- Run during **off-peak hours** (fewer API calls = less rate-limiting)
- Take **breaks between sessions** (don't click 1,100 in one sitting)
- Monitor your **weekly connection limit** on LinkedIn
- If rate-limited, **wait until Monday** for the limit to reset

### LinkedIn ToS
This tool is for personal use on your own account. LinkedIn's ToS generally don't allow automation, but using your own account with your own actions is generally acceptable. Use responsibly.

## How It Works

1. **Content Script** — Runs on LinkedIn pages, finds all `<button>` elements
2. **Filter Logic** — Only clicks buttons with text "Connect" (ignores "Pending", etc.)
3. **Smart Delays** — Waits between clicks to avoid rate-limiting
4. **Progress Tracking** — Updates the popup with stats in real-time
5. **Persistence** — Saves settings and stats across sessions

## File Structure

```
ConnectedIn/
├── manifest.json          # Extension configuration
├── popup.html            # Extension UI
├── popup.js              # Popup controls and stats
├── content.js            # Auto-clicker logic (runs on LinkedIn)
├── README.md             # This file
└── images/               # Extension icons
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

## Customization

### Change Default Delay
Edit `popup.html` and change the `value` attribute:
```html
<input type="number" id="delay" value="500" ...>
```

### Change Button Selector
Edit `content.js` and modify the selector:
```javascript
const buttons = document.querySelectorAll('button[type="button"]');
```

### Add Logging
Check browser console (`F12`) to see:
```
[ConnectedIn] Clicked 1: "Connect"
[ConnectedIn] Clicked 2: "Connect"
...
[ConnectedIn] Finished. Clicked 47 buttons.
```

## Troubleshooting

### "No buttons found"
- Make sure you're on a LinkedIn page with connection recommendations
- LinkedIn's page structure might have changed — check the button selector

### "Delay seems too slow"
- You can go as low as 100ms, but risk rate-limiting
- Try 250-400ms if you want speed with moderate safety

### Extension not appearing
- Make sure Developer mode is enabled (`chrome://extensions/`)
- Try refreshing the LinkedIn page after loading the extension

### Already rated-limited?
- Wait until Monday (weekly reset)
- Check LinkedIn's connection limit in settings

## Development

### Requirements
- Chrome browser with developer mode enabled
- Basic JavaScript knowledge

### Making Changes
1. Edit files (`.js`, `.html`)
2. Go to `chrome://extensions/`
3. Click the refresh icon next to ConnectedIn
4. Test on a LinkedIn page

## Version

**v1.0.0** — Initial release  
March 21, 2026

## License

MIT — Use freely, modify as needed

## Support

Found a bug? Want a feature?
- Open an issue on GitHub
- Check the browser console for error messages
- LinkedIn's page structure might change — update selectors if needed

---

**Happy connecting! 🔗**
