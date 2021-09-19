// html elements

const booksContainer = document.getElementById("books__container");
const spinner = document.getElementById("spinner");
spinner.style.display = "none";

// spinner function

const loadingSpinner = (isShow) => {
  if (isShow) {
    spinner.style.display = "block";
  } else {
    spinner.style.display = "none";
  }
};

// search form

const searchButton = document.getElementById("books__search__button");
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  // html elements
  const searchFilled = document.getElementById("books__search__input");
  const searchResultNumber = document.getElementById("search__result__number");
  const error = document.getElementById("error");
  // clear html elements
  booksContainer.textContent = "";
  searchResultNumber.textContent = "";
  error.textContent = "";
  try {
    loadingSpinner(true);
    const searchText = searchFilled.value;
    // if search value is aaaa show a error message. Because api have a bug in these value
    if (searchText === "aaaa") {
      error.innerText = "aaaa is Not a Valid Book!!";
      loadingSpinner(false);
    } else {
      // fetch the api
      const url = `https://openlibrary.org/search.json?q=${searchText}`;
      const res = await fetch(url);
      const data = await res.json();
      // show search result & if there is invalid search text show a error message
      if (data.numFound === 0) {
        error.innerText = `${searchText} is Not a Valid Book!!`;
      } else {
        searchResultNumber.innerText = `Total Book Found: ${data.docs.length} Out of ${data.numFound}`;
      }
      // call display book function
      displayBooks(data.docs);
      loadingSpinner(false);
    }
  } catch {
    // show error message
    searchResultNumber.textContent = "";
    error.innerText = "Something went wrong!! Please try Again!!!";
    loadingSpinner(false);
  }
  searchFilled.value = "";
});

// display books

const displayBooks = (books) => {
  books.forEach((book) => {
    // destructuring object properties
    const { title, first_publish_year, author_name, cover_i, type, language } = book;
    // api images & if api have no image show a alt image
    const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    const altImage = "http://via.placeholder.com/1080x1580";
    // create a card
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "card");
    bookCard.innerHTML = `
        <div class="card__image">
         <img src="${cover_i ? imgUrl : altImage}" alt="${title}" />
        </div>
        <h4>Title: ${title}</h4>
        <h5>Author: ${author_name ? author_name : "Unknown Author"}</h5>
        <p>Published On: ${first_publish_year ? first_publish_year : "Not Recorded"}</p>
        <div class="flex__area">
          <p>Type: ${type}</p>
          <p>language: ${language ? language : "Not Found"}</p>
        </div>
    `;
    booksContainer.appendChild(bookCard);
  });
};
