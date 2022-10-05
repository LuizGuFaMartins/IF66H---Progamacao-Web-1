const createCard = (index, nome, dose, data, urlImagem, proxima) => {
    let card = document.createElement("div")
    card.classList.add("card-body")
    card.id = index;
    // card.href = 

    let divCard = document.createElement("div")
    divCard.classList.add("card")

    let divCardBody = document.createElement("div")
    divCardBody.classList.add("card-body")

    let nomeVacina = document.createElement("h1")
    nomeVacina.innerHTML = nome

    let dataVacina = document.createElement("span")
    dataVacina.innerHTML = data

    let doseVacina = document.createElement("h6")
    doseVacina.innerHTML = dose

    let imagem = document.createElement("img")
    imagem.src = urlImagem
    imagem.classList.add("card-img-bottom")

    let proximaDose = document.createElement("p")
    proximaDose.classList.add("card-text")

    let smallDose = document.createElement("small")
    smallDose.classList.add("text-muted")
    smallDose.innerHTML = proxima

    card.appendChild(divCard)
    divCard.appendChild(divCardBody)
    divCard.appendChild(imagem)
    divCard.appendChild(proximaDose)
    divCardBody.appendChild(nomeVacina)
    divCardBody.appendChild(doseVacina)
    divCardBody.appendChild(dataVacina)
    proximaDose.appendChild(smallDose)

    return card
}

const addClickEventOnCards = (temporaryCards) => {
    const cards = document.getElementsByClassName('card-body');
    for (let card of cards) {
        card.addEventListener('click', () => {
            localStorage.setItem('selected_vaccine', JSON.stringify(temporaryCards[card.getAttribute('id')]));
            window.location.href = '../edit-vaccine'
        })
    }
}

window.onload = () => {
    const vaccineList = document.getElementById("vaccine-list");
    const temporaryCards = [
        {
            nome: 'BCG',
            dose: 'Primeira',
            data: '2022-09-09',
            urlImagem: '../assets/initial_background.jpg',
            proxima: 'Próxima: 2025-09-20',
        },        
    ]

    temporaryCards.forEach((card, index) => {
        vaccineList.appendChild(createCard(index, card.nome, card.dose, card.data, card.urlImagem, card.proxima));
    })

    addClickEventOnCards(temporaryCards);
}