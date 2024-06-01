import '../styles/Client.css';
import Heading from '../components/Heading';
import { FaMoneyBillWave } from 'react-icons/fa';
import useFetch from "../crud/Fetch";
import { useState } from 'react';

export default function Client() {

    const { data: clients, loading, error } = useFetch('http://localhost:5291/ClientControllerAPI/ClientAPI');
    const [clientData, setClientData] = useState({}); // Correct use of useState

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleRowClick = (client) => {
        console.log(client);    
        setClientData(client);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const edit =(id) =>{
        if(id === undefined){
            alert("Choose a client first")
        }else{
            window.location.href = `/clientEdit/${id}`;
        }
      
    }

    const loan = (id) => {
        if(id === undefined){
            alert("Choose a client first")
        }else{
            window.location.href = `/loan/${id}`;
        } 
    }

    const handleDeleteClick = (clientId) => {
        fetch(`http://localhost:5291/ClientControllerAPI/DeleteClientAPI/${clientId}`, {
          method: 'DELETE',
        })
        .then(response => {
          window.location.reload()
        })
        .catch(error => {
          console.error('Error occurred while deleting client:', error);
        });
      };

    return (
        <div className='client-page'>
            <Heading />
            <div className='container'>
                <div>
                   <div className='first-left'>
                    <h6>Employee Details</h6>
                    <p className='edit cursor' onClick={()=>edit(clientData.id)}>Edit</p>
                    <p className='delete cursor'onClick={() => handleDeleteClick(clientData.id)}>Delete</p>
                    <img src='https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg' alt='Employee'/>
                   </div>
                   <div className='first-right'>
                    <h4>Name: {clientData.firstName} {clientData.lastName}</h4>
                    <h4>Age: {clientData.age} Years Old</h4>
                    <h4>Address: {clientData.address}</h4>
                    <h4>Birthdate: {clientData.birthdate ? formatDate(clientData.birthdate) : ''}</h4>
                    <br />
                    <h4>Mother: {clientData.nameOfMother}</h4>
                    <h4>Father: {clientData.nameOfFather}</h4>
                    <h4>Civil Status: {clientData.civilStatus}</h4>
                    <h4>Religion: {clientData.religion}</h4>
                   </div>
                </div>
                {/* Second grid */}
                <div>
                    <div>
                        <div className='total-payable'>
                           <div className='money-icon'><FaMoneyBillWave /></div>
                           <h2 className='payable-amount'>₱500K</h2>
                           <p className='label'>Amount Payable</p>
                        </div>
                        <div className='total-paid'>
                        <div className='money-icon'><FaMoneyBillWave /></div>
                           <h2 className='payable-amount'>₱500K</h2>
                           <p className='label'>Total Amount Paid</p>
                        </div>
                    </div>
                    <div className='loan-info-container cursor'  onClick={()=>loan(clientData.id)}>
                        <p className='label'>Loan Information</p>
                        {/* <p className='details'>Details</p> */}
                        <h2>See Loan Info Here</h2>
                    </div>
                </div>
                {/* Third grid */}
                <div>
                    <div>
                        <p>Join on</p>
                        <h2>January 22, 2022 at 1:30pm</h2>
                    </div>
                    <div>
                        <p>Role</p>
                        <h2>{clientData.userTypeName}</h2>
                    </div>
                    <div>
                        <p>Status</p>
                        <h2>Active</h2>
                    </div>
                </div>
            </div>
            <div className='client-list'>
                <div className='list-heading'>
                <h1>List of Clients</h1>
                <div onClick={() => window.location.href = "createClient"}><p>Add Client</p></div>
                </div>
                <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Birthdate</th>
                            <th>Mother</th>
                            <th>Father</th>
                            <th>Civil Status</th>
                            <th>Religion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr className='cursor' key={client.id} onClick={() => handleRowClick(client)}>
                                <td>{client.firstName} {client.lastName}</td>
                                <td>{client.age}</td>
                                <td>{client.address}</td>
                                <td>{formatDate(client.birthdate)}</td>
                                <td>{client.nameOfMother}</td>
                                <td>{client.nameOfFather}</td>
                                <td>{client.civilStatus}</td>
                                <td>{client.religion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}
