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



function renderEntries(){
    
}
