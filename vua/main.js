const suggestDOM = document.getElementById('search-suggest');
const suggestBoxDOM = document.getElementById('suggest-box')
const inputDOM = document.getElementById('search-input')
const regex = /^(?:(http|https|ftp):\/\/)((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i

var script = null
var selected = -1

function hide_suggest() {
  selected = -1
  suggestBoxDOM.style.display = 'none'
}

function show_suggest() {
  suggestBoxDOM.style.display = 'block'
}

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
  let html = ''
  if (res) {
    let data = res[0].Suggests
    for (var i = 0; i != data.length; i++){
      html += '<li class="active-item">' + data[i].Txt + '</li>'
    }
  } else {
    html = '<i>没有匹配结果<i>'
  }
  suggestDOM.innerHTML = html
  show_suggest()
}

document.body.onclick = function (e) {
  // 触发该事件的直接元素
  var type = e.target;
  if((type.className != "active-item")) {
    hide_suggest()
  }
}

function adjust_selected(el) {

  var item = el.offsetTop - suggestDOM.scrollTop, box = 0

  if (item < box) {
    suggestDOM.scrollTop -= box - item
    return
  }
  
  item += el.offsetHeight
  box += suggestDOM.offsetHeight

  if (item > box) {
    suggestDOM.scrollTop -= box - item
    return
  }
}

inputDOM.onkeydown = function submit_search(event) {
  let e = window.event || event
  const keyword = inputDOM.value
  if (e.keyCode === '\r'.charCodeAt()) {
    if (!keyword.length) return
    goto_page(keyword)
  } else if (e.keyCode === 38) {
    if (!keyword.length) return
    let els = suggestDOM.getElementsByTagName('li')
    if (!els.length) return
    if (selected !== -1) {
      els[selected].classList.remove('selected-item')
    }
    if (--selected < 0) {
      selected = els.length - 1
    }
    const el = els[selected]
    el.classList.add('selected-item')
    inputDOM.value = el.innerText
    adjust_selected(el)
  } else if (e.keyCode === 40) {
    if (!keyword.length) return
    let els = suggestDOM.getElementsByTagName('li')
    if (!els.length) return
    if (selected !== -1) {
      els[selected].classList.remove('selected-item')
    }
    if (++selected >= els.length) {
      selected = 0
    }
    const el = els[selected]
    el.classList.add('selected-item')
    inputDOM.value = el.innerText
    adjust_selected(el)
  }
}

function get_suggets() {
  if (!inputDOM.value.length) {
    hide_suggest()
    return
  }
  selected = -1
  // ajax_get('http://api.bing.com/qsonhs.aspx?q=' + keyword, suggest_callback);
  if (script) {
    document.body.removeChild(script)
  }
  script = document.createElement('script')
  script.src = 'https://api.bing.com/qsonhs.aspx?type=cb&q=' + inputDOM.value + '&cb=suggest_callback'
  document.body.appendChild(script)
}

inputDOM.oninput = get_suggets

inputDOM.onfocus = () => {
  if (inputDOM.value.length) {
    if (suggestDOM.innerHTML.length) {
      show_suggest()
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
