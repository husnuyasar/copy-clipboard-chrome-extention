document.addEventListener('copy', (event) => {
    const copiedText = window.getSelection()?.toString();
    if (copiedText) {
        chrome.runtime.sendMessage({ action: 'updateCopyEvent', text: copiedText });
    }
});
