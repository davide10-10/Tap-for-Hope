let energy = 200;
let clicks = 0;

const tapButton = document.getElementById("tapButton");
const rechargeButton = document.getElementById("rechargeButton");
const offersButton = document.getElementById("offersButton");
const leaderboardButton = document.getElementById("leaderboardButton");
const clicksSpan = document.getElementById("clicks");
const energySpan = document.getElementById("energy");
const leaderboardDiv = document.getElementById("leaderboard");

// se sei in Telegram WebApp, puoi usare:
// const tg = window.Telegram?.WebApp;
// const user = tg?.initDataUnsafe?.user;

function updateUI() {
    clicksSpan.textContent = clicks;
    energySpan.textContent = energy;

    if (energy <= 0) {
        rechargeButton.classList.remove("hidden");
        tapButton.disabled = true;
    } else {
        rechargeButton.classList.add("hidden");
        tapButton.disabled = false;
    }
}

tapButton.addEventListener("click", () => {
    if (energy <= 0) {
        return;
    }

    energy--;
    clicks++;
    updateUI();

    // qui in futuro puoi salvare periodicamente i click
    // es: ogni 50 click
});

rechargeButton.addEventListener("click", () => {
    showAdToRecharge().then(() => {
        energy = 200;
        updateUI();
    });
});

offersButton.addEventListener("click", () => {
    // esempio: guarda 5 ads → +1000 click
    const adsCount = 5;
    const reward = 1000;

    showAdsForOffer(adsCount).then(() => {
        clicks += reward;
        updateUI();
    });
});

leaderboardButton.addEventListener("click", () => {
    leaderboardDiv.classList.remove("hidden");
    leaderboardDiv.textContent = "Caricamento classifica...";

    loadLeaderboard().then(list => {
        if (!list || list.length === 0) {
            leaderboardDiv.textContent = "Nessun dato ancora.";
            return;
        }

        leaderboardDiv.innerHTML = "";
        list.forEach((item, index) => {
            const row = document.createElement("div");
            row.textContent = `${index + 1}. @${item.username || "utente"} – ${item.clicks} click`;
            leaderboardDiv.appendChild(row);
        });
    });
});

// inizializza UI
updateUI();
