function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailid.value;

    const obj = {
        name,
        email
    }

    axios.post("https://crudcrud.com/api/49a4e6321dff4dc2b5605b64e02834ad/logins",obj)
    .then((response) => {
       // showUserOnScreen(response.data)
        console.log(response)
    })
    .catche((error)=>{
        console.log(error)
    })

   // localStorage.setItem(obj.email,JSON.stringify(obj))
   // showUserOnScreen(obj)

}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/49a4e6321dff4dc2b5605b64e02834ad/logins")
        .then((response) => {
            for(var i=0;i<response.data.length;i++){
                showUserOnScreen(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error)
        })
})
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

    const editButton = document.createElement('input')
    editButton.type = 'button'
    editButton.value = 'Edit'

    editButton.onClick = () => {
        localStorage.removeItem(obj.email)
        parentElem.removeChild(childElem)
        document.getElementById('name').value = obj.name;
        document.getElementId('email').value = obj.email;
      
    }
    
    childElem.appendChild(deleteButton)
    childElem.appendChild(editButton)
    parentElem.appendChild(childElem)
}
