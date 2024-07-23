let activeTabId = null;
let timeSpent = {};

chrome.tabs.onActivated.addListener((tab) => {
  activeTabId = tab.tabId.toString();
  if (!timeSpent[activeTabId]) {
    timeSpent[activeTabId] = 0;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId.toString() === activeTabId && changeInfo.status === "complete") {
    chrome.tabs.sendMessage(tabId, { action: "startTimer" });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateTime") {
    timeSpent[activeTabId] += message.timeElapsed;
    sendResponse({ timeSpent: timeSpent[activeTabId] });
  }
});
