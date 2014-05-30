var cleanUp = function(a) {
  a.textContent = 'Downloaded';
  a.dataset.disabled = true;

  // Need a small delay for the revokeObjectURL to work properly.
  setTimeout(function() {
    window.URL.revokeObjectURL(a.href);
  }, 1500);
};

var downloadFile = function() {
  var container = document.querySelector('#container');
  var output = container.querySelector('output');
  var MIME_TYPE = 'text/plain';

  window.URL = window.webkitURL || window.URL;
  var prevLink = output.querySelector('a');
  if (prevLink) {
    window.URL.revokeObjectURL(prevLink.href);
    output.innerHTML = '';
  }
  //test for and add .json if necessary:
  var filename = container.querySelector('input[type="text"]').value;
  var testext = filename.split(".");
  if(testext.pop() !='json'){
    filename = filename+".json";
  }
  sx.name = filename;
  sx.id = pid;
  sx.mfg = mfg;    
  var tojson = JSON.stringify(sx,null,'\t'); //function is defined in separate file JSONparse
  var bb = new Blob([tojson], {type: MIME_TYPE});
  var a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(bb);
  if(NODOWNLOAD){
    a.textContent = 'Right click here to save';
  }else{
    a.textContent = 'Click to Download';
  }
  a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
  
  output.appendChild(a);
  a.onclick = function(e) {
    if ('disabled' in this.dataset) {
      return false;
    }

    cleanUp(this);
  };
};