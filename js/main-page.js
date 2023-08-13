export function render(data) {
  const container = document.createElement('div')
  const cardWrap = document.createElement('div')
  const title = document.createElement('h1')

  container.classList.add('container')
  cardWrap.classList.add('films')
  title.classList.add('title')

  title.textContent = 'Srar Wars'

  if (data.message === 'ok') {
    let array = data.result
    array.forEach(element => {

      const prop = element.properties
      const card = document.createElement('div')
      const cardImg = document.createElement('img')
      const cardBody = document.createElement('div')
      const cardTitle = document.createElement('h2')
      const cardDirector = document.createElement('p')
      const relizDateParagrapf = document.createElement('p')
      const cardProducer = document.createElement('p')
      const cardLink = document.createElement('a')
      const relizeDate = new Date(prop.release_date)

      card.classList.add('card', 'films__card')
      cardImg.classList.add('card-img-top')
      cardBody.classList.add('card-body', 'films__card-body')
      cardTitle.classList.add('card-title', 'films__card-title')
      cardDirector.classList.add('card-text', 'films__card-text')
      cardProducer.classList.add('card-text', 'films__card-text')
      relizDateParagrapf.classList.add('card-text', 'films__card-text')
      cardLink.classList.add('btn', 'btn-info', 'films__card-more', 'internal-link')

      cardImg.src = `./img/films-${prop.episode_id}.jpg`
      cardLink.href = `?filmId=${element.uid}`

      cardTitle.textContent = `${prop.title}`
      cardDirector.textContent = `Director: ${prop.director}`
      cardProducer.textContent = `Producers: ${prop.producer}`
      relizDateParagrapf.textContent = `Release date: ${relizeDate.getDate()}.${relizeDate.getMonth()}.${relizeDate.getFullYear()}`
      cardLink.textContent = 'Series details...'

      cardBody.append(cardTitle, cardDirector, cardProducer, relizDateParagrapf, cardLink,)
      card.append(cardImg, cardBody)
      cardWrap.append(card)

    });

    container.append(title, cardWrap)

    return container
  }
  // Возможно создать окно ошибки
  return container
}


// <div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="..."> - пока не ставлю
//   <div class="card-body">
//     <h5 class="card-title">Заголовок карточки</h5>
//     <p class="card-text">Небольшой пример текста, который должен основываться на названии карточки и составлять основную часть содержимого карты.</p>
//     <a href="#" class="btn btn-primary">Перейти куда-нибудь</a>
//   </div>
// </div>
