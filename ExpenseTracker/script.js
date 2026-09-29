// first of all lets make a card

const STORAGE_KEY = "expense-tracker-entries" 


function loadExpenses(){
    const raw = localStorage.getItem(STORAGE_KEY);


    const parsed = raw ? JSON.parse(raw):[];
    return Array.isArray(parsed)? parsed:[];
}


function saveExpenses(list){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

let expenses = loadExpenses();
let editingId= null;


        function escapeHTML(str) {                                // [SAME]
            const div = document.createElement("div");
            div.textContent = str;
            return div.innerHTML;
        }

function renderExpenses(){

    const list = document.getElementById("expense-list");
    const emptyMsg = document.getElementById("empty-msg");

    list.innerHTML= "";
//   reduce: add up every amount into ONE number

// console.log("hora;")
const total = expenses.reduce((sum,item) => sum + item.amount,0);
// console.log(total)

document.getElementById("total-value").textContent= total.toFixed(2);

if(expenses.length===0){
    emptyMsg.style.display = "block";
    return;
}
 emptyMsg.style.display = "none";



//   sorting ...

const sorted= [...expenses].sort((a,b)=> b.createAt - a.createAt);

sorted.forEach((item)=>{

    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`
    <span class="badge"> ${escapeHTML(item.category)}</span>
    <h3>${escapeHTML(item.title)}</h3>
    <div class="amount">${item.amount.toFixed(2)}</div>
    <button class="edit-btn" data-id="${item.id}">Edit</button>
    <button class="delete-btn" data-id="${item.id}">Delete</button>
    
    `;

    list.appendChild(card)
});



document.querySelectorAll(".edit-btn").forEach((btn)=> btn.addEventListener("click",()=> startEdit(btn.dataset.id)
 ))// btn is a new variable on eachloop round, 
//  querySelectorAll finds all matching elements at once; NodeLists support forEach in modern browsers.
// forEach attaches a separate listener to each button, not one shared listener.
// btn.dataset.id reads that specific button's data-id attribute.
// Because btn is a new variable on each loop round, every listener correctly remembers its own button's ID.


document.querySelectorAll(".delete-btn").forEach((btn)=> btn.addEventListener("click",()=> deleteExpense(btn.dataset.id)))



}



const form = document.getElementById("expense-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn=document.getElementById("cancel-edit");
// console.log(form)
// console.log(formTitle);
// console.log(submitBtn)


form.addEventListener("submit", function(e){
    e.preventDefault();

    const titleValue = document.getElementById("title");
    console.log(titleValue)
    console.log("hey")

    // if (titleValue.length === 0) {
    //     alert("Title is required");
    //     return;
    // }

        const newExpense={

        id: editingId || crypto.randomUUID(),
        title:document.getElementById("title").value.trim(),
        amount:Number(document.getElementById("amount").value),
        category:document.getElementById("category").value,
        createdAt: editingId ? expenses.find((x) => x.id === editingId).createdAt : Date.now(),
    };


    if(editingId){
        expenses = expenses.map((x)=>(x.id === editingId ? newExpense:x))
    }else{
        expenses.push(newExpense);
    }

  

    saveExpenses(expenses)
    renderExpenses()
    resetForm();
})


function startEdit(id){
    const item = expenses.find((x) =>x.id === id);
    if(!item) return;

     editingId= id;
     document.getElementById("title").value= item.title;

     document.getElementById("amount").value= item.amount;

     document.getElementById("category").value = item.category;

     formTitle.textContent = "Editing:" + item.title;
     submitBtn.textContent= "Update expense";

     cancelBtn.style.display= "inline-block";

     window.scrollTo({top:0, behavior:"smooth"});
}


function deleteExpense(id){
    if(!confirm("Delete this expense ?")) return ;
    expenses = expenses.filter((x) => x.id !==id);
    saveExpenses(expenses);
    renderExpenses()
}



function resetForm(){
    form.reset();
    editingId = null;
    formTitle.textContent="Add an expense";
    submitBtn.textContent="Save expense";
    cancelBtn.style.display="none";
}

cancelBtn.addEventListener("click", resetForm);
renderExpenses();