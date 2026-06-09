const API_URL = "https://YOUR-RENDER-URL/api";

async function loadLeaderboard() {
  const res = await fetch(`${API_URL}/leaderboard`);
  const data = await res.json();

  const container = document.getElementById("leaderboard-list");
  container.innerHTML = "";

  data.forEach((user, index) => {
    const div = document.createElement("div");
    div.classList.add("lb-item");

    if (index === 0) div.classList.add("lb-1");
    if (index === 1) div.classList.add("lb-2");
    if (index === 2) div.classList.add("lb-3");

    div.innerHTML = `
      <span>#${index + 1} @${user.username}</span>
      <span>${user.clicks} clicks</span>
    `;

    container.appendChild(div);
  });
}

loadLeaderboard();
