
document.addEventListener("DOMContentLoaded", () => {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  const gameBar = document.getElementById("gameBar");

  if (gameData && gameBar) {
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const rebuyTotal = players.reduce((acc, p) => acc + (1 + (p.rebuys || 0)), 0);
    const totalPot = (rebuyTotal * gameData.chipValue).toFixed(2);

    gameBar.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <button onclick="location.href='index.html'" class='home-btn'>🏠 Home</button>
          Buy-in: $${gameData.chipValue} for ${gameData.initialChips} chips | Group: ${gameData.groupName}
        </div>
        <div style="display: flex; gap: 15px; align-items: center;">
          <span id="totalPot">💰 Total Pot: $${totalPot}</span>
          <span id="gameTimer">⏱️ 0m 0s</span>
          <a href="poker-hands.html" title="Poker Hands" style="font-size: 20px;">🂡</a>
        </div>
      </div>
    `;
  }

  const timerEl = document.getElementById("gameTimer");
  if (timerEl && localStorage.getItem("timerActive") === "true") {
    const startTime = new Date(localStorage.getItem("gameStartTime"));
    const intervalId = setInterval(() => {
      if (localStorage.getItem("timerActive") !== "true") {
        clearInterval(intervalId);
        return;
      }
      const now = new Date();
      const elapsed = Math.floor((now - startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      timerEl.textContent = `⏱️ ${mins}m ${secs}s`;
    }, 1000);
  }

  const backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", () => {
      const onPlayersPage = window.location.pathname.includes("players.html");
      window.location.href = onPlayersPage ? "index.html" : "javascript:history.back()";
    });
  }
});
