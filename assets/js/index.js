/*

// html elements

const booksContainer = document.getElementById("books__container");
const searchResultNumber = document.getElementById("search__result__number");
const error = document.getElementById("error");
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
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  booksContainer.textContent = "";
  searchResultNumber.textContent = "";
  error.textContent = "";
  const searchFilled = document.getElementById("books__search__input");
  const searchText = searchFilled.value;
  loadingSpinner(true);
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      loadingSpinner(false);
      displayBooks(data.docs);
      if (data.numFound === 0) {
        error.innerText = `${searchText} is Not a Valid Book!!`;
      } else {
        searchResultNumber.innerText = `Total Book Found ${data.length} Out of ${data.numFound}`;
      }
    })
    .catch((err) => console.log(err));
  // const res = await fetch(url);
  // const data = await res.json();
  searchFilled.value = "";
  // displayBooks(data.docs);
  // loadingSpinner(false);
  //  .catch(err){
  //   console.log(err);
  //   searchResultNumber.textContent = "";
  //   loadingSpinner(false);
  // }
});

// display books

const displayBooks = (books) => {
  console.log(books);
  books.forEach((book) => {
    // destructuring object properties
    const {
      title,
      first_publish_year,
      author_name,
      cover_i,
      type,
      language,
      publish_place,
    } = book;
    // images
    const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    const altImage = "http://via.placeholder.com/1080x1580";
    // create a card
    const bookCard = document.createElement("card");
    bookCard.setAttribute("class", "card");
    bookCard.innerHTML = `
        <div class="card__image">
         <img src="${cover_i ? imgUrl : altImage}" alt="${title}" />
        </div>
        <h4>Title: ${title}</h4>
        <h5>Author: ${author_name ? author_name : "Unknown Author"}</h5>
        <p>Published On: ${
          first_publish_year ? first_publish_year : "Not Recorded"
        }</p>
        <div class="flex__area">
          <p>Type: ${type}</p>
          <p>language: ${language}</p>
        </div>
        
    `;
    booksContainer.appendChild(bookCard);
  });
};

*/

{
  /* 
  <h4>Publish Place : ${publish_place[0]}</h4>
  <p>Published On: ${first_publish_year ? first_publish_year : "Not Recorded"}</p> */
}

// html elements

const booksContainer = document.getElementById("books__container");
const searchResultNumber = document.getElementById("search__result__number");
const error = document.getElementById("error");
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
  try {
    loadingSpinner(true);
    e.preventDefault();
    booksContainer.textContent = "";
    searchResultNumber.textContent = "";
    error.textContent = "";
    const searchFilled = document.getElementById("books__search__input");
    const searchText = searchFilled.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.numFound === 0) {
      error.innerText = `${searchText} is Not a Valid Book!!`;
    } else {
      searchResultNumber.innerText = `Total Book Found: ${data.docs.length} Out of ${data.numFound}`;
    }
    searchFilled.value = "";
    displayBooks(data.docs);
    loadingSpinner(false);
  } catch {
    searchResultNumber.textContent = "";
    error.innerText = "Something went wrong!! Please try Again!!!";
  }
});

// display books

const displayBooks = (books) => {
  console.log(books.length);
  books.forEach((book) => {
    // destructuring object properties
    const { title, first_publish_year, author_name, cover_i, type, language } = book;
    // images
    const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    const altImage = "http://via.placeholder.com/1080x1580";
    // create a card
    const bookCard = document.createElement("card");
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
          <p>language: ${language? language : "Not Found"}</p>
        </div>
    `;
    booksContainer.appendChild(bookCard);
  });
};
