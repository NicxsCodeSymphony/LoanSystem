import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useFetch from "../crud/Fetch";
import '../styles/EditClient.css'; 

export default function EditClient() {
    const { data: clientsInfo, loading, error } = useFetch('http://localhost:5291/UserTypeControllerAPI/UserTypeAPI');
    const [formData, setFormData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5291/ClientControllerAPI/GetClientById/${id}`)
            .then(response => {
                const clientsInfo = response.data;
                console.log(clientsInfo)
                setFormData(clientsInfo);
            })
            .catch(error => {
                console.error('Error occurred while fetching user type:', error);
            });
    }, [id]); // Fetch data whenever ID changes

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`http://localhost:5291/ClientControllerAPI/EditClientAPI/${id}`, formData)
            .then(response => {
                console.log('Data successfully sent:', response.data);
                window.location.href = "/client"; 
            })
            .catch(error => {
                if (error.response) {
                    console.error('Server responded with status code:', error.response.status);
                    console.error('Server response data:', error.response.data);
                } else if (error.request) {
                    console.error('No response received from server:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            });
    }

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'birthdate') {
            const age = calculateAge(value);
            setFormData(prevState => ({
                ...prevState,
                age: age
            })); 
        }
    };

    return (
        <div className="container3">
            <div className="flex3">
                <h1 className="text3">Edit Client</h1> 
                <button className="button3" onClick={() => window.location.href = "/client"}>Cancel</button>
            </div>
            <form onSubmit={handleSubmit} className="form3">
                <div className="input3">
                    <label className="label3">UserType</label> <br />
                    <select className="select3" name="userType" onChange={handleInputChange}>
                        <option value={formData.userType} className="option3">Select Client</option>
                        {clientsInfo.map(client => (
                            <option className="option3" key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input3">
                    <label className="label3">First Name</label> <br />
                    <input value={formData.firstName} className="input3" type="text" name="firstName" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Middle Name</label> <br />
                    <input value={formData.middleName} className="input3" type="text" name="middleName" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Last Name</label> <br />
                    <input value={formData.lastName} className="input3" type="text" name="lastName" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Address</label> <br />
                    <input value={formData.address} className="input3" type="text" name="address" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">ZipCode</label> <br />
                    <input value={formData.zipCode} type="number" className="input3" name="zipCode" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Birthdate</label> <br />
                    <input value={formData.birthdate} type="datetime-local" className="input3" name="birthdate" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Age</label> <br />
                    <input value={formData.age} className="input3" name="age"  readOnly onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Name Of Father</label> <br />
                    <input value={formData.nameOfFather} className="input3" type="text" name="nameOfFather" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Name Of Mother</label> <br />
                    <input value={formData.nameOfMother} className="input3" type="text" name="NameOfMother" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Civil Status</label> <br />
                    <input value={formData.civilStatus} className="input3" type="text" name="civilStatus" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Religion</label> <br />
                    <input value={formData.religion} className="input3" type="text" name="religion" onChange={handleInputChange}/>
                </div>

                <div className="input3">
                    <label className="label3">Occupation</label> <br />
                    <input value={formData.occupation} className="input3" type="text" name="occupation" onChange={handleInputChange}/>
                </div>
                
                <button type="submit" className="fixed3">Save</button>
            </form>
        </div>
    );
}
