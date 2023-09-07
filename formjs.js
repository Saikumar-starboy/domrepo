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

    const deleteButton = document.createElement('input')
    deleteButton.type = 'button'
    deleteButton.value = 'Delete'
    deleteButton.style.display = 'inline-block';
    deleteButton.onclick = () => {
        deleteUser(obj._id)
        parentElem.removeChild(childElem)
    }

    const userInfoText = document.createElement('div');
    userInfoText.textContent = obj.name + ' - ' + obj.email;

    const editNameInput = document.createElement('input');
    editNameInput.type = 'text';
    editNameInput.value = obj.name;
    editNameInput.style.display = 'none'; 

    const editEmailInput = document.createElement('input');
    editEmailInput.type = 'text';
    editEmailInput.value = obj.email;
    editEmailInput.style.display = 'none'; 

    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        userInfoText.style.display = 'none'; 
        editNameInput.style.display = 'inline-block'; 
        editEmailInput.style.display = 'inline-block'; 
        editButton.style.display = 'none'; 
        saveButton.style.display = 'inline-block'; 
    });

    
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.display = 'none'; 
    saveButton.addEventListener('click', () => {
        const updatedData = {
            name: editNameInput.value,
            email: editEmailInput.value,
        };
        editUser(obj._id, updatedData);
        userInfoText.textContent = `${updatedData.name} - ${updatedData.email}`;
        userInfoText.style.display = 'inline-block'; 
        editNameInput.style.display = 'none'; 
        editEmailInput.style.display = 'none'; 
        editButton.style.display = 'inline-block'; 
        saveButton.style.display = 'none'; 
    });

    
    childElem.appendChild(userInfoText);
    childElem.appendChild(editNameInput);
    childElem.appendChild(editEmailInput);
    childElem.appendChild(editButton);
    childElem.appendChild(saveButton);

    parentElem.appendChild(childElem);
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
function editUser(userId, updatedData) {
    axios.put(`https://crudcrud.com/api/0e4cf35427d54463a2a8dee7c5cdb3c3/logins/${userId}`,updatedData)
        .then((response) => {
            console.log('User Updated:', response.data);
        })
        .catch((error) => {
            console.error('Error Updating user:', error);
        });
}
