const fetch = require('node-fetch');
const fs = require('fs');

const zodiacSigns = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

const API_HOST = "best-daily-astrology-and-horoscope-api.p.rapidapi.com";
const API_KEY = process.env.RAPIDAPI_KEY;

async function fetchHoroscope(sign) {
    const url = `https://${API_HOST}/api/Detailed-Horoscope/?zodiacSign=${sign}`;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-host": API_HOST,
            "x-rapidapi-key": API_KEY
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.horoscope || "No data available";
    } catch (error) {
        console.error(`Error fetching horoscope for ${sign}:`, error);
        return "Failed to fetch horoscope.";
    }
}

async function updateHoroscopeData() {
    const horoscopeData = {};

    for (const sign of zodiacSigns) {
        horoscopeData[sign] = await fetchHoroscope(sign);
    }

    fs.writeFileSync("data.json", JSON.stringify(horoscopeData, null, 2));
    console.log("Horoscope data updated.");
}

updateHoroscopeData();
