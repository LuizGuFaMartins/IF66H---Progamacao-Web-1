import { db } from '../config/firebase.js';
import { addDoc, collection, getDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { uploadBytes, ref, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

let file = null;

window.onload = () => {
    document.querySelector('button[type=submit]').addEventListener('click', (event) => {
        event.preventDefault();
        if (validateFields()) {
            register();
        }

    })

    document.getElementById('arquivo').addEventListener('change', (event) => {
        file = event.target.files[0];
        const img = document.getElementsByClassName('image-vaccine')[0];
        img.setAttribute('src', URL.createObjectURL(file));
        console.log(file)
    })

    // const uid = () => {
    //     const id = Date.now().toString(16) + Math.random().toString(16)
    //     return id.replace(/\./g, '')
    // }

    // const fileRef = "images/" + uid()
    // uploadBytes(ref(storage, fileRef), file)
    // .then((result) => {
    //     console.log("Arquivo enviado com sucesso: " + result)
    //     getDownloadURL(ref(storage, fileRef))
    //         .then((url) => {
    //             console.log("URL: " + url)
    //             addDoc(collection(db, "alunos"), {
    //                 nome: getNome(),
    //                 dataNascimento: getDataNascimento(),
    //                 urlFoto: url,
    //                 pathFoto: fileRef
    //             })
    //                 .then((result) => {
    //                     console.log(JSON.stringify(result))
    //                     window.location.href = "home.html"
    //                 })
    //                 .catch((error) => {
    //                     console.log("Erro ao persistir dados: " + error)
    //                 })
    //         })
    //         .catch((error) => {
    //             console.log("Erro ao recuperar URL de download: " + error)
    //         })
    // })
    // .catch((error) => {
    //     console.log("Erro ao enviar arquivo: " + error)
    // })



    // const id = new URLSearchParams(window.location.search).get('id')

    // document.getElementById("btnSalvar").addEventListener('click', () => {salvar(id)})
    // document.getElementById("btnExcluir").addEventListener('click', () => {excluir(id)})

    // if(id) {

    //     document.getElementById("btnCadastrar").style.display = 'none'

    //     getDoc(doc(db, "alunos", id))
    //     .then((documento) => {
    //         setNome(documento.data().nome)
    //         setDataNascimento(documento.data().dataNascimento)
    //         setUrlFoto(documento.data().urlFoto)
    //     })
    //     .catch((error) => {
    //         console.log("Erro ao recuperar o documento: " + error)
    //     })
    // } else {
    //     document.getElementById("btnSalvar").style.display = 'none'
    //     document.getElementById("btnExcluir").style.display = 'none'
    // }

}



const getDateVaccine = () => {
    return document.getElementById("date-vac").value
}

const getVaccine = () => {
    return document.getElementById("vaccine").value
}

const getDose = () => {
    return document.getElementById("txtFoto").value
}

const getVaccineDocumentUrl = () => {
    return document.getElementById("txtFoto").value
}

const getNextVaccine = () => {
    return document.getElementById("next-date-vaccine").value
}

const setDateVaccine = (nome) => {
    document.getElementById("date-vac").value = nome
}

const setVaccine = (data) => {
    document.getElementById("vaccine").value = data
}

const setDose = (url) => {
    document.getElementById("txtFoto").value = url
}

const setVaccineDocumentUrl = (url) => {
    document.getElementById("txtFoto").value = url
}

const setNextVaccinet = (url) => {
    document.getElementById("next-date-vaccine").value = url
}

const validateFields = () => {
    let isFormValid = true;

    // validação de todos os campos
    const fields = document.getElementsByClassName('input');
    const boxFields = document.getElementsByClassName('input-border');

    for (let i = 0; i < fields.length; i++) {
        if (fields[i].value === '') {
            fields[i].classList.add('border-red');
            boxFields[i].classList.add("input-error-class");
            isFormValid = false;
        }
        if (fields[i].value !== '') {
            fields[i].classList.remove('border-red');
            boxFields[i].classList.remove("input-error-class");
        }
    }

    // Validação dos campos radio
    const radios = document.querySelectorAll(".form-check-input");
    const radioBox = document.getElementsByClassName('input-radio')[0];
    let hasOneSelected = false;

    radios.forEach((element, index) => {
        if (element.checked) hasOneSelected = true;
        if ((radios.length - 1) === index && !hasOneSelected) {
            radioBox.classList.add('input-radio-error-class');
            isFormValid = false;
        } else {
            radioBox.classList.remove('input-radio-error-class');
        }
    });

    return isFormValid;
}

const register = () => {
    addDoc(collection(db, "vacinas"), {
        data_vacinacao: getDateVaccine(),
        // dose: getDose(),
        dose: "primeira",
        proxima_vacinacao: getNextVaccine(),
        url_comprovate: "url",
        // url_comprovate: getVaccineDocumentUrl(),
        vacina: getVaccine(),
    }).then((result) => {
        console.log(JSON.stringify(result))
        // window.location.href = "../home";
    }).catch((error) => {
        console.log("Erro ao persistir dados: " + error)
    })
}

const remove = (id) => {
    deleteDoc(doc(db, "alunos", id))
        .then(() => {
            window.location.href = "home.html"
        })
        .catch((error) => {
            console.log("Erro ao excluir documento: " + error)
        })
}

const save = (id) => {
    updateDoc(doc(db, "alunos", id), {
        nome: getNome(),
        dataNascimento: getDataNascimento(),
        urlFoto: getUrlFoto()
    })
        .then(() => {
            window.location.href = "home.html"
        })
        .catch((error) => {
            console.log("Erro ao atualizar o documento: " + error)
        })
}