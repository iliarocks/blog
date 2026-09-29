for (const player of document.querySelectorAll(".video")) {
  const video = player.querySelector("video");
  const button = player.querySelector("button");

  function update() {
    button.textContent = video.ended ? "Replay" : video.paused ? "Play" : "Pause";
  }

  for (const event of ["play", "pause", "ended"]) {
    video.addEventListener(event, update);
  }

  button.addEventListener("click", async () => {
    if (!video.paused) {
      video.pause();
      return;
    }

    if (video.error) video.load();
    if (video.ended) video.currentTime = 0;
    await video.play();
  });

  update();
}
