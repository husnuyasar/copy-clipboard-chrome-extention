chrome.runtime.onInstalled.addListener(() => {
    console.log('Copy Tracker Extension Installed!');
    injectAllTabs(); // Inject content script into all existing tabs
});

chrome.tabs.onCreated.addListener((tab) => {
    if(tab.id)
        injectTab(tab?.id); // Inject content script into new tabs
});

function injectAllTabs() {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if(tab.id)
                injectTab(tab?.id);
        });
    });
}

function injectTab(tabId: number) {
    chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js'], // Inject the content script
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateCopyEvent') {
        const copiedText = message.text;
        console.log('Copied text:', copiedText);
        chrome.storage.local.get('copyEvents', (data) => {
            const copyEvents: string[] = data.copyEvents || [];
            copyEvents.unshift(copiedText);
            if (copyEvents.length > 10) {
                copyEvents.pop();
            }
            chrome.storage.local.set({ copyEvents });
        });
    }
    else if (message.action === 'clearCopyEvent') {
        const indexToRemove = message.index;
        chrome.storage.local.get('copyEvents', (result) => {
            const copyEvents = result.copyEvents || [];
            if (indexToRemove >= 0 && indexToRemove < copyEvents.length) {
                copyEvents.splice(indexToRemove, 1);
                chrome.storage.local.set({ 'copyEvents': copyEvents });
                chrome.runtime.sendMessage({ action: 'updateCopyEvents', copyEvents });
            }
        });
    }
});
