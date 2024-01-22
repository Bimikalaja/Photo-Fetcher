document.addEventListener("DOMContentLoaded", function () {
  const photoContainer = document.getElementById("photoContainer");
  const loadInitialBtn = document.getElementById("loadMoreBtn");
  const fetchMoreBtn = document.getElementById("fetchMoreBtn");
  const toggleSwitch = document.getElementById("toggleSwitch");
  let totalPhotos = 0;

  function fetchPhotos(count) {
    for (let i = 0; i < count; i++) {
      fetch("https://picsum.photos/375/375")
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
      if (toggleSwitch.checked) {
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

  loadInitialBtn.addEventListener("click", fetchInitialPhotos);
  fetchMoreBtn.addEventListener("click", fetchMorePhotos);
  toggleSwitch.addEventListener("change", applyGrayscale);
});




  