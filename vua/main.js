const suggestDOM = document.getElementById('search-suggest');
const suggestBoxDOM = document.getElementById('suggest-box')
const inputDOM = document.getElementById('search-input')
const regex = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i

var script = null

function goto_page(keyword) {
  if (regex.test(keyword)) {
    window.location.href = keyword
  } else {
    window.location.href = 'https://cn.bing.com/search?q=' + keyword
  }
}

function suggest_callback(jsObj) {
  if (!jsObj) return
  let res = jsObj.AS.Results
  let html = '';
  if (res) {
    let data = res[0].Suggests;
    for (var i = 0; i != data.length; i++){
      html += '<li class="active-item">' + data[i].Txt + '</li>'
    }
  } else {
    html = '<i>没有匹配结果<i>'
  }
  suggestDOM.innerHTML = html;
  suggestBoxDOM.style.display = 'block';
}

document.body.onclick = function (e) {
  // 触发该事件的直接元素
  var type = e.target;
  if((type.className != "active-item")) {
    suggestBoxDOM.style.display = 'none';
  }
};

inputDOM.onkeydown = function submit_search(event) {
  let e = window.event || event
  const keyword = inputDOM.value
  if (e.keyCode == '\r'.charCodeAt()) {
    if (!keyword.length) {
      suggestBoxDOM.style.display = 'none';
      return
    }
    goto_page(keyword)
  }
}

function get_suggets() {
  if (!inputDOM.value.length) {
    suggestBoxDOM.style.display = 'none';
    return
  }
  // ajax_get('http://api.bing.com/qsonhs.aspx?q=' + keyword, suggest_callback);
  if (script) {
    document.body.removeChild(script)
  }
  script = document.createElement('script')
  script.src = 'http://api.bing.com/qsonhs.aspx?type=cb&q=' + inputDOM.value + '&cb=suggest_callback'
  document.body.appendChild(script)
}

inputDOM.oninput = get_suggets

inputDOM.onfocus = () => {
  if (inputDOM.value.length) {
    if (suggestDOM.innerHTML.length) {
      suggestBoxDOM.style.display = 'block';
    } else {
      get_suggets()
    }
  }
}

suggestBoxDOM.onclick = e => {
  e = e || window.event
  var target = e.target || e.srcElement
  if (target.tagName.toLowerCase() === 'li') {
    goto_page(target.innerHTML)
  }
}

document.getElementById('icon-search').onclick = e => {
  if (inputDOM.value.length) {
    goto_page(inputDOM.value)
  }
}
