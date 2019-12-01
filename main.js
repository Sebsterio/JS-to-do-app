const form = document.getElementById("addForm");
const input = form.querySelector("#input");
const items = document.getElementById("items");

function addItem(e) {
  e.preventDefault();
  const itemText = input.value;
  if (!itemText) return;

  const newItem = document.createElement("li");
  newItem.classList.add("list-group-item");
  newItem.innerHTML = `
    ${itemText}
    <button class="btn btn-primary btn-sm float-right delete">&#10003</button>
  `;
  items.appendChild(newItem);
  input.value = "";
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove(); // no IE support
  }
}

form.addEventListener("submit", addItem);
items.addEventListener("click", removeItem);

// moving gradient bg

// let angle = 0;

// function newFunction() {
//   const gradient = `linear-gradient(${angle}deg, #16a085, #f4d03f)`;
//   document.body.style.background = gradient;
//   angle++;
//   if (angle >= 360) angle = angle - 360;
//   console.log(angle);
// }

// setInterval(newFunction, 80);
