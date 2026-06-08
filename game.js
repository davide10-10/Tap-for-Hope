let energy = 200;
let coins = 0;

const tapButton = document.getElementById("tapButton");
const rechargeButton = document.getElementById("rechargeButton");
const leaderboardButton = document.getElementById("leaderboardButton");
const offersButton = document.getElementById("offersButton");

const energyFill = document.getElementById("energyFill");
const energyText = document.getElementById("energyText");
const coinsSpan = document.getElementById("coins");
const leaderboardDiv = document.getElementById("leaderboard");

function updateUI() {
    coinsSpan.textContent = coins;
    energyText.textContent = energy;
    energyFill.style.width = (energy / 200 * 100) + "%";

    if (energy <= 0) {
        rechargeButton.classList.remove("hidden");
        tapButton.disabled = true;
    } else {
        rechargeButton.classList.add("hidden");
        tapButton.disabled = false;
    }
}

tapButton.addEventListener("click", () => {
    if (energy <= 0) return;

    energy--;
    coins++;

    tapButton.style.transform = "scale(0.85)";
    setTimeout(() => tapButton.style.transform = "scale(1)", 100);

    updateUI();
});

rechargeButton.addEventListener("click", () => {
    showAdToRecharge().then(() => {
        energy = 200;
        updateUI();
    });
});

offersButton.addEventListener("click", () => {
    showAdsForOffer(5).then(() => {
        coins += 1000;
        updateUI();
    });
});

leaderboardButton.addEventListener("click", () => {
    leaderboardDiv.classList.remove("hidden");
    leaderboardDiv.textContent = "Caricamento...";

    loadLeaderboard().then(list => {
        leaderboardDiv.innerHTML = "";
        list.forEach((item, i) => {
            leaderboardDiv.innerHTML += `${i+1}. @${item.username} — ${item.clicks} ❤️<br>`;
        });
    });
});

updateUI();
