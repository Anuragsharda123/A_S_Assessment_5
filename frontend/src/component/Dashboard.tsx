import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
        
    const token = localStorage.getItem('token');
    console.log("token--------->", token);

    const getUser = async () => {
        if (token === null) {
            navigate("/Login");
        }
        return await axios.get("http://localhost:4000/get-user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    const { data: agency, isLoading, isError } = useQuery({
        queryKey: ['agency'],
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

    if(token===null){
        navigate("/Login");
    }


    console.log("Data:", agency?.data);
    const userData = agency?.data;
    const usergend = userData.user.gender;
    const usergender = usergend === 1 ? "Male" : "Female";

    return (
        <>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                            localStorage.clear();
                            navigate("/Login");
                        }}
                        >
                        Logout
                    </button>
                </div>
            </div>
        <div className="container mt-5 rounded shadow">

            <br /><br />

            <div className="row mb-4 p-5">
                <div className="col-md-4">
                    <img
                        src={`http://localhost:4000/${userData.user.profile_photo}`}
                        alt="User Profile"
                        className="img-fluid rounded-circle mb-3"
                    />
                </div>
                <div className="col-md-8">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{userData.user.firstname} {userData.user.lastname}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{userData.user.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{userData.user.phone}</td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>{usergender}</td>
                            </tr>
                            <tr>
                                <th>Hobbies</th>
                                <td>
                                    {userData.user.Hobbies.map((hobby: any) => (
                                        <span key={hobby.id} className="badge bg-secondary me-1">
                                            {hobby.hobby}
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {userData.jobseekers.map((jobseeker:any) => (
            <>
            <div key={jobseeker.id} className="accordion shadow-lg rounded p-5" id="accordionExample">
                <h2>Job Seekers</h2>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed d-flex" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${jobseeker.id}`} aria-expanded="false" aria-controls={`collapse${jobseeker.id}`}>
                        
                            <div> {jobseeker.firstname} {jobseeker.lastname} </div>
                            
                        
                    </button>
                    </h2>
                    <div id={`collapse${jobseeker.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={`http://localhost:4000/${jobseeker.profile_photo}`}
                                    alt="Agency Profile"
                                    className="img-fluid rounded-circle mb-3"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="mb-3">
                                    <strong>Name:</strong> {jobseeker.firstname} {jobseeker.lastname}
                                </div>
                                <div className="mb-3">
                                    <strong>Email:</strong> {jobseeker.email}
                                </div>
                                <div className="mb-3">
                                    {(jobseeker.gender==1 && (<span><strong>Gender: </strong>Male</span>))}
                                    {(jobseeker.gender==2 && (<span><strong>Gender: </strong>FeMale</span>))}
                                </div>
                                <div className="mb-3">
                                    <strong>Phone:</strong> {jobseeker.phone}
                                </div>
                                <div className="mb-3">
                                    <strong>Resume:</strong> <a href={`http://localhost:4000/${jobseeker.resume}`} download target='_blank'> <b> Download Resume </b> </a>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            </>
        ))}
    </>
    );
}

export default Dashboard;
