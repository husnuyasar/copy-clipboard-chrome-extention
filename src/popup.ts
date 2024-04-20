// document.addEventListener('copy', (event) => {
//     console.log("event:",event)
//     const copiedText = window.getSelection()?.toString();
//     if (copiedText) {
//         chrome.runtime.sendMessage({ action: 'updateCopyEvent', text: copiedText }, (response) => {
//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError.message);
//             }
//         });
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('copyEvents', (data) => {
        console.log("data:",data)
        const copyEvents: string[] = data.copyEvents || [];
        const copyEventsDiv = document.getElementById('copyEventsList');
        if (copyEventsDiv) {
            copyEventsDiv.innerHTML = ''; 
            console.log("data:",data)
            copyEvents.forEach((event,index) => {

                const copyEventItemDiv = document.createElement('div');
                copyEventItemDiv.classList.add('input-group');
                copyEventItemDiv.classList.add('mb-2');

                const copyInput = document.createElement('input');
                copyInput.setAttribute('type', 'text');
                copyInput.classList.add('form-control')
                copyInput.disabled = true;
                copyInput.textContent= event;
                copyInput.value = event;

                const buttonsDiv = document.createElement('div');
                buttonsDiv.classList.add("input-group-append");

                const copyButton = document.createElement('button');
                copyButton.classList.add('btn'); 
                copyButton.classList.add('btn-outline-secondary')
                copyButton.setAttribute('title', 'Copy to clipboard'); 
                const copyContent = async () => {
                    const textToCopy = event;
                    try {
                      await navigator.clipboard.writeText(textToCopy);
                      console.log('Content copied to clipboard');
                    } catch (err) {
                      console.error('Failed to copy: ', err);
                    }
                };
                copyButton.addEventListener('click', copyContent);
                copyButton.innerHTML = '<i class="fas fa-clipboard" title="Copy"></i>';

                const clearButton = document.createElement('button');
                clearButton.classList.add('btn');
                clearButton.classList.add('btn-outline-danger');
                clearButton.addEventListener('click', () => {
                    console.log("Click request")
                    chrome.runtime.sendMessage({ action: 'clearCopyEvent', index });
                    copyEventItemDiv.remove();
                });

                const trashIcon = document.createElement('i');
                trashIcon.classList.add('fas', 'fa-trash');
                clearButton.appendChild(trashIcon);

                buttonsDiv.appendChild(copyButton)
                buttonsDiv.appendChild(clearButton)

                copyEventItemDiv.appendChild(copyInput)
                copyEventItemDiv.appendChild(buttonsDiv)

                copyEventsDiv.appendChild(copyEventItemDiv)
            });
        }
    });
});

