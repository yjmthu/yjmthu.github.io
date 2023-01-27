const suggestDOM = document.getElementById("search-suggest");
const suggestBoxDOM = document.getElementById("suggest-box")
const inputDOM = document.getElementById('search-input')

var script = null

function suggest_callback(jsObj) {
  var d = jsObj.AS.Results[0].Suggests;
  var html = '';
  for(var i = 0; i!=d.length; i++){
    html += "<li>" + d[i].Txt + "</li>"
  }
  suggestDOM.innerHTML = html;
  suggestBoxDOM.style.display = "block";
}

function submit_search(event) {
  let e = window.event || event
  const keyword = inputDOM.value
  if (e.keyCode == '\r'.charCodeAt()) {
    if (!keyword.length) {
      suggestBoxDOM.style.display = "none";
      return
    }
    window.location.href = 'https://cn.bing.com/search?q=' + keyword
  } else if (e.keyCode == 8) {
    if (keyword.length == 1) {
      suggestBoxDOM.style.display = "none";
      return
    }
  }
  // ajax_get("http://api.bing.com/qsonhs.aspx?q=" + keyword, suggest_callback);
  if (script) {
    document.body.removeChild(script)
  }
  script = document.createElement("script")
  script.src = "http://api.bing.com/qsonhs.aspx?type=cb&q=" + keyword + "&cb=suggest_callback"
  document.body.appendChild(script)
}

suggestBoxDOM.onclick = e => {
  e = e || window.event;//这一行及下一行是为兼容IE8及以下版本
  var target = e.target || e.srcElement;
  if (target.tagName.toLowerCase() === "li") {
    window.location.href = 'https://cn.bing.com/search?q=' + target.innerHTML
  }
}
