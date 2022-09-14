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

    if (isFormValid) {
        window.location.href = "../home";
    }
})
