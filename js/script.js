const dropDownBTN = document.querySelectorAll(".dropDownBTN");
const dropDownText = document.querySelectorAll(".dropDownText");
const dropDownMenu = document.querySelectorAll(".dropDownMenu");

console.log(dropDownText);

class UI {
    static dropDownMenu(id) {
        dropDownText[id].classList.toggle("dropDownHiden");
        dropDownMenu[id].classList.toggle("dropDownMenuActive");
        dropDownBTN[id].classList.toggle("dropDownBTNActive");
    }
}

dropDownBTN.forEach((button) => {
    button.addEventListener("click", () => {
        let id = Array.from(dropDownBTN).indexOf(button);
        UI.dropDownMenu(id);
    })
});
