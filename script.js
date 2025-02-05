// Mengambil data dari file data.json yang tersimpan di repository
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Struktur data.json diasumsikan seperti: { "horoscope": "Your horoscope text" }
    document.getElementById('horoscope').innerHTML = `<p>${data.horoscope}</p>`;
  })
  .catch(error => {
    console.error('Error loading data:', error);
    document.getElementById('horoscope').innerHTML = `<p>Error loading horoscope data.</p>`;
  });
