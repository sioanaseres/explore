// middle text animation
const sectionTextMiddle = document.querySelector(".letter-by-letter");
const strText = sectionTextMiddle.textContent;
const splitText = strText.split("");
sectionTextMiddle.textContent = "";
for (let i = 0; i < splitText.length; i++) {
  sectionTextMiddle.innerHTML += "<span>" + splitText[i] + "</span>";
}
let char = 0;
let timer = setInterval(onTick, 50);
function onTick() {
  const span = sectionTextMiddle.querySelectorAll("span")[char];
  span.classList.add("fade");
  char++;
  if (char === splitText.length) {
    complete();
    return;
  }
}

function complete() {
  clearInterval(timer);
  timer = null;
}

//  carousel
const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".arrow");
allImgs = carousel.querySelectorAll("img");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;
let classIndex = 0;
const updateGallery = (direction) => {
  allImgs.forEach((el) => {
    el.classList.remove("carousel-item-1");
    el.classList.remove("carousel-item-2");
    el.classList.remove("carousel-item-3");
    el.classList.remove("carousel-item-4");
  });

  if (direction === "left") {
    classIndex--;
  } else {
    classIndex++;
  }

  if (classIndex === 4) {
    classIndex = 0;
  } else if (classIndex === -1) {
    classIndex = 3;
  }

  Array.from(allImgs).forEach((el, i) => {
    const classes = [
      "carousel-item-1",
      "carousel-item-2",
      "carousel-item-3",
      "carousel-item-4",
    ];
    el.classList.add(classes[(classIndex + i) % 4]);
  });
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
    updateGallery(icon.id);
  });
});

const autoSlide = () => {
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;

  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }

  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
