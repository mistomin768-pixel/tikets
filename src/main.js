const main = document.querySelector(".main-div");
const choose = document.querySelector(".choose");
const input = document.querySelector(".search");
const modal = document.querySelector(".mod-ov");
const paper = document.querySelector(".paper");

let countPage;
let sizeOnPage = 20;
let numPage = 0;
let allEvents = [];

function loadEvents(category = "jazz", page = 0) {

  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=l26p0ZPVsN2vvIg2RJw3ZxsimooGpxJX&classificationName=${category}&size=${sizeOnPage}&page=${page}`)
    .then(response => response.json())
    .then(data => {

      countPage = data.page.totalPages;
      allEvents = data._embedded.events;

      main.innerHTML = "";

      allEvents.forEach((element, index) => {

        const genreId = element.classifications?.[0]?.genre?.id || "";

        main.innerHTML += `
        <div class="card" data-index="${index}" data-genre="${genreId}">
            <img src="${element.images[0].url}" class="card-img">
            <p class="card-title">${element.name}</p>
            <p class="data-card">${element.dates.start.localDate || "No date"}</p>
            <p class="card-place">${element._embedded?.venues?.[0]?.name || "Unknown place"}</p>
        </div>
        `;
      });

      createPagination(category);
    });
}

function createPagination(category) {

  paper.innerHTML = "";

  for (let i = 0; i < countPage; i++) {

    if (i <= 5 || i === countPage - 1) {

      paper.innerHTML += `
      <div class="paper1 ${i === numPage ? "active-page" : ""}" data-page="${i}">
        ${i + 1}
      </div>
      `;

    } else if (i === 6) {

      paper.innerHTML += `
      <div class="paper1">...</div>
      `;
    }
  }

  const paper1 = document.querySelectorAll(".paper1");

  paper1.forEach((el) => {

    el.addEventListener("click", () => {

      if (el.textContent === "...") return;

      paper1.forEach(item => {
        item.classList.remove("active-page");
      });

      el.classList.add("active-page");

      numPage = Number(el.dataset.page);

      loadEvents(category, numPage);
    });
  });
}

loadEvents();

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    modal.innerHTML = "";
  }
});

main.addEventListener("click", (e) => {

  const card = e.target.closest(".card");

  if (!card) return;

  const index = card.dataset.index;

  const event = allEvents[index];

  modal.innerHTML = `
  <div class="overlay">

    <div class="modal">

      <img src="${event.images[0].url}" alt="" class="modal-logo">

      <div class="modal-box">

        <img src="${event.images[0].url}" alt="" class="modal-box-poster">

        <ul class="modal-box-list">

          <li class="modal-box-list-item">
            <h4 class="modal-box-list-item-title">INFO</h4>

            <p class="modal-box-list-item-desc">
              ${event.info || event.pleaseNote || "No information"}
            </p>
          </li>

          <li class="modal-box-list-item">
            <h4 class="modal-box-list-item-title">WHEN</h4>

            <p class="modal-box-list-item-desc">
              ${event.dates?.start?.localDate || "Unknown"}
            </p>

            <p class="modal-box-list-item-desc">
              ${event.dates?.start?.localTime || "No time"}
            </p>
          </li>

          <li class="modal-box-list-item">
            <h4 class="modal-box-list-item-title">WHERE</h4>

            <p class="modal-box-list-item-desc">
              ${event._embedded?.venues?.[0]?.city?.name || ""}
            </p>

            <p class="modal-box-list-item-desc">
              ${event._embedded?.venues?.[0]?.name || ""}
            </p>
          </li>

          <li class="modal-box-list-item">
            <h4 class="modal-box-list-item-title">WHO</h4>

            <p class="modal-box-list-item-desc">
              ${event.name}
            </p>
          </li>

          <li class="modal-box-list-item">
            <h4 class="modal-box-list-item-title">PRICE</h4>

            <p class="modal-box-list-item-desc">
              Standard ticket
            </p>

            <a href="${event.url}" target="_blank">
              <button class="modal-box-list-item-buy">
                BUY TICKETS
              </button>
            </a>

          </li>

        </ul>

      </div>

    </div>

  </div>
  `;
});

choose.addEventListener("click", () => {

  const value = input.value.toLowerCase();

  numPage = 0;

  loadEvents(value, numPage);
});