document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://picsum.photos/375/375";
  const photoContainer = document.getElementById("photoContainer");
  const fetchButton = document.getElementById("loadMoreBtn");
  const morephotosButton = document.getElementById("fetchMoreBtn");
  const grayscaleSlider = document.getElementById("toggleSwitch");
  let totalPhotos = 0;

  function fetchPhotos(count) {
    for (let i = 0; i < count; i++) {
      fetch(baseURL)
        .then((response) => {
          if (response.ok) {
            return response.url;
          } else {
            throw new Error("Failed to fetch photo");
          }
        })
        .then((photoUrl) => {
          const img = document.createElement("img");
          img.src = photoUrl;
          img.alt = "Random Photo";
          photoContainer.appendChild(img);
          totalPhotos++;
        })
        .catch((error) => console.error(error));
    }
  }

  function applyGrayscale() {
    const images = photoContainer.querySelectorAll("img");
    images.forEach((img) => {
      if (grayscaleSlider.checked) {
        img.classList.add("grayscale");
      } else {
        img.classList.remove("grayscale");
      }
    });
  }

  function fetchMorePhotos() {
    fetchPhotos(4); // Fetch four more photos
    applyGrayscale();
  }

  function fetchInitialPhotos() {
    photoContainer.innerHTML = ""; // Clear existing photos
    totalPhotos = 0; // Reset totalPhotos counter
    fetchPhotos(4); // Fetch four new photos
    applyGrayscale();
  }

  // Call fetchInitialPhotos when the website opens
  fetchInitialPhotos();

  fetchButton.addEventListener("click", fetchInitialPhotos);
  morephotosButton.addEventListener("click", fetchMorePhotos);
  grayscaleSlider.addEventListener("change", applyGrayscale);
});
