document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://picsum.photos/375/375";
  const photoContainer = document.getElementById("photoContainer");
  const fetchButton = document.getElementById("loadMoreBtn");
  const morePhotosButton = document.getElementById("fetchMoreBtn");
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
                  const photoContainerItem = document.createElement("div");
                  photoContainerItem.classList.add("photo-container-item");

                  const img = document.createElement("img");
                  img.src = photoUrl;
                  img.alt = "Random Photo";
                  photoContainerItem.appendChild(img);

                  const authorBox = document.createElement("div");
                  authorBox.classList.add("author");
                  authorBox.innerHTML = `
                      <p class="author-name">Lukas Budimaier</p>
                      <p class="img-link">https://unsplash.com/photos/pwaaqfoMibl</p>
                  `;
                  photoContainerItem.appendChild(authorBox);

                  photoContainer.appendChild(photoContainerItem);

                  totalPhotos++;
              })
              .catch((error) => console.error(error));
      }
  }

  function applyGrayscale() {
      const images = photoContainer.querySelectorAll(".photo-container-item img");
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
      photoContainer.innerHTML = ""; 
      totalPhotos = 0; 
      fetchPhotos(4); 
      applyGrayscale();
  }

  fetchInitialPhotos();

  fetchButton.addEventListener("click", fetchInitialPhotos);
  morePhotosButton.addEventListener("click", fetchMorePhotos);
  grayscaleSlider.addEventListener("change", applyGrayscale);
});
