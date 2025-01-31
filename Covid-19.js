// script.js

// Function to fetch global COVID-19 data
async function fetchGlobalData() {
    const response = await fetch('https://api.covid19api.com/summary');
    const data = await response.json();
    
    // Get global data
    const global = data.Global;
    
    // Update the UI
    document.getElementById('totalCases').querySelector('p').textContent = global.TotalConfirmed;
    document.getElementById('totalDeaths').querySelector('p').textContent = global.TotalDeaths;
    document.getElementById('totalRecovered').querySelector('p').textContent = global.TotalRecovered;
}

// Function to get COVID-19 data for a specific country
async function getCountryData() {
    const country = document.getElementById('country').value.trim();
    if (country === "") {
        alert("Please enter a country name");
        return;
    }

    const response = await fetch(`https://api.covid19api.com/country/${country.toLowerCase()}/status/confirmed/live`);
    const data = await response.json();

    if (data.length > 0) {
        const latestData = data[data.length - 1];
        document.getElementById('countryData').innerHTML = `
            <h2>Data for ${country.charAt(0).toUpperCase() + country.slice(1)}</h2>
            <p>Total Cases: ${latestData.Cases}</p>
            <p>Date: ${latestData.Date}</p>
        `;
    } else {
        document.getElementById('countryData').innerHTML = `<p>No data available for this country.</p>`;
    }
}

// Fetch global data when the page loads
fetchGlobalData();

