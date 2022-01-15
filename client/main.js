const complimentButton = document.getElementById("complimentButton");
const fortuneButton = document.getElementById("fortuneButton");
const gifButton = document.getElementById("gifButton");
const gifSection = document.getElementById("gifSection");
const wishlistForm = document.getElementById("wishlistForm");
const priority = document.getElementById("priorityDropdown");
const itemName = document.getElementById("itemName");
const wishlistSection = document.getElementById("wishlistSection")

//Compliment Button
complimentButton.addEventListener("click", () => {
    console.log("hit");
    axios.get("http://localhost:4011/api/compliment/").then(function (response) {
        const data = response.data;
        alert(data);
        });
});

//Fortune Button
fortuneButton.addEventListener("click", () => {
    console.log("hit");
    axios.get("http://localhost:4011/api/fortune/").then((response) => {
        alert(response.data);
        });
});

//Delete wishlist item
const deleteItem = (id) => {
    axios.delete(`http://localhost:4011/api/wishlist/${id}`)
        .then((res) => {
        displayItems(res.data);
    });
};

const createItem = (item) => {
    const newItem = document.createElement("div");

    newItem.className = "newItem";

    newItem.innerHTML = `<h1 class='itemTitle'>${item.name}</h1>
        <p>priority: ${item.priority}</p>
        <button class='deleteButton' value="${item.id}">Delete</button>`;

    wishlistSection.appendChild(newItem);

    let deleteButtons = document.getElementsByClassName("deleteButton");
    
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteItem);
    };
};

//Wishlist function to display items
const displayItems = (arr) => {
    console.log(arr);
    while (wishlistSection.fistChild) {
        wishlistSection.removeChild(wishlistSection.firstChild);
    };

    for (let i = 0; i < arr.length; i++) {
        createItem(arr[i])
    }
};

//Wishlist Form
wishlistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newItem = {
        name: itemName.value,
        priority: priority.value
    };

    axios.post("http://localhost:4011/api/wishlist", newItem)
        .then((res) => {
            displayItems(res.data);
        });

    itemName.value = "";
    priority.selectedIndex = 0;
})

//Gif Button
gifButton.addEventListener("click", () => {
    console.log("hit");

    while(gifSection.firstChild) {
        gifSection.removeChild(gifSection.firstChild);
    }
    axios.get("http://localhost:4011/api/gif/").then((res) => {
        const gif = document.createElement("img");
        gif.setAttribute("src", res.data);
        gif.setAttribute("alt", "Funny Gif");
        gif.setAttribute("id", "gif");
        gifSection.appendChild(gif);
        });
});


