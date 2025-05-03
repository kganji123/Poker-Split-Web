
document.addEventListener("DOMContentLoaded", () => {
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  const gameBar = document.getElementById("gameBar");
  const timer = document.getElementById("gameTimer");

  if (gameData && gameBar) {
    gameBar.innerText = `Buy-in: $${gameData.chipValue} for ${gameData.initialChips} chips | Group: ${gameData.groupName}`;
  }

  const backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", () => {
      history.back();
    });
  }

  if (timer) {
    const startTime = new Date(localStorage.getItem("gameStartTime"));
    setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now - startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      timer.textContent = `⏱️ ${mins}m ${secs}s`;
    }, 1000);
  }
});
