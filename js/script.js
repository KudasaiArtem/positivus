const dropDownBTN = document.querySelectorAll(".dropDownBTN");
const dropDownText = document.querySelectorAll(".dropDownText");
const dropDownMenu = document.querySelectorAll(".dropDownMenu");

// slider
const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".sliderWrapper");
let slides;

// slider controls
const moveLeft = document.querySelector("#moveSlideLeft");
const moveRight = document.querySelector("#moveSlideRight");
const sliderMarker = document.querySelectorAll(".sliderMarker");

//
let currentSlideID = 1;
let currentSlide;
const sliderGapString = window.getComputedStyle(sliderWrapper).getPropertyValue("gap");
const sliderGap = parseInt(sliderGapString.slice(0, -2));

let sliderWidth;
let slideWidth;

// checkBox
const checkBoxes = document.querySelectorAll(".checkBox");

// team cards
const teamCards = document.querySelectorAll(".teamCard");

// burger menu
const navBar = document.querySelector(".navBar");
const burgerBtn = document.querySelector(".burgerBtn");
const body = document.querySelector("body");
let burgerActive = false;

// touch slider
const touchZone = document.querySelector(".touchZone");
const casesBanner = document.querySelector(".casesBanner");
const caseSlide = document.querySelectorAll(".caseSlide");
let touchSlideId = 0;
let slideTouchWidth = caseSlide[0].getBoundingClientRect().width;

let startCord = 0;
let currentOffset = 0;

let touchSlidesQuantity = caseSlide.length - 1;

let endOffsetBorder = -(slideTouchWidth + 24) * touchSlidesQuantity;
console.log(endOffsetBorder);



function pageWidth() {
    let width = window.innerWidth;

    if (width < 427) {
        UI.teamCardsRemove();
        UI.scroller();
    }

    if (width <= 768) {
        touchSlider();
        console.log("touchSlider ON");
        
    }
}


class UI {
    static dropDownMenu(id) {
        dropDownText[id].classList.toggle("dropDownHiden");
        dropDownMenu[id].classList.toggle("dropDownMenuActive");
        dropDownBTN[id].classList.toggle("dropDownBTNActive");
    }

    static slider() {
        UI.inactiveArrows();
        // Ensure currentSlideID is within the valid range
        if (currentSlideID <= 1) {
            currentSlideID = 1;
            UI.inactiveArrows(false);
            // return;

        } else if (currentSlideID >= slides.length - 2) {
            currentSlideID = slides.length - 2;
            UI.inactiveArrows(true);
            // return;
        } else {
            UI.inactiveArrows();
        }

        currentSlide = slides[currentSlideID];

        UI.markers(currentSlideID - 1, false);

        let offset = -(currentSlideID * (slideWidth + sliderGap) - (sliderWidth / 2) + (slideWidth / 2));
        sliderWrapper.style.left = `${offset}px`;
        console.log(offset);
    }

    static centerSlide() {
        sliderWidth = slider.getBoundingClientRect().width;
        slideWidth = slides[0].getBoundingClientRect().width;

        let offset = -((slideWidth + sliderGap) - (sliderWidth / 2) + (slideWidth / 2));

        sliderWrapper.style.left = `${offset}px`;
    }

    static inactiveArrows(arrow) { // false -> left, true -> right
        switch (arrow) {
            case false: // left
                moveLeft.style.opacity = "0.3";
                break;
        
            case true: // right
                moveRight.style.opacity = "0.3";
                break;
            
            default:
                moveLeft.style.opacity = "1";
                moveRight.style.opacity = "1";
                break;
        }
    }

    static markers(id = currentSlideID - 1, isOnMarker = false) {
        sliderMarker.forEach((marker) => {
            marker.classList.remove("sliderMarkerActive");
        });
    
        sliderMarker[id].classList.add("sliderMarkerActive");
    
        if (isOnMarker) {
            currentSlideID = id + 1;
            console.log(currentSlideID);
            UI.slider();
        } else {
            console.log(currentSlideID);
            return;
        }
    }
    
    static checkBox(id) {
        checkBoxes.forEach((checkBox) => {
            checkBox.firstElementChild.classList.remove("checkBoxActive");
        })

        checkBoxes[id].firstElementChild.classList.toggle("checkBoxActive");
    }

    static teamCardsRemove() {
        const length = teamCards.length;

        for (let i = 0; i < 2; i++) {
            teamCards[length - 1 - i].remove();
        }
    }

    static scroller() {
        const scroller = document.querySelector(".brandPartnersScroll").cloneNode(true);
        const brandPartnersLayout = document.querySelector(".brandPartnersLayout");

        Array.from(scroller.children).forEach(child => {
            child.classList.add("brandPartnersRevers");
        });

        brandPartnersLayout.append(scroller);
    }

