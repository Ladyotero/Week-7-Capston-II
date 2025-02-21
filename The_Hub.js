'use script';
const form = document.getElementById("userForm");
const tableBody = document.getElementById("tableBody");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get input values
    let nameInput = document.getElementById("name").value;
    let emailInput = document.getElementById("email").value;

    if (nameInput && emailInput) {
        // Create a new row in the table
        const row = document.createElement("tr");
        row.innerHTML = `<td>${nameInput}</td><td>${emailInput}</td>`;

        // Append the new row to the table
        tableBody.appendChild(row);

        // Clear form inputs
        form.reset();
    }
});
//cookie fortune project
function generateFortune() {
    'use strict';
let name = document.getElementById("userName").value.trim();
        let age = parseInt(document.getElementById("userAge").value.trim());
        let dream = document.getElementById("userDream").value;
        let vibe = document.getElementById("userVibe").value;
        let fortuneDisplay = document.getElementById("fortuneDisplay");

        if (!name || isNaN(age) || !dream || !vibe) {
            fortuneDisplay.style.display = "block";
            fortuneDisplay.innerText = "⚠️ Please fill out all fields to unlock your fortune!";
            return;
        }

        let fortune = `✨ ${name}, your future is bright! `;
        
        // Name-based fortunes
        if (name.length > 7) {
            fortune += `You have the patience of a Jedi and will achieve greatness over time. `;
        } else if (name.length < 5) {
            fortune += `You're a powerhouse of energy! Bold moves will bring success. `;
        } else {
            fortune += `Creativity flows through you like magic—embrace your unique vision! `;
        }

        // Age-based fortunes
        if (age < 18) {
            fortune += `Your journey is just beginning! Stay curious and keep exploring. `;
        } else if (age <= 30) {
            fortune += `You are entering a golden era of growth and unexpected opportunities. `;
        } else if (age <= 40) {
            fortune += `This is your time to build, connect, and create something legendary. `;
        } else {
            fortune += `Every experience you have had is shaping you into an unstoppable force. `;
        }

        // Dream-based fortunes
        let dreamFortunes = {
            "tech": "The digital world is calling! Your ideas will revolutionize the future. 💻🚀",
            "travel": "Adventure awaits! A new destination will open doors you never imagined. ✈️🌍",
            "entrepreneur": "Your vision is powerful—trust it. The world needs what you're building! 💡📈",
            "mentor": "Your wisdom is a gift. Someone is life will change because of your guidance. 🌟"
        };
        fortune += dreamFortunes[dream] + " ";

        // Vibe-based bonus
        let vibeFortunes = {
            "adventurous": "Embrace bold choices! The universe rewards those who dare to dream big. 🌈",
            "focused": "Stay locked in—you're on the verge of something incredible. 🔥",
            "chill": "Take it easy, but stay open. Unexpected joy is just around the corner. 😌",
            "dreamy": "Your ideas are magic! A creative spark will lead to something amazing. ✨"
        };
        fortune += vibeFortunes[vibe];

        // Display result with animation
        fortuneDisplay.innerText = fortune;
        fortuneDisplay.style.display = "block";
        fortuneDisplay.style.opacity = "0";
        fortuneDisplay.style.transition = "opacity 1.2s ease-in-out, transform 0.5s";
        fortuneDisplay.style.transform = "scale(0.9)";

        setTimeout(() => {
            fortuneDisplay.style.opacity = "1";
            fortuneDisplay.style.transform = "scale(1)";
        }, 100);
    }     
     // Initialize the image map on the page load(the hub page)
     $(document).ready(function () {
        // Make the image map responsive
        $('Spacetime').mapster({
        });
    });

    // weather-Format
    async function getWeather(event) {
        event.preventDefault();

        const city = document.getElementById("cityinput").value;
        const country = document.getElementById("countryinput").value;
        const weatherDiv = document.getElementById("weatherdiv");

        const formattedCity = encodeURIComponent(city);
        const formattedCountry = encodeURIComponent(country);
        const APIKey = "b26f4c6f1777421b985b7848d83823e1";

        try {
            const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${formattedCity}&country=${formattedCountry}&key=${APIKey}`);
            
            const data = response.data.data[0];

            let cardlayout = `
            <div class="card mx-auto mt-3" style="width: 22rem;">
                <div class="card-header bg-primary text-white">
                    🌆 ${data.city_name}, ${country.toUpperCase()}
                </div>
                <div class="card-body">
                    <p>🌅 <strong>Sunrise:</strong> ${data.sunrise}</p>
                    <p>🌇 <strong>Sunset:</strong> ${data.sunset}</p>
                    <p>🌡 <strong>Temperature:</strong> ${data.temp}°F</p>
                    <p>⛅ <strong>Weather:</strong> ${data.weather.description}</p>
                </div>
            </div>`;

            weatherDiv.innerHTML = cardlayout;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            weatherDiv.innerHTML = "<p class='text-danger'>⚠️ Error fetching weather data. Please check your city and country names.</p>";
        }
    }

    document.getElementById("weatherForm").addEventListener("submit", getWeather);
    
// Navigation Function
document.getElementById("homeButton").addEventListener("click", function () {
    window.location.href = "index.html";
});