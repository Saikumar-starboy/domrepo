function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailid.value;

    const obj = {
        
        name,
        email
    }

    axios.post("https://crudcrud.com/api/0e4cf35427d54463a2a8dee7c5cdb3c3/logins",obj)
    .then((response) => {
        showUserOnScreen(response.data)
        console.log(response)
    })
    .catch((error)=>{
        console.log(error)
    })

   // localStorage.setItem(obj.email,JSON.stringify(obj))
   // showUserOnScreen(obj)

}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/0e4cf35427d54463a2a8dee7c5cdb3c3/logins")
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
        deleteUser(obj._id)
        parentElem.removeChild(childElem)
    }

    const editButton = document.createElement('input')
    editButton.type = 'button'
    editButton.value = 'Edit'

    editButton.onClick = () => {
        localStorage.removeItem(obj._id)
        parentElem.removeChild(childElem)
        document.getElementById('name').value = obj.name;
        document.getElementId('email').value = obj.email;
      
    }
    
    childElem.appendChild(deleteButton)
    childElem.appendChild(editButton)
    parentElem.appendChild(childElem)
}

function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/0e4cf35427d54463a2a8dee7c5cdb3c3/logins/${userId}`)
        .then((response) => {
            console.log('User deleted:', response.data);
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
}
