export function render(data) {
  const prop = data.result.properties
  const container = Promise.all([['Planets', prop.planets], ['Species', prop.species]].map(arr => createSection(arr)))
    .then(list => {
      const infoBox = document.createElement('div')

      list.forEach(element => {
        infoBox.append(element)
      });

      return infoBox
    })
    .then(

      box => {
        const container = document.createElement('div')
        const title = document.createElement('h1')
        const backBtn = document.createElement('a')
        const openingCrawl = document.createElement('p')
        container.classList.add('container',)
        title.classList.add('title')
        openingCrawl.classList.add('film__opening-crawl', 'text')
        backBtn.classList.add('btn', 'btn-outline-danger', 'episode__btn')

        title.textContent = `${prop.title}`
        backBtn.textContent = `Back to episodes`
        backBtn.href = './'
        openingCrawl.textContent = `${prop.opening_crawl}`

        container.append(title, backBtn, openingCrawl, box)

        return container
      }
    )


  return container
}

function createSection([name, array]) {


  const section = Promise.all(array.map(src => (getParams(src))))
    .then(data => {
      let listArr = []
      data.forEach(itemArray => {
        listArr.push(createItem(itemArray))

      })
      return listArr
    }).then(
      list => {
        const sectionList = document.createElement('ol')
        list.forEach(el => {
          sectionList.append(el)

        })
        return sectionList
      }
    ).then(
      el => {
        const section = document.createElement('div')
        const sectionTitle = document.createElement('h2')

        sectionTitle.classList.add('subtitle')
        sectionTitle.textContent = name

        section.append(sectionTitle, el)

        return section
      }
    )




  function getParams(src) {
    return fetch(src).then(response => response.json())
  }

  function createItem(data) {
    let prop = data.result.properties
    const item = document.createElement('li')
    item.classList.add('text')
    item.textContent = `${prop.name}`

    return item
  }

  return section
}

