console.log("script.js loaded");

const gifContainer = document.querySelector("#gif-container");
const fetchGifBtn = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

const apiKey = "YOS4kgwpoj4zrYFEczbBnR29jrfRypNM";

fetchGifBtn.addEventListener("click", async function () {
  const searchTerm = searchInput.value.trim() || "cat";

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=12&rating=g`;

  try {
    gifContainer.innerHTML = "<p class='text-center'>Loading...</p>";

    const response = await fetch(endpoint);
    const data = await response.json();

    const images = data.data.map(function (gif) {
      return gif.images.original.url;
    });

    gifContainer.innerHTML = "";

    for (let i = 0; i < images.length; i++) {
      gifContainer.innerHTML += `
        <div class="col-6 col-md-4 col-lg-3">
          <img src="${images[i]}" class="img-fluid rounded">
        </div>
      `;
    }

    if (images.length === 0) {
      gifContainer.innerHTML =
        "<p class='text-center'>No GIF found.</p>";
    }

    console.log(images);
  } catch (error) {
    console.log("Error:", error);
    gifContainer.innerHTML =
      "<p class='text-danger text-center'>Error loading GIFs.</p>";
  }
});