/* 
    Item to add:
<li class="item">
    this is an item (10%)
    <input type="text" placeholder="grade (%)" id="itemGrade">
    <button class="deleteItem"> delete</button>
</li>
*/
const li_class =
    "item list-group-item d-flex flex-wrap align-items-center row-gap-2";
function addItem() {
    const itemName = capitalizeFirst(itemNameInput.value.trim());
    const itemWeight = itemWeightInput.value.trim();
    if (itemName == "" || itemWeight == "" || itemWeight == "%") return;
    if (itemWeight.at(-1) == "%") itemWeight = itemWeight.slice(0, -1);
    itemNameInput.value = "";
    itemWeightInput.value = "";

    // create new Item
    const newItem = document.createElement("li");
    newItem.textContent = itemName + " ";
    newItem.setAttribute("class", li_class);

    const newItemWeight = document.createElement("span");
    newItemWeight.textContent = `(${itemWeight}%)`;
    newItemWeight.setAttribute("class", "itemWeight mx-2");
    newItem.appendChild(newItemWeight);

    const newItemGrade = document.createElement("input");
    newItemGrade.setAttribute("type", "text");
    newItemGrade.setAttribute("placeholder", "grade (%)");
    newItemGrade.setAttribute("class", "itemGrade grade");
    newItem.appendChild(newItemGrade);

    const padding = document.createElement("span");
    padding.style.margin = "auto";
    newItem.appendChild(padding);

    const newFindMinButton = document.createElement("button");
    newFindMinButton.textContent = "find min to pass";
    newFindMinButton.setAttribute(
        "class",
        "findMinGrade btn btn-outline-secondary btn-sm m-2 float-end"
    );
    newFindMinButton.addEventListener("click", () =>
        findMinimumGradeNeeded(newItemGrade)
    );
    newItem.appendChild(newFindMinButton);

    const newDeleteButton = document.createElement("button");
    newDeleteButton.textContent = "delete";
    newDeleteButton.setAttribute(
        "class",
        "deleteItem btn btn-outline-secondary btn-sm m-2 float-end"
    );
    // newDeleteButton.setAttribute("style", "margin-left: 10px;");
    newDeleteButton.addEventListener("click", () => {
        newItem.remove();
        itemNameInput.focus();
    });
    newItem.appendChild(newDeleteButton);

    itemList.appendChild(newItem);
    itemNameInput.focus();
}

function findMinimumGradeNeeded(inputBox) {
    inputBox.value = "0";
    const minPassingGradeValue = percentStringToFloat(minPassingGrade.value);
    while (percentStringToFloat(inputBox.value) < 100) {
        updateTotalGrade();
        // alert(percentStringToFloat(totalGradeValue.textContent));
        if (
            percentStringToFloat(totalGradeValue.textContent) >=
            percentStringToFloat(minPassingGradeValue)
        )
            return;
        inputBox.value = (
            percentStringToFloat(inputBox.value) + 0.5
        ).toString();
    }
    updateTotalGrade();
}

function percentStringToFloat(s) {
    // if (s.at(-1) == '%') {
    //     s = s.slice(0, -1);
    // }
    return parseFloat(s);
}

function updateTotalGrade() {
    let total = 0;
    totalGradeValue.value = "";
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
        // console.log(item.querySelector('.itemWeight'));
        console.log(item);
        let weight =
            parseFloat(
                item.querySelector(".itemWeight").textContent.slice(1, -2)
            ) / 100.0;
        let gradeText = item.querySelector(".itemGrade").value;
        if (gradeText.at(-1) == "%") gradeText = gradeText.slice(0, -1);
        let grade = parseFloat(gradeText) / 100.0;
        console.log(grade);
        total += weight * grade;
    });
    totalGradeValue.textContent = total * 100 + "%";
}

function capitalizeFirst(string) {
    if (!string) return "";
    if (string.length > 1) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return string.charAt(0).toUpperCase();
    }
}

const itemNameInput = document.querySelector("#newItemName");
const itemWeightInput = document.querySelector("#newItemWeight");
const itemList = document.querySelector("#itemList");
const addItemButton = document.querySelector("#addItemButton");
const totalGradeValue = document.querySelector("#totalGradeValue");
const calculateGradeButton = document.querySelector("#calculateTotalGrade");
const minPassingGrade = document.querySelector("#minPassingGradeValue");
addItemButton.addEventListener("click", addItem);
document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") addItem();
});
calculateGradeButton.addEventListener("click", updateTotalGrade);
