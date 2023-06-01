import { ModalWindow } from "./js/utilities.js";

const menu = document.getElementById("menu");
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const errorMessage = document.getElementById("error-message");

const data = await getData();

let currentModalWindow;

async function getData() {
	const response = await fetch("./data.json");
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

	return new Map([...map].sort());
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
	
			paragraph.addEventListener("click", (event) => {
				openEntry(getEntry(name));
			});

			section.append(paragraph);
		}

		div.append(section);
	}

	const modalWindow = new ModalWindow();
	modalWindow.add(div);
	modalWindow.show();

	currentModalWindow = modalWindow;
}

function openEntry(entry) {
	const modalWindow = new ModalWindow();	

	const div = document.createElement("div");
	div.classList.add("entry");

	const titleAndButton = document.createElement("div");
	
	const title = document.createElement("h1");
	title.innerText = entry.name;

	const backButton = document.createElement("img");
	backButton.classList.add("back-button");
	backButton.addEventListener("click", (event) => {
		currentModalWindow.hide();
		openMenu();
	});
	backButton.src = "./assets/back.png";

	titleAndButton.append(title, backButton);

	const description = document.createElement("p");
	description.innerText = entry.description;

	const picture = document.createElement("img");
	picture.src = entry.path;

	div.append(titleAndButton, description, picture);

	modalWindow.add(div);	

	if (currentModalWindow) {
		currentModalWindow.hide();
	}
	
	setTimeout((event) => {
		modalWindow.show();
	}, 200);

	currentModalWindow = modalWindow;
}

function getEntry(name) {
	for (const entry of data) {
		if (entry.name.toLowerCase() == name.toLowerCase()) {
			return entry;	
		}
	}
}

searchButton.addEventListener("click", (event) => {
	searchForEntry();
});

searchBar.addEventListener("keyup", (event) => {
	if (event.keyCode === 13) {
		searchForEntry();
	}
});

function searchForEntry() {
	const searchedValue = searchBar.value;
	const entry = getEntry(searchedValue);

	if (searchedValue) {
		if (entry != undefined) {
			openEntry(entry);	
			errorMessage.innerText = ``;
		} else {
			errorMessage.innerText = `No se pudo encontrar "${searchedValue}"`;
		}
	} else {
		errorMessage.innerText = `El campo esta vacío`;
	}
}

menu.addEventListener("click", (event) => {
	openMenu();	
});

