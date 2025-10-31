const overlay = document.querySelector(".overlay");
const slider = document.querySelector("#slider");
const toggleButton = document.querySelector("#toggle-button");

const openMenu = () => {
  slider.classList.replace("-translate-x-64", "translate-x-0");
  overlay.classList.remove("hidden");
};
const closeMenu = () => {
  slider.classList.replace("translate-x-0", "-translate-x-64");
  overlay.classList.add("hidden");
};

toggleButton.addEventListener("click", openMenu);
overlay.addEventListener("click", closeMenu);
