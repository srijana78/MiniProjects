//  creating a lable{box name }  to read/write later in localstorage



const STORAGE_KEY = "devlog-entries"

function loadEntries(){
    try{
        const data = localStorage.getItem(STORAGE_KEY);
        const parsed =  data ? JSON.parse(data):[];

        return Array.isArray(parsed) ? parsed:[];
    }catch (err){
        console.error(" Cannot parsed the data:", err);
    }
}


function saveEntries(entries){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
};


let entries = loadEntries();
let  editingid = null;

function escapeHtml(str){
    const div = document.createElement("div")
    div.textContent= str;
    return div.innerHTML;
}

// ****************** Events are here *****************



function renderEntries(){

    const list = document.getElementById("entres-list");
    const emptyMsg = document.getElementById("empty-msg");

    if(entries.length === 0){
        emptyMsg.style.display=" inline-block"
    } 
    emptyMsg.style.display="none";




    const sorted = [...entries].sort((a,b)=> b.createdAt - a.createdAt)

    sorted.forEach((entry)=> {

        const card = document.createElement("card");
        card.className="entry-card";
        card.innerHTML=`
         <h3>${entry.title}</h3>
        <div class="entry-meta">
            <span class="badge status-${entry-status}">${entry.status}</span>${techTags}
        </div>

       ${entry.pseudocode ?` <details><summary></summary> <pre>${escapeHtml(entry.pseudocode)}</pre></details> `:""}
        ${entry.code ?` <details><summary></summary> <pre>${escapeHtml(entry.code)}</pre> </details>`:""}
       ${entry.readme ?` <details><summary></summary> <pre>${escapeHtml(entry.readme)}</pre> </details>`:""}
        ${entry.notes ?` <details><summary></summary> <pre>${escapeHtml(entry.notes)}</pre> </details>`:""}
    

        <div class="entry-actions?>
        <button class="edit-btn" data-id="${entry.id}"Edit</button>
        <button class="delete-btn" data-id="${entry.id}"Deleter</button>
</div> `
list.appendChild(card);

    })

    list.addEventListener("click", (e)=>{

    })


}

function reserForm(){

}

function deleteEntries(){

}
function editEntries(){

}

renderEntries();