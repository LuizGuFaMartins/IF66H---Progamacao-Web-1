import { collection, onSnapshot, query } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { db } from '../config/firebase.js';

const createCard = (index, id, nome, dose, data, urlImagem, proxima) => {
    let card = document.createElement("div")
    card.classList.add("card-container")
    card.id = index;

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
    
    card.addEventListener("click", () => {
        window.location.href = "../vaccine/index.html?id=" + id
    })

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

// const addClickEventOnCards = (temporaryCards) => {
//     const cards = document.getElementsByClassName('card-container');
//     for (let card of cards) {
//         card.addEventListener('click', () => {
//             localStorage.setItem('selected_vaccine', JSON.stringify(temporaryCards[card.getAttribute('id')]));
//             window.location.href = '../vaccine'
//         })
//     }
// }

const formatDate = (date) => {
    if (date.includes('Próxima dose:')) {
        let date = date.split(': ')[1];
        let day = date.split('-')[2];
        let month = date.split('-')[1];
        let year = date.split('-')[0];
        return `Próxima dose: ${day}/${month}/${year}`;
    } else {
        let day = date.split('-')[2];
        let month = date.split('-')[1];
        let year = date.split('-')[0];
        return `${day}/${month}/${year}`;
    }

}

window.onload = () => {
    let cardsList = [];

    document.getElementById("search").addEventListener('keyup', () => {
        const searchString = document.getElementById("search").value.trim()
        showCardsAlunos(cardsList.filter(vacina => vacina.vacina.includes(searchString)))
    })

    document.getElementById("new-vaccine-button").addEventListener('click', () => {
        localStorage.setItem('selected_vaccine', "");
        window.location.href = '../vaccine'
    })

    const loadVaccines = () => {
        const q = query(collection(db, "vacinas"))
        onSnapshot(q, (results) => {
            results.forEach((documento) => {
                cardsList.push({
                    id: documento.id,
                    vacina: documento.data().vacina,
                    dose: documento.data().dose,
                    data_vacinacao: documento.data().data_vacinacao,
                    url_comprovate: documento.data().url_comprovate,
                    path_comprovante: documento.data().path_comprovante,
                    proxima_vacinacao: documento.data().proxima_vacinacao,
                })
            })
            showCardsAlunos(cardsList)  
        })
    }

    loadVaccines();
}

const showCardsAlunos = (cardsList) => {
    const vaccineList = document.getElementById("vaccine-list");

    if (cardsList.length <= 2) {
        vaccineList.classList.remove('vaccine-box');
        vaccineList.classList.add('vaccine-box-flex');
    }

    cardsList.forEach((card, index) => {
        vaccineList.appendChild(createCard(index, card.id, card.vacina, card.dose, formatDate(card.data_vacinacao), card.url_comprovate, formatDate(card.proxima_vacinacao)));
    })

}