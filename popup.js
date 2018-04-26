document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('encryptPage');
    checkPageButton.addEventListener('click', function() {

        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            
            var currentTab = tabs[0]
            chrome.tabs.executeScript(currentTab.id, {file: "content_script.js"});
        });
    //   chrome.tabs.getCurrent(function(tab) {
    //     d = document;
    //     alert(tab)
    //     var f = d.createElement('form');
    //     f.action = 'http://gtmetrix.com/analyze.html?bm';
    //     f.method = 'post';
    //     var i = d.createElement('input');
    //     i.type = 'hidden';
    //     i.name = 'url';
    //     i.value = tab.url;
    //     f.appendChild(i);
    //     d.body.appendChild(f);
    //     f.submit();
    //   });
    }, false);
  }, false);