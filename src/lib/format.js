const msPerMinute = 60 * 1000,
  msPerHour = msPerMinute * 60,
  msPerDay = msPerHour * 24;

export function relativeTime(time) {
  const elapsed = Date.now() - time;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  }
  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  }
  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  }
  else {
    return Math.round(elapsed / msPerDay) + ' days ago';
  }
}

export function urlHost(url) { return new URL(url).host; }