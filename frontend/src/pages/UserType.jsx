import React from 'react';
import useFetch from '../crud/Fetch';


function UserType() {
  const { data: clients, loading, error } = useFetch('http://localhost:5291/UserTypeControllerAPI/UserTypeAPI');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEditClick = (clientId) => {
    window.location.href = `/edit/usertype/${clientId}`;
  };

  const handleDeleteClick = (clientId) => {
    // Perform deletion logic for the specific client ID
    // For example, you can send a delete request to the backend API
    fetch(`http://localhost:5291/UserTypeControllerAPI/DeleteUserTypeAPI/${clientId}`, {
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
    <div className='h-screen bg-AdminBg text-white'>
      <div className='absolute left-80 top-10 border w-4/12 h-64 rounded-lg p-8'>
      <div className='flex justify-between'>
      <h2 className='text-2xl'>Clients</h2>
      <p onClick={() => window.location.href = "/client"}>Back</p>
      <button className='button5' onClick={() => window.location.href ="/create/userType"}>Create UserType</button>
      </div>
      <br />
      <table className='w-full mt-5'>
        <thead>
          <tr className='text-sm'>
            <th>UserType</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>
                <button className='mr-5' onClick={() => handleEditClick(client.id)}>Edit</button>
                <button onClick={() => handleDeleteClick(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default UserType;
