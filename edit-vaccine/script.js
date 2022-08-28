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