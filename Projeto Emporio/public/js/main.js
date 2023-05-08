// Javascrypt para fazer a barra de navigação horizontal
const btnLeft = document.querySelector(".left-btn");
const btnRight = document.querySelector(".right-btn");
const tabMenu = document.querySelector(".tab-menu");

const IconVisibility = () => {
  let scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
  //console.log("1.", scrollLeftValue);
  let scrollabreWidht = tabMenu.scrollWidth - tabMenu.clientWidth;
  //console.log("2.", scrollabreWidht);

  btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
  btnRight.style.display = scrollabreWidht > scrollLeftValue ? "block" : "none";
}

btnRight.addEventListener ("click", () => {
  tabMenu.scrollLeft += 316.5;
  //IconVisibility();
  setTimeout(() => IconVisibility(), 50);
});

btnLeft.addEventListener ("click", () => {
  tabMenu.scrollLeft -= 316.5;
  //IconVisibility();
  setTimeout(() => IconVisibility(), 50);
});

window.onload = function() {
  btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
  btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";
}

window.onresize = function() {
  btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
  btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";

  let scrollLeftValue = Math.round(tabMenu.scrollLeft);

  btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
}

// Javascrrypt para fazer a barra de vavegação draggable
let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
  if(!activeDrag) return;
  tabMenu.scrollLeft -= drag.movementX;
  IconVisibility();
  tabMenu.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
  activeDrag = false;
  tabMenu.classList.remove("dragging");
});

tabMenu.addEventListener("mousedown", () => {
  activeDrag = true;
});

