const texte = document.querySelector("#quote");
const author = document.querySelector("#author");
const loader = document.querySelector("#loader");
const quoteContainer = document.querySelector("#quote__container");

let apiQuotes = [];

// Show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide loading
function loadingComplete() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Get quotes from api
async function getQuotes() {
	loading();
	const apiUrl = "https://type.fit/api/quotes";
	try {
		if (localStorage.getItem("quotes") === null) {
			const response = await fetch(apiUrl);
			apiQuotes = await response.json();
			saveQuotesLocally(apiQuotes);
		}
		newQuote();
		loadingComplete();
	} catch (error) {
		// Catch Error Here
	}
}

// Save quotes locally to local storage
function saveQuotesLocally(localQuotes) {
	localStorage.setItem("quotes", JSON.stringify(localQuotes));
}

// Show new quote
function newQuote() {
	loading();
	let quotesList2 = getQuotesFromLocalStorage();
	// Pick a random quote from api quotes array
	const quote = quotesList2[Math.floor(Math.random() * quotesList2.length)];
	injectQuoteInHTML(quote);
	loadingComplete();
}

// Get quotes from local storage
function getQuotesFromLocalStorage() {
	let quotesList = localStorage.getItem("quotes");
	if (quotesList) {
		return JSON.parse(quotesList);
	} else {
		return [];
	}
}

// Inject quote text and author into html
function injectQuoteInHTML(quote) {
	// Check in author field is blank
	if (!quote.author) {
		author.textContent = "Unknown";
	} else {
		author.textContent = quote.author;
	}
	// Check quote lenght for styling

	if (quote.text.length > 120) {
		texte.classList.add("long__quote");
	} else {
		texte.classList.remove("long__quote");
	}
	texte.textContent = quote.text;
}

// Tweet quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${texte.textContent} - ${author.textContent}`;
	window.open(twitterUrl, "_blank");
}

// Add eventlistener on button
new__quote.addEventListener("click", newQuote);
twitter.addEventListener("click", tweetQuote);

// On load
getQuotes();
newQuote();
