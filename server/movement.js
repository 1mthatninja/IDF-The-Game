function movePlayer(player) {

  let dx = player.targetX - player.x;
  let dy = player.targetY - player.y;

  const dist = Math.hypot(dx, dy);

  // STOP COMPLETELY
  if (dist < 0.5) {
    player.x = player.targetX;
    player.y = player.targetY;
    return;
  }

  dx /= dist;
  dy /= dist;

  player.x += dx * player.speed * 0.05;
  player.y += dy * player.speed * 0.05;
}

module.exports = { movePlayer };