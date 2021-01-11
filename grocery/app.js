// ****** SELECT ITEMS **********
 const alert = document.querySelector('.alert');
 const form = document.querySelector('.grocery-form');
 const grocery = document.getElementById('grocery');
 const submitBtn = document.querySelector('.submit-btn');
 const container = document.querySelector('.grocery-container');
 const list = document.querySelector('.grocery-list');
 const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener('click', clearItems);

// load items
window.addEventListener('DOMContentLoaded', setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;

    const id = new Date().getTime().toString(); // use this to built a simple id. Do not use in a serious project
    if(value && !editFlag) {
       createListItem(id, value);
     
        // display alert
        displayAlert('Item added to the list', 'success');
        //show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();

    }
    else if(value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", 'success');
        //edit local storage
        editLocalStorage(editID, value);
        setBackToDefault()        
    }
    else{
        displayAlert('Please enter value', 'danger');
    }

}
// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    // remove alert
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}
// clear items
function clearItems() {
    const items = document.querySelectorAll("grocery-item");

    if (items.length > 0 ) {
        items.forEach(function (item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert('List empty successfully!', 'success');
    setBackToDefault();
    localStorage.removeItem('list');
}

// delete function
function deleteItem(e){

    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert('Item removed successfully!', 'success');
    setBackToDefault();
    // remove from local storage
    romoveFromLocalStorage(id);

}

// edit function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement. previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}
    
// set back to default
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = {id, value };
    let items = getLocalStorage()

    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items));
    
}
function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}
 // localStorage API
    // setItem
    // getItem
    // remove item
    // save as strings
    // localStorage.setItem("oranges", JSON.stringify(["item1", "item2"]));
    // const oranges = JSON.parse(localStorage.getItem("oranges"));
    // console.log(oranges);
    // localStorage.removeItem("oranges");

// ****** SETUP ITEMS **********
function setupItems() {
    let items = getLocalStorage();
    if(items.length > 0 ) {
        items.forEach(function(item) {
            createListItem(item.id, item.value);
        })
        container.classList.add("show-container");
    }
}

function createListItem(id, value) {
    const element = document.createElement("article");
    // add class
    element.classList.add("grocery-item");
    //add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
             <div class="btn-container">
                 <button type="button" class="edit-btn">
                     <i class="fas fa-edit"></i>
                 </button>
                 <button type="button" class="delete-btn">
                     <i class="fas fa-trash"></i>
                 </button>
             </div>`;

// the functionality have to be here because the btns are not available in the html!!!!!!
 const deleteBtn = element.querySelector(".delete-btn");
 const editBtn = element.querySelector(".edit-btn");
 deleteBtn.addEventListener('click', deleteItem);
 editBtn.addEventListener('click', editItem);

     // append child
     list.appendChild(element);    
}
