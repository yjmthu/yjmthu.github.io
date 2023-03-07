const suggestDOM = document.getElementById('search-suggest');
const suggestBoxDOM = document.getElementById('suggest-box')
const inputDOM = document.getElementById('search-input')
const regex = /^(?:(http|https|ftp):\/\/)((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i
const logoDOM = document.getElementById('logo')
const favoriteBoxDom = document.getElementById('favorite-box')
const configBoxDom = document.getElementById('config-box')
let bookmarks = [
  {
    name: '网络学堂',
    href: 'https://learn.tsinghua.edu.cn/f/login'
  },
  {
    name: '信息门户',
    href: 'http://info.tsinghua.edu.cn/'
  }
]

var script = null
var selected = -1

function hide_suggest() {
  selected = -1
  suggestBoxDOM.style.display = 'none'
}

function show_suggest() {
  suggestBoxDOM.style.display = 'block'
}

function goto_page(keyword, smart=true) {
  const url = `http://${keyword}`
  let href = null
  if (regex.test(keyword)) {
    href = keyword
  } else if (smart && regex.test(url)) {
    href = url
  } else {
    href = 'https://cn.bing.com/search?q=' + keyword
  }

  if (href) {
    window.location.href = href
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
  if((e.target.className != "active-item")) {
    hide_suggest()
    if (e.target.id !== 'logo') {
      if (favoriteBoxDom.style.display === 'grid') {
        favoriteBoxDom.style.display = 'none'
        // console.log(e.target)
      }
    }
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

function show_favorite() {
  favoriteBoxDom.style.display = 'grid'
}

logoDOM.onclick = (e) => show_favorite()

inputDOM.onkeydown = function submit_search(event) {
  let e = window.event || event
  const keyword = inputDOM.value
  if (e.keyCode === '\r'.charCodeAt()) {
    if (!keyword.length) return
    goto_page(keyword, true)
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
    goto_page(inputDOM.value, false)
  }
}

function cancelConfig() {
  configBoxDom.style.visibility = 'hidden'
}

function saveConfig(data) {
  bookmarks.push(data)
  window.localStorage.bookmarks = JSON.stringify(bookmarks)

  const item = document.createElement('a')
  item.href = data.href
  item.className = 'favorite-item'
  item.innerHTML = data.name

  favoriteBoxDom.insertBefore(item, favoriteBoxDom.children[favoriteBoxDom.children.length - 1])
}

function confirmConfig(form) {
  if (configBoxDom.style.visibility === 'visible') {
    configBoxDom.style.visibility = 'hidden'
    const formData = new FormData(form)
    const name = formData.get('name')
    const href = formData.get('url')
    if (name && href) {
      console.log(name, href)
      saveConfig({
        name: name,
        href: href
      })
    }
  }
  return false
}

(function lambda () {
  // window.localStorage.clear()
  let i = window.localStorage.bookmarks
  if (i) {
    bookmarks = JSON.parse(i)
  } else {
    window.localStorage.bookmarks = JSON.stringify(bookmarks)
  }

  let backItem = favoriteBoxDom.children[0]

  if (!backItem) return
  
  backItem.onclick = (e) => {
    configBoxDom.style.visibility = 'visible'
  }

  for (let i of bookmarks) {
    const item = document.createElement('a')
    item.href = i.href
    item.className = 'favorite-item'
    item.innerHTML = i.name
    favoriteBoxDom.insertBefore(item, backItem)
  }
})()
