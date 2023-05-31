import { ModalWindow } from "./js/utilities.js";

const menu = document.getElementById("menu");
const data = await getData();

async function getData() {
	const response = await fetch("/data.json");
	const json = await response.json();
	return json;
}

function getMap() {
	const map = new Map();

	for (const entry of data) {
		let letter = entry.name[0].toUpperCase();

		if (map.has(letter)) {
			let array = map.get(letter)
			array.push(entry.name);
			array.sort();
		} else {
			map.set(letter, [entry.name]);
		}
	}

	return map;
}

function openMenu() {
	const map = getMap();

	const div = document.createElement("div");
	div.classList.add("entries");

	for (const [key, values] of map) {
		const section = document.createElement("div");	

		const title = document.createElement("h1");
		title.innerText = key;

		section.append(title);

		for (const name of values) {
			const paragraph = document.createElement("p");
			paragraph.innerText = name;

			section.append(paragraph);
		}

		div.append(section);
	}

	const modalWindow = new ModalWindow();
	modalWindow.add(div);
	modalWindow.show();
}

// get an entry and open it in a modal window
// also, make sure to remove the current modal window and replace it
// with the new one :3
function openEntry() {
	
}

function getEntry(name) {
	for (const entry of data) {
		if (entry.name == name) {
			return entry;	
		}
	}
}


menu.addEventListener("click", (event) => {
	openMenu();	
});

