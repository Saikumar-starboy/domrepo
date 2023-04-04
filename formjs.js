function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailid.value;

    const obj = {
        name,
        email
    }
    localStorage.setItem(obj.email,JSON.stringify(obj))
    showUserOnScreen(obj)
}
function showUserOnScreen(obj){
    const parentElem = document.getElementById('users')
    const childElem = document.createElement('li')
    childElem.textContent = obj.name + ' - ' + obj.email 

    const deleteButton = document.createElement('input')
    deleteButton.type = 'button'
    deleteButton.value = 'Delete'
    deleteButton.onclick = () => {
        localStorage.removeItem(obj.email)
        parentElem.removeChild(childElem)
    }
    childElem.appendChild(deleteButton)
    parentElem.appendChild(childElem)

}
