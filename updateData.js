const fetch = require('node-fetch');
const fs = require('fs');

const API_KEY = process.env.RAPIDAPI_KEY;
const zodiacSigns = [
    "aries", "taurus", "gemini", "cancer", "leo", 
    "virgo", "libra", "scorpio", "sagittarius", 
    "capricorn", "aquarius", "pisces"
];

async function fetchHoroscope(sign) {
    const url = `https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/?zodiacSign=${sign}`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-host": "best-daily-astrology-and-horoscope-api.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(`Response for ${sign}:`, JSON.stringify(data, null, 2));  // Log response data
        return data.horoscope || "No data available";
    } catch (error) {
        console.error(`Error fetching horoscope for ${sign}:`, error);
        return "Failed to fetch horoscope.";
    }
}

async function updateHoroscopes() {
    const horoscopes = {};

    for (let sign of zodiacSigns) {
        horoscopes[sign] = await fetchHoroscope(sign);
    }

    fs.writeFileSync('data.json', JSON.stringify(horoscopes, null, 2));
    console.log("Horoscope data updated successfully.");
}

updateHoroscopes();
