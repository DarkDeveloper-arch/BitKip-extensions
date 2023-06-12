const similarOption = document.getElementById('similarOption');
const regexOption = document.getElementById('regexOption');
const linkInput = document.getElementById('linkInput');
const portInput = document.getElementById('portInput');
const savePortBtn = document.getElementById('savePortBtn');

const extract = () => {
    const linkPattern = linkInput.value;
    const isSimilarOption = similarOption.checked;
    if (isSimilarOption)
        chrome.runtime.sendMessage({type: 'extractSimilarLinks', linkPattern: linkPattern});
    else
        chrome.runtime.sendMessage({type: 'extractLinksWithRegex', linkPattern: linkPattern});
    window.close();
}
document.getElementById('form').addEventListener('submit', extract);

similarOption.addEventListener('change', () => {
    if (similarOption.checked) {
        regexOption.checked = false;
        linkInput.placeholder = "Enter only common parts of a link"
    }
});
regexOption.addEventListener('change', () => {
    if (regexOption.checked) {
        similarOption.checked = false;
        linkInput.placeholder = "Enter link pattern"
    }
});


chrome.storage.sync.get("port", (result) => portInput.value = result.port)

savePortBtn.onclick = () => chrome.storage.sync.set({port: portInput.value});