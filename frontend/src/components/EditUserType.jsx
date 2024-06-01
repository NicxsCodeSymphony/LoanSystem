import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditUserType() {
    const [name, setName] = useState("");
    const { id } = useParams();

    useEffect(() => {
        // Fetch user type data by ID and set the name
        axios.get(`http://localhost:5291/UserTypeControllerAPI/UserTypeAPI/${id}`)
            .then(response => {
                const userType = response.data;
                setName(userType.name);
            })
            .catch(error => {
                console.error('Error occurred while fetching user type:', error);
            });
    }, [id]); // Fetch data whenever ID changes

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`http://localhost:5291/UserTypeControllerAPI/EditUserTypeAPI/${id}`, { Name: name })
            .then(response => {
                console.log('Data successfully sent:', response.data);
                window.location.href = "/userType"; // Redirect to homepage or any other route
            })
            .catch(error => {
                console.error('Error occurred while sending data:', error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} value="EditUserTypeAPI">
                <h1>Edit User Type</h1>
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                <button className="border" type="submit">Save</button>
            </form>
        </div>
    );
}
