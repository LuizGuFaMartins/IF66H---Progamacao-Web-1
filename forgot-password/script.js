import { auth } from '../config/firebase.js';
import { sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

const fields = document.getElementsByClassName('input');
const boxFields = document.getElementsByClassName('input-border');

const emailField = document.getElementById('email');
const emailBox = document.getElementById('email-box');

window.onload = () => {
    document.querySelector('button[type=submit]').addEventListener('click', (event) => {
        event.preventDefault();
        if (validateFields()) {
            recoverPassword();
        }
    });
}

const recoverPassword = () => {
    sendPasswordResetEmail(auth, emailField.value)
        .then(() => {
            document.querySelector(".form").classList.remove('form-error-invalid-email');
            document.querySelector(".form").classList.add('form-send-recovery-email');

            setTimeout(() => { window.location.href = "../login"; }, 5000);
        })
        .catch(() => {
            document.querySelector(".form").classList.add('form-error-invalid-email');
        })
}

const validateFields = () => {
    let isFormValid = true;

    // validação de todos os campos
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

    // validação do email    
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;

    if (!emailRegex.test(emailField.value) && emailField.value !== '') {
        emailField.classList.add('border-red');
        emailBox.classList.add("input-email-error-class");
        isFormValid = false;
    }
    if (emailRegex.test(emailField.value) || emailField.value === '') {
        emailBox.classList.remove("input-email-error-class");
    }

    return isFormValid;
}