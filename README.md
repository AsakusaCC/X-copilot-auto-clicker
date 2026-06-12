# X Copilot Auto-Clicker 🤖

An unofficial automation snippet for the [X Copilot](https://github.com/baryon/x-copilot) Chrome Extension to batch-sync historical likes.

### 🚀 How to Use

> ⚠️ **CRITICAL:** Do NOT open Console on the main Twitter page. Follow the steps below so the popup won't auto-close.

1. Click the **X Copilot** icon to open the popup panel.
2. Right-click **inside the popup**, and select **Inspect (检查)**.
3. Switch to the **Console** tab in the newly opened window.
4. Copy all code from [`index.js`](./index.js), paste it into the Console, and press **Enter**.

*Note: Keep the popup open while the script is running. Do not click outside.*

### ⏱️ Running Logic
* **Initial Sleep:** Sleeps for 50s right after clicking to give the extension enough time to sync.
* **Status Check:** Checks the button status every 10s until the sync is complete.
* **Interval Breaks:** Adds a 5-10s pause between regular batches, and a 60-90s pause every 5 cycles (~100 tweets).