    static burgerMenu() {
        navBar.classList.toggle("navBarActive");
        burgerBtn.classList.toggle("burgerBtnClose");

        // фікс для iPhone
        if (burgerActive === false) {
            // window.scrollTo({
            //     top: 0,
            //     behavior: 'smooth'
            // });

            // window.addEventListener("scroll", event => {
            //     event.preventDefault();
            //     window.scrollTo({
            //         top: 0,
            //         behavior: 'smooth'
            //     });
            // });

            body.style.setProperty("overflow-y", "scroll");
            body.style.setProperty("touch-action", "none");
            body.style.setProperty("- ms - touch - action", "none");
            body.style.setProperty("position", "fixed");
            

            burgerActive = true;

        } else {
            body.style.setProperty("overflow-y", "scroll");
            body.style.setProperty("touch-action", "auto");
            body.style.setProperty("- ms - touch - action", "auto");
            body.style.setProperty("position", "static");

            burgerActive = false;
        }
    }

    static touchSlider(id) {
        let offset = -(slideTouchWidth + 24) * id;
        currentOffset = offset;
        
        casesBanner.style.setProperty("left", `${offset}px`);
    }
}

class SlidesInit {
    static copyFirstLast() {
        const allSlides = document.querySelectorAll(".slide");

        const first = allSlides[0].cloneNode(true);
        const last = allSlides[allSlides.length - 1].cloneNode(true);

        SlidesInit.pasteIn(first, last);
    }

    static pasteIn(first, last) {
        sliderWrapper.append(first);
        sliderWrapper.prepend(last);
    }


    static init() {
        SlidesInit.copyFirstLast();

        slides = document.querySelectorAll(".slide");
        currentSlide = slides[currentSlideID]
        console.log(slides);
    }
}

class TouchLogic {
    static start(x) {
        startCord = x;
    }

    static end(x) {
        let deltaX = x - startCord;
        currentOffset += deltaX;

        if (currentOffset > 0) {
            currentOffset = 0;
            touchSlideId = 0;
            return;

        } else if (currentOffset < endOffsetBorder) {
            touchSlideId = touchSlidesQuantity;
            currentOffset = endOffsetBorder;
            return;
        }

        TouchLogic.deathZone(deltaX);

        //casesBanner.style.setProperty("left", `${currentOffset}px`);
    }

    static move(cordX) {
        let deltaX = cordX - startCord;
        let newCordX = currentOffset + deltaX;

        if (newCordX > 0) {
            return;
        } else if (newCordX < endOffsetBorder) {
            //currentOffset = endOffsetBorder;
            return;
        }

        casesBanner.style.setProperty("left", `${newCordX}px`);
    }

    static deathZone(prop) {
        let deathZone = 50;

        if (prop > deathZone) {
            touchSlideId--

            UI.touchSlider(touchSlideId);
            
        } else if (prop < -deathZone) {
            touchSlideId++

            UI.touchSlider(touchSlideId);
        } else {
            UI.touchSlider(touchSlideId);
        }
    }
}


dropDownBTN.forEach((button) => {
    button.addEventListener("click", () => {
        let id = Array.from(dropDownBTN).indexOf(button);
        UI.dropDownMenu(id);
    })
});

// slider events
moveLeft.addEventListener("click", () => {
    currentSlideID -= 1;
    UI.slider();
})

moveRight.addEventListener("click", () => {
    currentSlideID += 1;
    UI.slider();
})

sliderMarker.forEach((marker) => {
    marker.addEventListener("click", () => {
        let id = Array.from(sliderMarker).indexOf(marker);
        console.log(id);
        UI.markers(id, true);
    })
})

// checkBox event
checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("click", () => {
        let id = Array.from(checkBoxes).indexOf(checkBox);
        UI.checkBox(id);
    })
})

// burger menu event
burgerBtn.addEventListener("click", () => {
    UI.burgerMenu();
})

// touch
function touchSlider() {
    touchZone.addEventListener("touchmove", (e) => {
        e.preventDefault();
        TouchLogic.move(e.touches[0].clientX);
    })
    
    touchZone.addEventListener("touchstart", (e) => {
        TouchLogic.start(e.touches[0].clientX);
    })
    
    touchZone.addEventListener("touchend", (e) => {
        TouchLogic.end(e.changedTouches[0].clientX);
        console.log(e);
    });
}

// on load
document.addEventListener("DOMContentLoaded", () => {
    SlidesInit.init();
    UI.centerSlide();
    UI.inactiveArrows(false);
    UI.markers();
    pageWidth();
})
