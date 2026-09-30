
const STORAGE_KEY = "Book-Entries"

function loadBooks(){
    try{

        const raw = localStorage.getItem(STORAGE_KEY);
        
        const parsed = raw ? JSON.parse(raw):[];
        return Array.isArray(parsed)? parsed: [];
    } catch(err){
        console.error("Could not read saved books:", err)
        return [];// fall back to an empty list instead of crashing
    }


}

function saveBooks(books){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// ------------State --------
let books = loadBooks();
let editingId= null;
// console.log("hey")
// console.log(books)
// console.log(editingId)

// -----------------Dom references -----------------
const form = document.getElementById("book-form");
const formTitle = document.getElementById("form-title");
const cancelBtn = document.getElementById("cancel-edit");
const submitBtn = document.getElementById("submit-btn");

const list = document.getElementById("book-list");
const emptyMsg = document.getElementById("empty-msg");

// -------------- Helpers -------------
function escapeHtml(str) {
            const div = document.createElement("div");
            div.textContent = str;
            return div.innerHTML;
        }

//  display/Render garney function
function addBooks(){

    list.innerHTML="";// clear before any early return


    if(books.length === 0){
        emptyMsg.style.display= "block";
        return ;
    }
    emptyMsg.style.display = "none";


    const sorted = [...books].sort((a,b)=> b.createdAt - a.createdAt);

    sorted.forEach((book) => {
        const card = document.createElement("div");
        card.className= "book-card";
        card.innerHTML= `
     
    <span class="badge">${escapeHtml(book.status)}</span>
    <h3>${escapeHtml(book.title)}</h3>
    ${book.notes ? `<p>${escapeHtml(book.notes)}</p>` : ""}
    <button class="edit-btn" data-id="${book.id}">Edit</button>
    <button class="delete-btn" data-id="${book.id}">Delete</button>

        `;

        list.appendChild(card);
    })
    
    
    document.querySelectorAll(".edit-btn").forEach((btn) => btn.addEventListener("click",()=> startEdit(btn.dataset.id)) 
);

document.querySelectorAll(".delete-btn").forEach((btn)=> btn.addEventListener("click", ()=> deleteBook(btn.dataset.id)));




// list.addEventListener("click",(e)=>{
//     const editBtn = e.target.closest(".edit-btn");
//     const deleteBtn = e.target.closest(".delete-btn");
    
//     if(editBtn) startEdit(editBtn.dataset.id)
//     if(editBtn) deleteBook(deleteBtn.dataset.id)
//     });
}


function startEdit(id){
    const book = books.find((b) => b.id=== id);
    if(!book) return;

    editingId= id;
    document.getElementById("title").value= book.title;
    document.getElementById("status").value= book.status;
    document.getElementById("notes").value= book.notes;

    formTitle.textContent=" Edit Book"
    submitBtn.textContent=" Update Book"
    cancelBtn.textContent=" inline-block"
    
}
function deleteBook(id){
    books = books.filter((b) => b.id !==id);
    saveBooks(books);
    if(editingId===id) resetForm();
    addBooks();
}

function resetForm(){
    form.reset();
    editingId=null;
    formTitle.textContent="Add Book";
    submitBtn.textContent="Save Book";
    cancelBtn.style.display="none";

}

//  ------------- Events ------------

form.addEventListener("submit", function(e){
e.preventDefault();

const title = document.getElementById("title").value.trim();
if(!title) return;

const existing= editingId ? books.find((b) => b.id === editingId):null;


 const newBook={
    id:editingId || crypto.randomUUID(),
    title: document.getElementById("title").value.trim(),
    status:document.getElementById("status").value,
    notes:document.getElementById("notes").value,
   createdAt: existing ? existing.createdAt: Date.now(),

 };

 if(editingId){
    books = books.map((b) => (b.id === editingId ? newBook :b));
 }else{
    books.push(newBook);
 }

 saveBooks(books);
 addBooks();
 resetForm();

})

cancelBtn.addEventListener("click", resetForm);

addBooks();
