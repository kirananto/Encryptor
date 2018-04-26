function count() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log('he')
        var currentTab = tabs[0]
        chrome.tabs.executeScript(currentTab.id, {file: "content_decrypt.js"});
    });
}
document.addEventListener("DOMContentLoaded", function(){
    console.log('dom loaded')
    document.getElementById('decryptPage').onclick = count;
});