const main = document.querySelector(".main-div");

fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=l26p0ZPVsN2vvIg2RJw3ZxsimooGpxJX")
  .then(response => response.json())
  .then(data => {

    
    const events = data._embedded.events;

    events.forEach(element => {

      main.innerHTML += `
        <div class="card">
            <img src="${element.images[0].url}" alt="" class="card-img">
            <p class="card-title">${element.name}</p>
            <p class="data-card">${element.dates.start.localDate}</p>
            <p class="card-place">${element._embedded.venues[0].name}</p>
        </div>
      `;

    });

  });