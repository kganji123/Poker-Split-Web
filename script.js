
document.addEventListener("DOMContentLoaded", () => {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  const gameBar = document.getElementById("gameBar");
  const timer = document.getElementById("gameTimer");
  const totalMoneyBoard = document.getElementById("totalMoneyOnBoard");

  if (gameData && gameBar) {
    gameBar.innerHTML = `<button onclick="location.href='index.html'" class='home-btn'>🏠 Home</button> Buy-in: $${gameData.chipValue} for ${gameData.initialChips} chips | Group: ${gameData.groupName}`;
  }

  if (totalMoneyBoard && gameData) {
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const rebuyTotal = players.reduce((acc, p) => acc + (1 + (p.rebuys || 0)), 0);
    const total = rebuyTotal * gameData.chipValue;
    totalMoneyBoard.textContent = `💰 Total Pot: $${total.toFixed(2)}`;
  }

  if (timer && localStorage.getItem("timerActive") === "true") {
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
      timer.textContent = `⏱️ ${mins}m ${secs}s`;
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
