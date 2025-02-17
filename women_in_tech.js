'use strict';

function initSuccessStoryForm() {
    const form = document.getElementById("success-story-form");
    const storyContainer = document.getElementById("women_in_tech");

    if (!form || !storyContainer) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const story = document.getElementById("story").value;

        if (!name || !story) return;

        // Create a Bootstrap container for better layout control
        const storyWrapper = document.createElement("div");//main wrapper 
        storyWrapper.classList.add("container", "mt-4");

        const row = document.createElement("div");//center content
        row.classList.add("row", "justify-content-center");

        const col = document.createElement("div");
        col.classList.add("col-md-8", "col-lg-6");//responsive column sizes

        // Create the story card
        const card = document.createElement("div");
        card.classList.add("card", "mt-3", "p-3", "text-white", "bg-dark", "shadow-lg", "rounded");
        
        //card innerHTML
        card.innerHTML = `
            <div class="card-body">
                <h4 class="card-title text-warning">${name}</h4>
                <p class="card-text">${story}</p>
                <div class="d-flex justify-content-end">
                <button class="btn btn-danger mt-3 remove-story">❌ Remove</button>
            </div>
        </div>`;

        // Append elements to structure properly
        col.appendChild(card);
        row.appendChild(col);
        storyWrapper.appendChild(row);
        storyContainer.appendChild(storyWrapper);

        // Reset form
        form.reset();

        // Smooth fade-in effect
        setTimeout(() => card.classList.add("show"), 50);

        // Show thank you message
        alert("🎉 Thank you for sharing your story! 🌟");

        // Remove story on button click
        card.querySelector(".remove-story").addEventListener("click", () => {
            card.style.opacity = "0";
            setTimeout(() => storyWrapper.remove(), 500);//removes
        });
    });
}
// Player Check-in Form Logic
document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("user-form");
    const userTableBody = document.getElementById("user-table-body");

    if (!userForm || !userTableBody) return;

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (!name || !email) return;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td><button class="btn btn-danger remove-user">Remove</button></td>`;

        userTableBody.appendChild(newRow);
        userForm.reset();
    });

    userTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-user")) {
            event.target.closest("tr").remove();
        }
    });
});

// Memory game logic
document.addEventListener("DOMContentLoaded", () => {
    const memoryGameContainer = document.getElementById("memoryCard");
    if (!memoryGameContainer) return;

    const icons = ["🎯", "🚀", "🎨", "💡", "🎯", "🚀", "🎨", "💡"];
    let flippedCards = [];
    let matchedPairs = 0;

    icons.sort(() => 0.5 - Math.random());

    icons.forEach((icon, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        memoryGameContainer.appendChild(card);
    });

    function flipCard() {
        if (this.classList.contains("flipped") || flippedCards.length === 2) return;
        this.textContent = this.dataset.icon;
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 600);
        }
    }

    function checkMatch() {
        if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
            flippedCards.forEach(card => card.classList.add("matched"));
            matchedPairs++;
            if (matchedPairs === icons.length / 2) {
                alert("Congratulations! You've matched all pairs!");
            }
        } else {
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.textContent = "";
            });
        }
        flippedCards = [];
    }
});

// Work-life balance simulator logic
function updateBar(id, value) {
    let bar = document.getElementById(id);
    if (!bar) return;

    let currentWidth = parseInt(bar.style.width) || 0;
    bar.style.width = Math.max(0, Math.min(100, currentWidth + value)) + "%";
}

window.performActivity = function (activity) {
    switch (activity) {
        case "work":
            updateBar("happiness-bar", -10);
            updateBar("energy-bar", -20);
            updateBar("stress-bar", 15);
            break;
        case "exercise":
            updateBar("happiness-bar", 10);
            updateBar("energy-bar", -10);
            updateBar("stress-bar", -10);
            break;
        case "social":
            updateBar("happiness-bar", 15);
            updateBar("energy-bar", -5);
            updateBar("stress-bar", -10);
            break;
        case "rest":
            updateBar("happiness-bar", 5);
            updateBar("energy-bar", 20);
            updateBar("stress-bar", -5);
            break;
    }
};

// Index page for random/generated tips
document.addEventListener("DOMContentLoaded", function () {
    const tips = [
        "Take short breaks throughout the day.",
        "Set clear boundaries between work and personal time.",
        "Make time for hobbies and activities you enjoy.",
        "Practice mindfulness and stress-relief techniques.",
        "Stay physically active to boost energy and focus.",
        "Prioritize tasks to avoid feeling overwhelmed.",
        "Unplug from work emails and notifications after hours.",
        "Get enough sleep for better productivity and health."
    ];

    const tipDisplay = document.getElementById("random-tip");
    const generateTipBtn = document.getElementById("generate-tip");
    const newTipInput = document.getElementById("new-work-life-tip");
    const addTipBtn = document.getElementById("add-work-life-tip");
    const tipsList = document.getElementById("work-life-tips");

    if (generateTipBtn && tipDisplay) {
        generateTipBtn.addEventListener("click", function () {
            const randomIndex = Math.floor(Math.random() * tips.length);
            tipDisplay.textContent = tips[randomIndex];
        });
    }

    if (addTipBtn && newTipInput && tipsList) {
        addTipBtn.addEventListener("click", function () {
            const newTip = newTipInput.value.trim();
            if (newTip) {
                tips.push(newTip);
                const li = document.createElement("li");
                li.textContent = newTip;
                li.classList.add("list-group-item");
                tipsList.appendChild(li);
                newTipInput.value = ""; // Clear input field
            }
        });
    }
});

// GitHub API Fetch
async function fetchGitHubData() {
    try {
        document.getElementById("github-spinner").style.display = "inline-block";
        const response = await fetch('https://api.github.com/users/Ladyotero');
        const data = await response.json();
        document.getElementById("Ladyotero").textContent = data.name || "Not Available";
        document.getElementById("Card-Game").textContent = data.public_repos || "0";
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
    } finally {
        document.getElementById("github-spinner").style.display = "none";
    }
}// Show random Emoji- Index page
function showRandomEmoji() {
    const emojis = ["🚀", "💡", "🌟", "😎", "🔥", "🎯", "🎉", "💻", "🤖", "🌈"];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const emojiDisplay = document.getElementById("emojiDisplay");
    
    emojiDisplay.style.transform = "scale(1.2)";
    emojiDisplay.style.transition = "transform 0.2s";
    
    setTimeout(() => {
        emojiDisplay.innerText = emojis[randomIndex];
        emojiDisplay.style.transform = "scale(1)";
    }, 200);
    
}
// Navigation Function
window.goHome = function () {
    window.location.href = "index.html";
};
   
// Hobbies in a function (index.html)
document.querySelectorAll(".hobby-btn").forEach(button => {
    button.addEventListener("click", function() {
        const messages = {
            Pickleball:"Pickleball is the fastest-growing sport in America!🏓",
            Tennis:"Tennis is a fantastic workout and a lifelong sport!🎾",
            Foodie:"Exploring new flavors is an adventure in itself!🍕🍣",
            Breweries:"Craft beer lovers unite! Cheers!🍻"
        };

        const hobby = this.dataset.hobby;  // Get hobby from data attribute
        const messageElement = document.getElementById("hobby-message");

        if (messageElement) {
            messageElement.textContent = messages[hobby] || "Enjoy your hobbies! 😊";
        }
    });
});
    
