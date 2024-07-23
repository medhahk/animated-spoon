let timerInterval = null;
let timeElapsed = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        timeElapsed += 10; // Update every 10 seconds
        chrome.runtime.sendMessage({ action: "updateTime", timeElapsed: 10 });
      }, 10000); // 10 seconds in milliseconds
    }
  }
});
