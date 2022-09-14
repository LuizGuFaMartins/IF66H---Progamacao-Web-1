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
    
    if(isFormValid){
        window.location.href = "../home";
    }   

});