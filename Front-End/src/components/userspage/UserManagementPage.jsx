// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Container, Card } from "react-bootstrap";
import NavigationBar from "../NavigationBar/NavigationBar";
import UserService from '../service/UserService';

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      //   console.log(response);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };



  return (
    <>
      <NavigationBar />
      <Container>
        <Card className="p-4 my-4 shadow-sm border-dark" style={{ borderRadius: "15px" }}>
          <Card.Body>
            <Card.Title className="text-center mb-5" style={{ color: "#4caf50", fontSize: "2rem" }}>
             Gerenciamento de Usuários
            </Card.Title>
            
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Cargo</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default UserManagementPage;
