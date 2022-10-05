const createCard = (index, nome, dose, data, urlImagem, proxima) => {
    let card = document.createElement("div")
    card.classList.add("card-container")
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
    const cards = document.getElementsByClassName('card-container');
    for (let card of cards) {
        card.addEventListener('click', () => {
            localStorage.setItem('selected_vaccine', JSON.stringify(temporaryCards[card.getAttribute('id')]));
            window.location.href = '../edit-vaccine'
        })
    }
}

const formatDate = (date) => {
    if (date.includes('Próxima dose:')) {
        date = date.split(': ')[1];
        day = date.split('-')[2];
        month = date.split('-')[1];
        year = date.split('-')[0];
        return `Próxima dose: ${day}/${month}/${year}`;
    } else {
        day = date.split('-')[2];
        month = date.split('-')[1];
        year = date.split('-')[0];
        return `${day}/${month}/${year}`;
    }

}

window.onload = () => {
    const vaccineList = document.getElementById("vaccine-list");
    const temporaryCards = [
        {
            nome: 'BCG',
            dose: '1a. dose',
            data: '2022-09-09',
            urlImagem: '../assets/initial_background.jpg',
            proxima: 'Próxima dose: 2025-09-20',
        },
        {
            nome: 'Hepatite',
            dose: '2a. dose',
            data: '2022-09-09',
            urlImagem: '../assets/initial_background.jpg',
            proxima: 'Próxima dose: 2025-09-20',
        },
        {
            nome: 'Pneumocócica',
            dose: 'Reforço',
            data: '2022-09-09',
            urlImagem: '../assets/initial_background.jpg',
            proxima: 'Próxima dose: 2025-09-20',
        },
        {
            nome: 'Rotavírus',
            dose: '3a. dose',
            data: '2022-09-09',
            urlImagem: '../assets/initial_background.jpg',
            proxima: 'Próxima dose: 2025-09-20',
        },
        {
            nome: 'Covid',
            dose: 'Dose única',
            data: '2022-09-09',
            urlImagem: '../assets/initial_background.jpg',
            proxima: 'Próxima dose: 2025-09-20',
        },

    ]

    if (temporaryCards.length <= 2) {
        vaccineList.classList.remove('vaccine-box');
        vaccineList.classList.add('vaccine-box-flex');
    }

    temporaryCards.forEach((card, index) => {
        vaccineList.appendChild(createCard(index, card.nome, card.dose, formatDate(card.data), card.urlImagem, formatDate(card.proxima)));
    })

    addClickEventOnCards(temporaryCards);
}