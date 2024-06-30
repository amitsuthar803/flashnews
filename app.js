const url = "https://google-news13.p.rapidapi.com/business?lr=en-US";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "5d1b8b2026mshf459695716c091ep18ca55jsn6e72fbad925b",
    "x-rapidapi-host": "google-news13.p.rapidapi.com",
  },
};

const newsContainer = document.querySelector(".news-container");
const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");
const badges = document.querySelectorAll(".badge span");

getData("latest");

async function fetchData(query) {
  try {
    const response = await fetch(
      `https://google-news13.p.rapidapi.com/${query}?lr=en-IN`,
      options
    );
    const data = await response.json();
    console.log(data.items);
    return data.items;
  } catch (error) {
    console.error("Error while fetching the data:", error);
    return [];
  }
}

// responsible to display news in body
function displayNews(articles) {
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    console.log(article.images.thumbnail);

    if (article.images) {
      const newsCardHTML = `
        <div class="news-card">
        <div class='img-box'>
        <img class="news-img" src="${article.images.thumbnailProxied}"   alt="${article.title}">
        </div>
          <div class="news-data">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
    
          </div>
        </div>
      `;
      newsContainer.innerHTML += newsCardHTML;
    }
  });
}

function showLoading() {
  newsContainer.innerHTML = "<div class='loader'></div>";
}

function showError() {
  newsContainer.innerHTML =
    "<p>Failed to fetch news. Please try again later.</p>";
}

async function getData(query) {
  showLoading();
  try {
    const articles = await fetchData(query);
    if (articles.length > 0) {
      displayNews(articles);
    } else {
      showError();
    }
  } catch (error) {
    console.error("Error while fetching news", error);
    showError();
  }
}

function handleCategoryClick(event) {
  const category = event.target.getAttribute("data-category");
  badges.forEach((badge) => badge.classList.remove("active"));
  event.target.classList.add("active");
  getData(category);
}

badges.forEach((badge) => {
  badge.addEventListener("click", handleCategoryClick);
});

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  getData(searchTerm);
  searchInput.value = "";
});

searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const searchTerm = searchInput.value;
    getData(searchTerm);
    searchInput.value = "";
  }
});
