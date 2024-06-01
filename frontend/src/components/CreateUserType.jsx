import { useState } from "react"
import axios from "axios"

export default function CreateUserType(){

    const [name, setName] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        console.log(name)
        axios.post('http://localhost:5291/UserTypeControllerAPI/CreateUserTypeAPI', { Name: name })
    .then(response => {
        console.log('Data successfully sent:', response.data);
        window.location.href = "/userType"
    })
    .catch(error => {
        console.error('Error occurred while sending data:', error);
    });
    }

    return(
        <div>
            <form onSubmit={handleSubmit} value="CreateUserTypeAPI">
            <h1>Create User Type</h1>
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
            <button className="border" type="submit">Save</button>
            </form>
        </div>
    )
}