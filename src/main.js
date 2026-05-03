const main = document.querySelector(".main-div");
const genreMap = {
  rock: "KnvZfZ7vAeA",
  pop: "KnvZfZ7vAev",
  sports: "KZFzniwnSyZfZ7v7nE",
  music: "KZFzniwnSyZfZ7v7nJ"
};

fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=l26p0ZPVsN2vvIg2RJw3ZxsimooGpxJX")
  .then(response => response.json())
  .then(data => {


    const events = data._embedded.events;

    events.forEach(element => {
      const genreName =
        element.classifications?.[0]?.genre?.name.toLowerCase();

      const genreId =
        element.classifications?.[0]?.genre?.id || "";

        console.log(genreName);
      genreMap[genreName] = genreId;

      main.innerHTML += `
  <div class="card" data-genre="${genreId}">
      <img src="${element.images[0].url}" class="card-img">
      <p class="card-title">${element.name}</p>
      <p class="data-card">${element.dates.start.localDate}</p>
      <p class="card-place">${element._embedded.venues[0].name}</p>
  </div>
`;
    });

  });
const modal = document.querySelector(".overlay");

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
});
main.addEventListener("click", (e) => {
  if (e.target.closest(".card")) {
    modal.style.display = "block";
  }
});

const input = document.querySelector(".search");

input.addEventListener("input", () => {

  const value = input.value.toLowerCase();

  const cards = document.querySelectorAll(".card");

  // якщо пусто → показати всі
  if (value === "") {

    cards.forEach(card => {
      card.style.display = "flex";
    });

    return;
  }

  const genreId = genreMap[value];

  cards.forEach(card => {

    if (card.dataset.genre === genreId) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});