import { db, storage } from '../config/firebase.js'
import { addDoc, collection, getDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { uploadBytes, ref, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

let file = null;
let pathFoto = null;

window.onload = () => {

  const id = new URLSearchParams(window.location.search).get('id')

  if (id) {
    getDoc(doc(db, "vacinas", id))
      .then((documento) => {
        setNome(documento.data().nome)
        setDataNascimento(documento.data().dataNascimento)
        setUrlFoto(documento.data().urlFoto)
        setPathFoto(documento.data().pathFoto)
      })
      .catch((error) => {
        console.log("Erro ao recuperar o documento: " + error)
      })
  }

  document
    .getElementById("open-modal-button")
    .addEventListener("click", (event) => {
      const modal = document.getElementById("modal-background");
      modal.style.display = "flex";
    });

  document
    .getElementById("close-modal")
    .addEventListener("click", (event) => {
      const modal = document.getElementById("modal-background");
      modal.style.display = "none";
    });

  document
    .getElementById("modal-background")
    .addEventListener("click", (event) => {
      const modal = document.getElementById("modal-background");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

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

  // const selectedVaccine = JSON.parse(localStorage.getItem('selected_vaccine'));

  // const date = document.getElementById('date');
  // date.value = selectedVaccine.data;

  // const vaccine = document.getElementById('name');
  // vaccine.value = selectedVaccine.nome;

  // if (selectedVaccine.dose === '1a. dose') {
  //   document.getElementById('primeira').checked = true;
  // }
  // if (selectedVaccine.dose === '2a. dose') {
  //   document.getElementById('segunda').checked = true;
  // }
  // if (selectedVaccine.dose === '3a. dose') {
  //   document.getElementById('terceira').checked = true;
  // }
  // if (selectedVaccine.dose === 'Reforço') {
  //   document.getElementById('reforco').checked = true;
  // }
  // if (selectedVaccine.dose === 'Dose única') {
  //   document.getElementById('unica').checked = true;
  // }

  // // const image = document.getElementById('name');
  // // vaccine.value = selectedVaccine.nome;

  // const nextDose = document.getElementById('next-date');
  // nextDose.value = selectedVaccine.proxima.split(': ')[1];
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
  return document.getElementById("arquivo").value
}

const getNextVaccine = () => {
  return document.getElementById("next-date-vaccine").value
}

const getPathFoto = () => {
  return pathFoto
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
  document.getElementById("arquivo").value = url
}

const setNextVaccinet = (url) => {
  document.getElementById("next-date-vaccine").value = url
}

const setPathFoto = (caminho) => {
  pathFoto = caminho
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

const uid = () => {
  const id = Date.now().toString(16) + Math.random().toString(16)
  return id.replace(/\./g, '');
}

const register = () => {
  const fileRef = "images/" + uid();
  uploadBytes(ref(storage, fileRef), file)
    .then((result) => {
      console.log("Arquivo enviado com sucesso: " + result)
      addDoc(collection(db, "vacinas"), {
        data_vacinacao: getDateVaccine(),
        // dose: getDose(),
        dose: "primeira",
        proxima_vacinacao: getNextVaccine(),
        url_comprovate: getVaccineDocumentUrl(),
        path_comprovante: fileRef,
        vacina: getVaccine(),
      })
        .then(() => {
          window.location.href = "../home"
        })
        .catch((error) => {
          console.log("Erro ao atualizar o documento: " + error)
        })
    })
    .catch((error) => {
      console.log("Erro ao enviar arquivo: " + error)
    })
}

const remove = (id) => {
  deleteObject(ref(storage, getPathFoto()))
    .then(() => {
      console.log("Arquivo excluído com sucesso.")
      deleteDoc(doc(db, "alunos", id))
        .then(() => {
          window.location.href = "home.html"
        })
        .catch((error) => {
          console.log("Erro ao excluir documento: " + error)
        })
    })
    .catch((error) => {
      console.log("Erro ao excluir o arquivo.")
    })
}

const save = (id) => {
  if (file) {
    uploadBytes(ref(storage, getPathFoto()), file)
      .then((result) => {
        console.log("Arquivo enviado com sucesso: " + result)
        updateDoc(doc(db, "alunos", id), {
          nome: getNome(),
          dataNascimento: getDataNascimento(),
          urlFoto: getUrlFoto(),
          pathFoto: getPathFoto()
        })
          .then(() => {
            window.location.href = "home.html"
          })
          .catch((error) => {
            console.log("Erro ao atualizar o documento: " + error)
          })
      })
      .catch((error) => {
        console.log("Erro ao enviar arquivo: " + error)
      })
  } else {
    updateDoc(doc(db, "alunos", id), {
      nome: getNome(),
      dataNascimento: getDataNascimento(),
      urlFoto: getUrlFoto(),
      pathFoto: getPathFoto()
    })
      .then(() => {
        window.location.href = "home.html"
      })
      .catch((error) => {
        console.log("Erro ao atualizar o documento: " + error)
      })
  }
}