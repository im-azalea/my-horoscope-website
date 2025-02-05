const fetch = require('node-fetch');
const fs = require('fs');

const url = "https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/?zodiacSign=leo";

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'best-daily-astrology-and-horoscope-api.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY // API Key dari GitHub Secrets
    }
};

fetch(url, options)
    .then(response => response.json())
    .then(data => {
        const updatedData = {
            horoscope: data.horoscope || "No data available"
        };
        fs.writeFileSync('data.json', JSON.stringify(updatedData, null, 2));
        console.log("Data updated successfully.");
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        process.exit(1);
    });
