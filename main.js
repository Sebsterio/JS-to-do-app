const form = document.getElementById("addForm");
const input = form.querySelector("#input");
const items = document.getElementById("items");
const filter = document.getElementById("filter");

if (sessionStorage.tasks) {
	items.innerHTML = sessionStorage.getItem("tasks");
}

// create <li> item from #addForm value
function addItem(e) {
	e.preventDefault();
	const itemText = input.value;
	if (!itemText) return;

	const newItem = document.createElement("li");
	newItem.classList.add("list-group-item");
	newItem.classList.add("custom-list-group-item");
	newItem.innerHTML = `${itemText}
    <button class="btn btn-primary btn-sm float-right complete">&#10003</button>`;

	items.appendChild(newItem);
	sessionStorage.setItem("tasks", items.innerHTML);

	input.value = "";
	input.focus();
}

// remove completed item -- called from completeItem()
function handleTransitionEnd(e) {
	if (e.target.tagName == "LI" && e.propertyName == "opacity") {
		e.target.parentElement.removeChild(e.target);
		sessionStorage.setItem("tasks", items.innerHTML);
	}
}

// remove <li> - called by `complete` button click
function completeItem(e) {
	if (e.target.classList.contains("complete")) {
		e.target.parentElement.style["text-decoration"] = "line-through";

		setTimeout(function() {
			e.target.parentElement.style.opacity = 0;
			// followed by handleTransitionEnd()
		}, 150);
	}
}

// filter <ul> items with #search input value
function filterItems(e) {
	let firstIsAssigned = false;
	items.querySelectorAll("li").forEach(item => {
		//
		if (item.innerText.includes(e.target.value)) {
			item.style.display = "block";

			// set border-top of first visible <li>
			if (!firstIsAssigned) {
				item.classList.add("item--first-visible");
				firstIsAssigned = true;
			} else {
				item.classList.remove("item--first-visible");
			}
		} else {
			item.style.display = "none";
		}
	});
}

form.addEventListener("submit", addItem);
items.addEventListener("click", completeItem);
items.addEventListener("transitionend", handleTransitionEnd);
filter.addEventListener("keyup", filterItems);
