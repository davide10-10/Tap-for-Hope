const API_URL = "https://tap-for-hope-server.onrender.com/api";

const tg = window.Telegram.WebApp;
const telegramId = tg.initDataUnsafe.user.id;
const username = tg.initDataUnsafe.user.username;

const heart = document.getElementById("heart");
const clicksEl = document.getElementById("clicks");
const rechargeBtn = document.getElementById("recharge-btn");
const rewardBtn = document.getElementById("reward-btn");

// Initialize user
async function initUser() {
  const res = await fetch(`${API_URL}/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telegramId, username })
  });
  const data = await res.json();
  clicksEl.innerText = data.clicks;
}
initUser();

// Tap heart
heart.addEventListener("click", async () => {
  const res = await fetch(`${API_URL}/click`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telegramId })
  });

  const data = await res.json();

  if (data.error === "NO_ENERGY") {
    tg.showAlert("You have no energy left!");
    return;
  }

  clicksEl.innerText = data.clicks;
});

// Recharge energy with rewarded ad
rechargeBtn.addEventListener("click", () => {
  show_11123437().then(() => {
    fetch(`${API_URL}/reward-energy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegramId })
    })
    .then(res => res.json())
    .then(() => {
      tg.showAlert("Energy recharged!");
    });
  });
});

// Reward 400 clicks with rewarded ad
rewardBtn.addEventListener("click", () => {
  show_11123437().then(() => {
    fetch(`${API_URL}/reward-clicks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegramId })
    })
    .then(res => res.json())
    .then(data => {
      clicksEl.innerText = data.clicks;
      tg.showAlert("You earned 400 clicks!");
    });
  });
});
