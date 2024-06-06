import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';
import NavigationBar from "../NavigationBar/NavigationBar";
import { Container, Card, Button } from 'react-bootstrap';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };
        return (
            <>
            <NavigationBar />
            <Container className="profile-page-container mt-5">
              <Card className="shadow-sm border-dark" style={{ borderRadius: '15px' }}>
                <Card.Body>
                  <Card.Title className="text-center mb-4" style={{ color: '#4caf50', fontSize: '2rem' }}>
                    Profile Information
                  </Card.Title>
                  <Card.Text><strong>Name:</strong> {profileInfo.name}</Card.Text>
                  <Card.Text><strong>Email:</strong> {profileInfo.email}</Card.Text>
                  <Card.Text><strong>City:</strong> {profileInfo.city}</Card.Text>
                  
                    <div className="text-center mt-4">
                      <Button variant="primary">
                        <Link to={`/`} style={{ color: '#fff', textDecoration: 'none' }}>
                          LogOut
                        </Link>
                      </Button>
                      
                    </div>
                    <div className="text-center mt-4">
                      <Button variant="success">
                        <Link to={`/UserManagement`} style={{ color: '#fff', textDecoration: 'none' }}>
                          Usuários
                        </Link>
                      </Button>
                      
                    </div>
            
                </Card.Body>
              </Card>
            </Container>
            </>
          );
}

export default ProfilePage;
