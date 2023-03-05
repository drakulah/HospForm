const searchBox = document.querySelector('#searchInput');

let prevValue = searchBox.value;

setInterval(() => {
  if (searchBox.value === prevValue) return MaaMeiAagaya.pause();
  MaaMeiAagaya.play();
  setTimeout(() => { prevValue = searchBox.value; }, 200);
}, 400);