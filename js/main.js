
const app = document.getElementById('app')
const cssPromises = {}


function loadResourse(src) {
  if (src.endsWith('.js')) {
    return import(src)
  }

  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = src
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve())
      })
      document.head.append(link)
    }
    return cssPromises[src]
  }

  return fetch(src).then(res => res.json())
}

function render() {
  app.classList.add('spiner-visible')
  const searchParams = new URLSearchParams(location.search)
  const filmId = searchParams.get('filmId')
  if (filmId) {
    renderPage(
      './film-page.js',
      `https://www.swapi.tech/api/films/${filmId}`,
      './css/film-page-style.css'
    )
  } else {
    renderPage(
      './main-page.js',
      'https://www.swapi.tech/api/films/',
      './css/main-page-style.css'
    )
  }
}

function renderPage(moduleName, apiUrl, css) {
  loadResourse('./css/style-reset.css')
  loadResourse('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css')
  Promise.all([moduleName, apiUrl, css].map(src => loadResourse(src)))
    .then(([pageModule, data]) => {
      app.innerHTML = ''
      return pageModule.render(data)
    }).then(
      el => {
        app.append(el)
        app.classList.remove('spiner-visible')
        return document.querySelectorAll('a.internal-link')
      }
    )
    .then(
      links => {
        links.forEach(link => link.addEventListener('click', e => {
          e.preventDefault()
          history.pushState(null, '', link.href)
          render()
        }))
      }
    )
}

render()


window.addEventListener('popstate', e => {
  render()
})















