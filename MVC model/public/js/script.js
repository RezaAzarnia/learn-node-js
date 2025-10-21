const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const deleteButton = document.querySelectorAll(".delete-button");
const error = {};

const openModal = () => {
  document.body.style.overflow = "hidden";
  overlay.classList.replace("hidden", "visible");
  modal.classList.replace("scale-0", "scale-100");
};

const closeModal = () => {
  document.body.style.overflow = "auto";
  overlay.classList.replace("visible", "hidden");
  modal.classList.replace("scale-100", "scale-0");
};

const handleError = (event, errorMessage) => {
  const editBtn = document.querySelector("#edit-button");
  const { name, value, nextElementSibling, type } = event.target;

  if (type === "text" && value.trim().length <= 0) {
    error.bookName = errorMessage;
  } else if (name == "price" && value <= 0) {
    error.price = "price can't be zero or negative number";
  } else if (name == "bookCount" && value <= 0) {
    error.bookCount = "count can't be zero or negative number";
  } else {
    delete error[name];
  }

  Object.keys(error).length > 0
    ? editBtn.setAttribute("disabled", "")
    : editBtn.removeAttribute("disabled");

  if (error[name]) nextElementSibling.innerHTML = error[name];
  else nextElementSibling.innerHTML = "";
};
const deleteBook = async (event, id) => {
  event.preventDefault();
  try {
    const res = await fetch("http://localhost:3000/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const response = await res.json();
    if (res.ok) {
      closeModal();
      window.location.href = "/";
    } else {
      throw new Error(
        response.message || "some error occured please try again later!"
      );
    }
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      Toastify({
        text: e.message,
        duration: 3000,
        stopOnFocus: true,
        position: "center",
        style: {
          background: "red",
          fontSize: "18px",
        },
      }).showToast();
    }
  }
};
const editBook = async (e, id) => {
  e.preventDefault();
  const data = {};
  for (let key of [...new FormData(e.target)]) {
    data[key[0]] = key[1];
  }
  data["id"] = id;
  // console.log(data);
  try {
    const res = await fetch(`http://localhost:3000/edit`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (res.ok) {
      console.log(response);
      window.location.href = "/";
    } else {
      throw new Error(
        response.message || "some error occured please try again later!"
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      Toastify({
        text: error.message,
        duration: 3000,
        stopOnFocus: true,
        position: "center",
        style: {
          background: "red",
          fontSize: "18px",
        },
      }).showToast();
    }
  }
};
// show with on click like react
const showModal = (modalType, data) => {
  openModal();
  if (modalType === "delete") {
    modal.innerHTML = `<div class="w-full"><svg class="w-full text-center" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 9V13" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 17.0195V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
        <h3 class="text-center font-semibold text-2xl">Are you sure?</h3>
        <span class="text-md text-gray-600 text-center">this action cannot bu undone. All values associated with this field will be lost.</span>
        <div class="flex flex-col items-center justify-center w-full mt-4 gap-2">
        <form class="w-full" onsubmit="deleteBook(event , ${data.id})">
            <button type="submit" class=" py-2.5 px-8 bg-red-500 rounded-lg text-lg font-medium cursor-pointer text-white hover:bg-red-600 transition-colors duration-200 w-full">delete ${data.name}</button>
        </form>
        <button onclick='closeModal()' type="submit" class="py-2.5 px-8 border border-gray-500 rounded-lg text-lg font-medium cursor-pointer hover:bg-black hover:text-white transition-all duration-200 capitalize w-full">cancel</button>
      </div>
    `;
  } else {
    modal.innerHTML = `
    <div class="w-full">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEF0lEQVR4nO2dv49UVRTHL5goWqjgDxr/ALWwUASKl713BjRbkKDFO2dgFwkNIYTCgogajYWJWmFlS6iNlRos0D13V3eFuBp/ECNCy48GpaEiYc0ZZtnJ+N7uDMzMeffx/SS32M3s7pnv58ydO/Pu3HUOAAAAAAAAkCxLbp0X2u6FDoSZ1jbrcu4rdpx+7YkgdCpEXuoaJ/LP8wesa6s9XvY86SP/2hN+e3jhz6zrqzXZXP6UF/qtKPz2EL6F6WiE6DRTGv6dRwG9Ocoa7msmz0w9GiL/uJqAidh63brO2kvwkc4Udn/kv7Yv5A9b11gbmt+2NnvhkztP5491f1+/9sJne56ArzXnWi/YVVszXpmffjpE/qMT7s+vLuSbyiT4yNcnIr3sTFn6YL2uABqR3vDCR0PkY1Ufzdl8a1n4PtK5ng4/62X34923y77fu9ELfWe68tm1uOuREPndEPnKWiuEUKUh/GV+Ln+wn/BXBv2kobuq0JzLn/eRLpqHGQcd9FVZ+MvTTukyM/JiJSRo+CHyvymGP3lq8qG7CX/l0UNzzhKddlLsfB/p63sN3wvf8MLBWeKF3kuw87/xsn9D0dsLQfj3fsNvzLaazny1s8oTro/8Q4h03At9Up3B7xd1fjv8lDpf0SXXKl122CVCNmDnVyJ8Rdf5ZZ3vEiFLNXyl8yKrqNhPXQJkKYeveOG3S6afj13FyZJ7wq2RgKwO4acqIFvrSlaf045eC3bWpCYgGzD8ss5vRD4YIr3lrElJQKbvVkZeHEr4wrf0vjtrUhGQDTn8zu0gwCp8CDAOHwLucdPUIKsdL9TqDR8CxtT5Soj8UcnPQcCow1cgwDB8BQIGCF8vlA8zfAUC+kC3iIwifAUCDMNXIMAwfAUCDMNXIKAA3YsZhH4Zx5UsCChAdzaMuvOXgYAedEtJP3tPh3UlCwIKL4aMJ3wFArpZcuuC0J/jCl+BgC7CDO8eZ/jtvwkBK+hO5JLwb/rIXzRm8pfckIGADvoJlv+FEOlqiPyhl6ln3IiAgA5e8kN3fr/wQiPy3qIPVgwbCOig28l1L2pzll50YwQCjIEAYyDAGAgwBgKMgQBjIMAYCDAGAoyBAGMgwBgIMAYCjIEAYyDAGAgwBgKMqbqApA/r6Ac976hEwFFnjRfeV1wczbua4IXmi+9jPm1dW+FOha4OOeISxwsfKb9/rS3W9d0+skzoclmRuntBpyP7Y8pooKE1d2ovCZ8u6S49VwW80DulAmo7yP6gjp7Tci/Yh8JjGZU8FX0i8nNpHtzKgw2hf7zsedZVkbYEob9r2/lC5ysb/jL60NQXKPokVaPgL+np6pWbdtb+v1qtLfo6IZXj60PX0Jq19vZu66qsdgAAAAAAAAAAAAAAAAAA4FLkP5ZuLfF9GK4kAAAAAElFTkSuQmCC"  class="text-center mx-auto">
    </div>
    <h3 class="text-center font-semibold text-2xl capitalize">edit data</h3>
    <div class="flex flex-col items-center justify-center w-full mt-4 gap-2">
        <form class="w-full space-y-4" onsubmit="editBook(event , ${data.id})">
            <div>
                  <label
                  for="bookName"
                  class="block mb-1 text-md font-semibold capitalize cursor-pointer">
                    please enter new bookName :
                  </label>
                  <input
                  type="text"
                  id="bookName"
                  name="bookName"
                  value="${data.name}"
                  oninput="handleError(event ,'please enter book name')"
                  class="block w-full border border-black-500 rounded-md focus:outline-none px-2 py-3 text-lg"
                  />
                  <span class="inline text-red-600 capitalize text-md font-semibold"></span>
              </div>
              <div>
                  <label for="price" class="block mb-1 text-md font-semibold capitalize cursor-pointer">please enter new price :
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value="${data.price}"
                    oninput="handleError(event , 'please enter book price')"
                    class="block w-full border border-black-500 rounded-md focus:outline-none px-2 py-3 text-lg"
                    />
                  <span class="inline text-red-600 capitalize text-md font-semibold"></span>
              </div>
              <div>
                  <label
                    for="bookCount"
                    class="block mb-1 text-md font-semibold capitalize cursor-pointer"
                    >please enter book count :
                  </label>
                  <input
                    type="number"
                    id="bookCount"
                    name="bookCount"
                    value="${data.count}"
                    oninput="handleError(event ,'please enter book count')"
                    class="block w-full border border-black-500 rounded-md focus:outline-none px-2 py-3 text-lg"
                  />
                  <span class="inline text-red-600 capitalize text-md font-semibold"></span>
              </div>
            <button type="submit" class="disabled:cursor-not-allowed py-2.5 px-8 bg-green-500 rounded-lg text-lg font-medium cursor-pointer text-white hover:bg-green-600 transition-colors duration-200 w-full capitalize min-w-28" id="edit-button">edit</button>
        </form>
          <button onclick='closeModal()' type="submit" class=" py-2.5 px-8 border hover:border-gray-300  hover:text-black rounded-lg text-lg font-medium cursor-pointer  bg-red-500 hover:bg-transparent text-white  transition-all duration-200 capitalize w-full">cancel</button>
    </div>
    `;
  }
};
overlay.addEventListener("click", closeModal);
