console.log("loaded");
const toggleButton = document.querySelector("#toggle-button");
const slider = document.querySelector("#slider-list");

toggleButton.addEventListener("click", () => {
  slider.classList.replace("-translate-x-60", "translate-x-0");
});
document.addEventListener("click", (e) => {
  // if clicked target is not the open button or the slider so close it
  if (!toggleButton.contains(e.target) && !slider.contains(e.target)) {
    slider.classList.replace("translate-x-0", "-translate-x-60");
    // console.log("close");
  }
});
