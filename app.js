// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const input = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// add item
form.addEventListener("submit",additem);
//clear all
clearBtn.addEventListener("click",clearall)

// ****** FUNCTIONS **********
function additem (event)
{
    event.preventDefault();
    var inputval=input.value;
    var id = new Date().getTime().toString();           //always getting unique id by this method
    // console.log(inputval);
    if(inputval && editFlag==false)
    {
        //creating article element dynamically
        var element = document.createElement("article");
        element.classList.add("grocery-item");
        // adding unique data id
        element.setAttribute("data-id",id);
        // console.log(element);
        element.innerHTML= `<p class="title">${inputval}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      var deletebtn= element.querySelector(".delete-btn");
      var editbtn= element.querySelector(".edit-btn");
        deletebtn.addEventListener("click", deleteItem);
        editbtn.addEventListener("click",editItem);
        //appending the code of element in list 
        list.appendChild(element);
        //showing container
        container.classList.add("show-container");
        // showing alert
        showalert("alert-success","item added to the list");
        // storing value
        addtolocalstorage(id,inputval);
        // set back to default
        setbacktodefault();
        // clearing input value
    }
    else if(inputval && editFlag==true)             // this part will execute if user clicked on edit btn and editItem already invoked
    {       
        editElement.innerHTML=inputval;             // so editElement is pointing to editElement=element.querySelector("p"); in func
        showalert("alert-danger","Value Editted")
        setbacktodefault();
    }
    else 
    {
        // alert.innerHTML=`Item Added to the List`;
        showalert("alert-danger","Please Enter value")
    }
}
function showalert(addclass,text)
{
    // console.log(addclass);
    // console.log(text);
    alert.classList.add(addclass);
        alert.innerHTML=text;
        window.setTimeout(function()
        {
            alert.innerHTML=``;
            alert.classList.remove(addclass);
        },1000);
}
function setbacktodefault()
{
    input.value="";
    editFlag=false;
    editID="";
    submitBtn.textContent="submit";
}

function deleteItem(btn)
{
    var element=btn.currentTarget.parentElement.parentElement;
    var id=element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0)
    {
        container.classList.remove("show-container");
    }
    showalert("alert-danger","Item removed")
    setbacktodefault();
}

function editItem(btn)
{
    var element=btn.currentTarget.parentElement.parentElement;
    editFlag = true;
    editID = element.dataset.id;
    editElement=element.querySelector("p");
    var value= editElement.innerHTML;
    input.value=value;                                  // copy value to be edit in inputbar
    submitBtn.textContent="Edit";                       // changing text content of submitbtn
}

function clearall()
{
    // list.innerHTML="";               // it is also clearing all item from list
    var items=document.querySelectorAll(".grocery-item");
    items.forEach(function(item)
    {
        list.removeChild(item);
    })
    container.classList.remove("show-container");
    showalert("alert-danger","Empty list")
    setbacktodefault();

}
// ****** LOCAL STORAGE **********
function addtolocalstorage(id,val)
{

}
function removefromlocalstorage(id)
{

}

// ****** SETUP ITEMS **********
