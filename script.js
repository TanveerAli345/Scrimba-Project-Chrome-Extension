const saveBtn = document.getElementById("save-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("leads-list")
const leadsFromLocal = JSON.parse(localStorage.getItem("leadsList"))
let leadsArray = []

if (leadsFromLocal) {
    leadsArray = leadsFromLocal
    render(leadsArray)
}

saveBtn.addEventListener("click", () => {
    leadsArray.push(inputEl.value)
    render(leadsArray)
    inputEl.value = ""
    localStorage.setItem("leadsList", JSON.stringify(leadsArray))
})

saveTabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        leadsArray.push(tabs[0].url)
        localStorage.setItem("leadsList", JSON.stringify(leadsArray))
        render(leadsArray)
    })
})

function render(myArr) {
    let liItems = ""
    for(let i=0; i<myArr.length; i++) {
        liItems += `<li><a href="${myArr[i]}" target="_blank">${myArr[i]}</a></li>`
    }
    ulEl.innerHTML = liItems
}

deleteBtn.addEventListener("dblclick", () => {
    leadsArray = []
    localStorage.clear()
    render(leadsArray)
})