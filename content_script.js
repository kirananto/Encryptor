console.log('Encrypting')
var elements = document.getElementsByTagName('p');
var VigenereCipher = {

  _tabulaRecta: {
    a: "abcdefghijklmnopqrstuvwxyz",
    b: "bcdefghijklmnopqrstuvwxyza",
    c: "cdefghijklmnopqrstuvwxyzab",
    d: "defghijklmnopqrstuvwxyzabc",
    e: "efghijklmnopqrstuvwxyzabcd",
    f: "fghijklmnopqrstuvwxyzabcde",
    g: "ghijklmnopqrstuvwxyzabcdef",
    h: "hijklmnopqrstuvwxyzabcdefg",
    i: "ijklmnopqrstuvwxyzabcdefgh",
    j: "jklmnopqrstuvwxyzabcdefghi",
    k: "klmnopqrstuvwxyzabcdefghij",
    l: "lmnopqrstuvwxyzabcdefghijk",
    m: "mnopqrstuvwxyzabcdefghijkl",
    n: "nopqrstuvwxyzabcdefghijklm",
    o: "opqrstuvwxyzabcdefghijklmn",
    p: "pqrstuvwxyzabcdefghijklmno",
    q: "qrstuvwxyzabcdefghijklmnop",
    r: "rstuvwxyzabcdefghijklmnopq",
    s: "stuvwxyzabcdefghijklmnopqr",
    t: "tuvwxyzabcdefghijklmnopqrs",
    u: "uvwxyzabcdefghijklmnopqrst",
    v: "vwxyzabcdefghijklmnopqrstu",
    w: "wxyzabcdefghijklmnopqrstuv",
    x: "xyzabcdefghijklmnopqrstuvw",
    y: "yzabcdefghijklmnopqrstuvwx",
    z: "zabcdefghijklmnopqrstuvwxy"
  },

  encrypt: function(plainText, keyword){
    if( typeof(plainText) !== "string" ){
      return "invalid plainText. Must be string, not " + typeof(plainText);
    }
    if( typeof(keyword) !== "string" ){
      return "invalid keyword. Must be string, not " + typeof(keyword);
    }

    plainText = plainText.toLowerCase();
    keyword = keyword.match(/[a-z]/gi).join("").toLowerCase();
    var encryptedText = "";
    var specialCharacterCount = 0;

    for( var i = 0; i < plainText.length; i++ ){
      var keyLetter = (i - specialCharacterCount) % keyword.length;
      var keywordIndex = VigenereCipher._tabulaRecta.a.indexOf(keyword[keyLetter]);

      if( VigenereCipher._tabulaRecta[plainText[i]] ){
        encryptedText += VigenereCipher._tabulaRecta[plainText[i]][keywordIndex];
      }else{
        encryptedText += plainText[i];
        specialCharacterCount++;
      }
    }

    return encryptedText;
  },

  decrypt: function(encryptedText, keyword){
    if( typeof(encryptedText) !== "string" ){
      return "invalid encryptedText. Must be string, not " + typeof(encryptedText);
    }
    if( typeof(keyword) !== "string" ){
      return "invalid keyword. Must be string, not " + typeof(keyword);
    }

    encryptedText = encryptedText.toLowerCase();
    keyword = keyword.match(/[a-z]/gi).join("").toLowerCase();
    var decryptedText = "";
    var specialCharacterCount = 0;

    for( var i = 0; i < encryptedText.length; i++ ){
      var keyLetter = (i - specialCharacterCount) % keyword.length;
      var keyRow = VigenereCipher._tabulaRecta[keyword[keyLetter]];

      if( keyRow.indexOf(encryptedText[i]) !== -1 ){
        decryptedText += VigenereCipher._tabulaRecta.a[keyRow.indexOf(encryptedText[i])];
      }else{
        decryptedText += encryptedText[i];
        specialCharacterCount++;
      }
    }

    return decryptedText;
  }

};




for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var words = text.split(' ')
            for(let a in words) {
                words[a] = VigenereCipher.encrypt(words[a], 'kiran')
            }

            var replacedText = words.join(' ')
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}

            // document.getElementById("decryptPage").addEventListener("click", function(){
            //     console.log('h')
            // });

var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    var iframe = document.createElement('iframe');
    // Must be declared at web_accessible_resources in manifest.json
    iframe.src = chrome.runtime.getURL('inject.html');

    // Some styles for a fancy sidebar
    iframe.style.cssText = 'position: fixed;height:80px;Width: 100%;bottom: 0;z-index:1000;';
    document.body.appendChild(iframe);
}

// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//     if (request.encrypt == true) {
//         alert('hello')
//         // var pid = $('#ctlform').attr('action').split(".")[0].split("/")[2];
//         // var qids = [];
//         // $('fieldset').each(function()
//         // {
//         //     var qid = $(this).prop('id').split('_')[1];
//         //     qids.push(qid);
//         // });
//         // var ReqDat = pid+"p_p"+qids.join('SCIA');       
//         sendResponse({farewell: 'helo'});
//     }  else {
//         sendResponse({}); // snub them.
//     }
// });

