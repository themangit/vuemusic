export default {
  formatTime(time) {
    const mint = Math.floor(time / 60) || 0;
    const sec = Math.round(time - mint * 60 || 0);
    return `${mint}:${sec < 10 ? "0" : ""}${sec}`;
  },
};
