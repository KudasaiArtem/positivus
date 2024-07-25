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

// on load
document.addEventListener("DOMContentLoaded", () => {
    SlidesInit.init();
    UI.centerSlide();
    UI.inactiveArrows(false);
    UI.markers();
})
