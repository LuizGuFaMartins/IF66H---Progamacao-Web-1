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

window.onload = () => {
  const selectedVaccine = JSON.parse(localStorage.getItem('selected_vaccine'));

  const date = document.getElementById('date');
  date.value = selectedVaccine.data;

  const vaccine = document.getElementById('name');
  vaccine.value = selectedVaccine.nome;

  // const dose = document.getElementById('name');
  // vaccine.value = selectedVaccine.nome;

  // const image = document.getElementById('name');
  // vaccine.value = selectedVaccine.nome;

  const nextDose = document.getElementById('next-date');
  nextDose.value = selectedVaccine.proxima.split(': ')[1];
}