import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';



const Profile: React.FC = () => {
    const navigate = useNavigate();
    const getUser = async () => {
        const token = localStorage.getItem('token');
        if(token===null){
            navigate("/Login")
        }
        console.log("token--------->", token);
        return await axios.get("http://localhost:4000/get-user", {
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['getUser'],
        queryFn: getUser,
    });

    if (isError) {
        return (
            <div className="container mt-5">
                <h1 className="text-danger">Error in fetching data...</h1>
            </div>
        );
    }
    if (isLoading) {
        return (
            <div className="container mt-5">
                <h2>Loading...</h2>
            </div>
        );
    }

    console.log("Data-------->", user?.data);
    const userData = user?.data;
    
    if(userData.user.user_type == 1){
        navigate("/Dashboard")
    }
    const agencygend = userData.agency.gender;
    const usergend = userData.user.gender;
    const usergender = usergend === 1 ? "Male" : "Female";
    const agencygender = agencygend === 1 ? "Male" : "Female";

    return (
    <>
        <div>
            <button className='btn btn-outline-dark' onClick={()=>{
                localStorage.clear();
                navigate("/Login");
            }} type="button">Logout</button>
        </div>
        <div className="container mt-5 p-4 bg-light rounded shadow">
            <h2 className="text-center mb-4">Profile</h2>
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`http://localhost:4000/${userData.user.profile_photo}`}
                        alt="Profile"
                        className="img-fluid rounded-circle mb-3"
                    />
                </div>
                <div className="col-md-8">
                    <div className="mb-3">
                        <strong>Name:</strong> {userData.user.firstname} {userData.user.lastname}
                    </div>
                    <div className="mb-3">
                        <strong>Email:</strong> {userData.user.email}
                    </div>
                    <div className="mb-3">
                        <strong>Gender:</strong> {usergender}
                    </div>
                    <div className="mb-3">
                        <strong>Phone:</strong> {userData.user.phone}
                    </div>
                    <div className="mb-3">
                        <strong>Hobbies:</strong> {userData.user.Hobbies.map((hobby: any) => (
                            <span key={hobby.id} className="badge bg-secondary me-1">{hobby.hobby}</span>
                        ))}
                    </div>
                    <div className="mb-3">
                        <strong>Resume:</strong>
                        <a href={`http://localhost:4000/${userData.user.resume}`} download target='_blank'>
                            <button className="btn btn-outline-primary ms-2">Download Resume</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <br />
            <div className="accordion shadow-lg rounded" id="accordionExample">
                
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Agency Details
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={`http://localhost:4000/${userData.agency.profile_photo}`}
                                    alt="Agency Profile"
                                    className="img-fluid rounded-circle mb-3"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="mb-3">
                                    <strong>Agency Name:</strong> {userData.agency.firstname} {userData.agency.lastname}
                                </div>
                                <div className="mb-3">
                                    <strong>Email:</strong> {userData.agency.email}
                                </div>
                                <div className="mb-3">
                                    <strong>Gender:</strong> {agencygender}
                                </div>
                                <div className="mb-3">
                                    <strong>Phone:</strong> {userData.agency.phone}
                                </div>
                            </div>
                        </div>
                        </div>
                <div>
                    <button className='btn btn-outline-primary px-5 mb-4' onClick={()=>{
                    navigate(`/Chat/${userData.user.id}/${userData.agency.id}`)
                    }}>Chat</button>
                </div>
                    </div>
                </div>
            </div>
    </>
        
    );
}

export default Profile;