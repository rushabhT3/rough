async function onsignup(event) {
    event.preventDefault();

    const name = event.target.Name.value;
    const phone = event.target.Phone.value;
    const email = event.target.Email.value;

    myObj = {
        name,
        phone,
        email
    }
    if (name && phone && email) {
        try {
            const response = await axios.post('http://localhost:8080/users/createUser', myObj);
            onScreenFunction(myObj);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await axios.get('http://localhost:8080/getUsers');
            console.log(response);
            response.data.forEach((element) => {
                onScreenFunction(element)
            });
        } catch (err) {
            console.error(err)
        }
    })

    async function onScreenFunction(myObj) {
        const ul = document.getElementById('listOnScreen');

        const li = document.createElement('li');
        li.innerHTML = JSON.stringify(myObj);

        const delBtn = document.createElement('input');
        delBtn.value = 'Delete';
        delBtn.type = 'button';
        delBtn.classList = 'btn btn-danger';
        delBtn.onclick = async () => {
            try {
                await axios.delete(`http://localhost:8080/deleteUser/${myObj.id}`)
                ul.removeChild(li);
            } catch (err) {
                console.error(err);
            }
        }

        const editBtn = document.createElement('input');
        editBtn.value = 'Edit';
        editBtn.type = 'button';
        editBtn.classList = 'btn btn-primary';
        editBtn.onclick = async () => {
            try {
                await axios.delete(`http://localhost:8080/deleteUser/${myObj.id}`)
                ul.removeChild(li);
            } catch (err) {
                console.error(err);
            }
            document.getElementById('Name').value = myObj.name;
            document.getElementById('Phone').value = myObj.phone;
            document.getElementById('Email').value = myObj.email;
        };
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        ul.appendChild(li);
    }
}