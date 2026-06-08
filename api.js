// URL del tuo server (quando lo deployi lo metti qui)
const SERVER = "https://TUO_SERVER_URL"; // <-- da cambiare

function saveClicks(userId, username, clicks) {
    return fetch(SERVER + "/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username, clicks })
    }).catch(() => {});
}

function loadLeaderboard() {
    return fetch(SERVER + "/leaderboard")
        .then(r => r.json())
        .catch(() => []);
}
