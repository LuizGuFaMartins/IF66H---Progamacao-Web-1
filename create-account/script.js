document.querySelector('button[type=submit]').addEventListener('click', (event) => {
    event.preventDefault();

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

    // validação do email
    const emailField = document.getElementById('email');
    const emailBox = document.getElementById('email-box');
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;

    if (!emailRegex.test(emailField.value) && emailField.value !== '') {
        emailField.classList.add('border-red');
        emailBox.classList.add("input-email-error-class");
        isFormValid = false;
    }
    if (emailRegex.test(emailField.value) || emailField.value === '') {
        emailBox.classList.remove("input-email-error-class");
    }

    // validação da confirmação de senha
    const passwordField = document.getElementById('password');
    const passwordConfirmField = document.getElementById('confirm');
    const passwordConfirmBox = document.getElementById('confirm-box');

    if (passwordField.value !== passwordConfirmField.value && passwordConfirmField.value !== '' && passwordField.value !== '') {
        passwordConfirmField.classList.add('border-red');
        passwordConfirmBox.classList.add("input-confirm-error-class");
        isFormValid = false;
    }
    if (passwordField.value === passwordConfirmField.value) {
        passwordConfirmBox.classList.remove("input-confirm-error-class");
    }

    const radioFem = document.getElementById('feminino');
    const radioMasc = document.getElementById('masculino');
    const radioBox = document.getElementsByClassName('input-radio')[0];

    if(!radioFem.checked && !radioMasc.checked){
        radioBox.classList.add('input-radio-error-class');
    }
    if(radioFem.checked || radioMasc.checked){
        radioBox.classList.remove('input-radio-error-class');
    }
    
    if(isFormValid){
        console.log("Formulário válido")
    }else{
        console.log("Formulário inválido")
    }
})
