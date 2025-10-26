import React, { useState, useEffect } from 'react';
import './Usertable.css'; 

const UserTable = () => {
    
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

   
    const [searchTerm, setSearchTerm] = useState('');

    
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUsers();
    }, []); 

    
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

 
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>FARMEASY</h1>
            <h2>User Data Table</h2>

          
            <input
                type="text"
                placeholder="Search by name..."
                className="search-input"  
                onChange={event => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                }}
            />

           
            {error && <p className="error-message">Error: {error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td data-label="ID">{user.id}</td>
                            <td data-label="Name">{user.name}</td>
                            <td data-label="Username">{user.username}</td>
                            <td data-label="Email">{user.email}</td>
                            <td data-label="Address">{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
                            <td data-label="Phone">{user.phone}</td>
                            <td data-label="Company">{user.company.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastUser >= filteredUsers.length}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserTable;