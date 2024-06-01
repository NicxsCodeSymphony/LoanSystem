
import useFetch from "../crud/Fetch";
import { useState } from "react";
import axios from "axios";
import '../styles/AddClient.css'

export default function CreateClient(){
    const { data: clientsInfo, loading, error } = useFetch('http://localhost:5291/UserTypeControllerAPI/UserTypeAPI');
    const [formData, setFormData] = useState({
        UserType: '',
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Address: '',
        ZipCode: '',
        Birthdate: '',
        Age: '',
        NameOfFather: '',
        NameOfMother: '',
        CivilStatus: '',
        Religion: '',
        Occupation: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>
    
    const calculateAge = (birthdate) => {

        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setFormData({
            ...formData,
            Birthdate: birthdate,
            Age: age
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ['UserType', 'FirstName', 'LastName', 'Address', 'ZipCode', 'Birthdate', 'NameOfFather', 'NameOfMother', 'CivilStatus', 'Religion', 'Occupation'];
        const emptyFields = requiredFields.filter(field => !formData[field]);
    
        if (emptyFields.length > 0) {
            const errorMessage = `Please fill in the following fields: ${emptyFields.join(', ')}`;
            setErrorMessage(errorMessage);
            return; 
        }
        try {
            const response = await axios.post('http://localhost:5291/ClientControllerAPI/CreateClientAPI', formData);
            console.log(response.data);
            window.location.href = "/client"
        } catch (error) {
            console.error('Error:', error);
        }

    };
    

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'Birthdate') {
            calculateAge(value); 
        }
    };
    
    

    return(
        <div className="h-screen bg-AdminBg">
            <div className="container1">
           <div className="flex justify-between">
           <h1 className="text-3xl font-bold">Create Client</h1> 
           <button className="  rounded-lg px-4 py-2 hover:bg-ButtonBg hover:text-black" onClick={() => window.location.href = "/client"}>Cancel</button>
           </div>
           <form onSubmit={handleSubmit} className="form-wrapper1">
                <div className="form-left">
                    <div>
                        <label>UserType</label> <br />
                        <select className="input" name="UserType" onChange={handleInputChange}>
                            <option  className="bg-AdminBg" >Select Client</option>
                            {clientsInfo.map(client => (
                                <option className="bg-AdminBg" key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </select>
                        {errorMessage && !formData.UserType && <p className="text-red-500">Please enter Usertype</p>}
                    </div>

                    <div className="input-container">
                        <label>First Name</label> <br />
                        <input className="input" type="text" name="FirstName" onChange={handleInputChange}/>
                        {errorMessage && !formData.FirstName && <p className="text-red-500">Please enter First Name</p>}
                    </div>

                    <div className="input-container">
                        <label className="label">Middle Name</label> <br />
                        <input className="input" type="text" name="MiddleName" onChange={handleInputChange}/>
                        {errorMessage && !formData.MiddleName && <p className="text-red-500">Please enter Middle Name</p>}
                    </div>

                    <div className="input-container">
                        <label className="label">Last Name</label> <br />
                        <input className="input" type="text" name="LastName" onChange={handleInputChange}/>
                        {errorMessage && !formData.LastName && <p className="text-red-500">Please enter Last Name</p>}
                    </div>

                    <div className="input-container">
                        <label className="label">Address</label> <br />
                        <input className="input" type="text" name="Address" onChange={handleInputChange}/>
                        {errorMessage && !formData.Address && <p className="text-red-500">Please enter Address</p>}
                    </div>

                    
                    <div className="input-container">
                        <label className="label">ZipCode</label> <br />
                        <input typeof="number" className="input" type="text" name="ZipCode" onChange={handleInputChange}/>
                        {errorMessage && !formData.ZipCode && <p className="text-red-500">Please enter Zipcode</p>}
                    </div>

                    <div className="input-container">
                        <label className="label">Birthdate</label> <br />
                        <input type="date" className="input" name="Birthdate" onChange={handleInputChange}/>
                        {errorMessage && !formData.Birthdate && <p className="text-red-500">Please enter Birthdate</p>}
                        
                    </div>
                </div>

                <div className="form-right">
                <div className="input-container">
                        <label className="label">Age</label> <br />
                        <input className="input" name="Age" value={formData.Age}  readOnly onChange={handleInputChange}/>
                        {errorMessage && !formData.Age && <p className="text-red-500">Please enter Age</p>}

                    </div>


                    <div className="input-container">
                        <label className="label">Name Of Father</label> <br />
                        <input className="input" type="text" name="NameOfFather" onChange={handleInputChange}/>
                        {errorMessage && !formData.NameOfFather && <p className="text-red-500">Please enter Father's Name</p>}
                        
                    </div>

                    <div className="input-container">
                        <label className="label">Name Of Mother</label> <br />
                        <input className="input" type="text" name="NameOfMother" onChange={handleInputChange}/>
                        {errorMessage && !formData.NameOfMother && <p className="text-red-500">Please enter Mother's Name</p>}

                    </div>

                    <div className="input-container">
                        <label className="label">Civil Status</label> <br />
                        <input className="input" type="text" name="CivilStatus" onChange={handleInputChange}/>
                        {errorMessage && !formData.CivilStatus && <p className="text-red-500">Please enter Civil Status</p>}

                    </div>

                    <div className="input-container">
                        <label className="label">Religion</label> <br />
                        <input className="input" type="text" name="Religion" onChange={handleInputChange}/>
                        {errorMessage && !formData.Religion && <p className="text-red-500">Please enter Religion</p>}

                    </div>

                    <div className="input-container">
                        <label className="label">Occupation</label> <br />
                        <input className="input" type="text" name="Occupation" onChange={handleInputChange}/>
                        {errorMessage && !formData.Occupation && <p className="text-red-500">Please enter Occupation</p>}
                    </div>
                </div>
                <button type="submit" className="button">Save</button>
        </form>

            </div>
           
        </div>
    )
}