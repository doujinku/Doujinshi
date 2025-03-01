let comics = [];
let currentPage = 1;
const itemsPerPage = 8; // Komik per halaman

async function fetchComics() {
    const response = await fetch("komik.json");
    comics = await response.json();
    loadComics();
}

function loadComics() {
    const comicList = document.getElementById("comicList");
    comicList.innerHTML = "";
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentComics = comics.slice(startIndex, endIndex);
    
    currentComics.forEach(comic => {
        const comicCard = document.createElement("div");
        comicCard.classList.add("comic-card");
        comicCard.innerHTML = `
            <a href="${comic.file}" target="_blank">
                <img data-src="${comic.cover}" alt="${comic.title}">
                <h3>${comic.title}</h3>
            </a>
        `;
        comicList.appendChild(comicCard);
    });

    applyLazyLoading();
    updatePagination();
}

function applyLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.classList.add('loaded');
    });
}

function updatePagination() {
    document.getElementById("pageNumber").textContent = currentPage;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage * itemsPerPage >= comics.length;
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadComics();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage * itemsPerPage < comics.length) {
        currentPage++;
        loadComics();
    }
});

window.onload = fetchComics;