const btn = document.querySelectorAll(".remove-btn");

btn.forEach((item) =>
  item.addEventListener("click", (e) => {
    console.log(e.target.dataset.id);
    item.parentElement.remove()
  })
);
