import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getAgencies = () => {
    return axios.get('http://localhost:4000/get-all-agencies').then(res => res.data);
};

const addUser = (formData:any) => {
    console.log("HUUUUU");
    return axios.post('http://localhost:4000/signup', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const Signup = () => {
    const navigate = useNavigate()
    const { data: agencies } = useQuery({
        queryKey: ['fetchAgencies'],
        queryFn: getAgencies,
    });

    const signupMutation = useMutation({
        mutationFn: addUser,
    });

    const validationSchema = Yup.object({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone number is required').matches(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Only numbers are allowed'),
        user_type: Yup.string().required('User type is required'),
        gender: Yup.string().required("Gender is required"),
        profile_photo: Yup.mixed().required("Photo is necessary"),
        resume: Yup.mixed().when('user_type', (user_type:any, schema) => {
            if(user_type == 2)
              return schema.required("Resume is required")
            return schema}
        ),
        agency: Yup.string().when('user_type', (user_type:any, schema) => {
            if(user_type == 2)
              return schema.required("Agency is required")
            return schema}
        ),
        
    });

    const handleSignup = (values:any) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));
        console.log("Data-------> ", formData)
        signupMutation.mutate(formData);
        navigate("/Login");
    }



    return (
        <Formik
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                profile_photo:null,
                gender: '',
                user_type: '',
                hobbies: [],
                resume: null,
                agency: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
        >
            {({ values, setFieldValue }) => (
                <Form className="container mt-4 p-4 bg-secondary rounded-5">
                    <h2>Sign Up</h2>
                    <div className="mb-3">
                        <Field name="firstname" type="text" placeholder="First Name" className="form-control" />
                        <ErrorMessage name="firstname" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field name="lastname" type="text" placeholder="Last Name" className="form-control" />
                        <ErrorMessage name="lastname" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field name="email" type="email" placeholder="Email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field name="phone" type="text" maxLength={10} placeholder="Phone Number" className="form-control" />
                        <ErrorMessage name="phone" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                    <input className="form-control" type="file" name="profile_photo" accept=".jpg, .png" onChange={(event: any) => {
                                setFieldValue("profile_photo", event.currentTarget.files[0]);
                            }} />
                        <ErrorMessage name="profile_photo" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <div>
                            <label className="me-3">
                                <Field name="gender" type="radio" value="1" /> Male
                            </label>
                            <label>
                                <Field name="gender" type="radio" value="2" /> Female
                            </label>
                            <label>
                                <Field name="gender" type="radio" value="3" /> Others
                            </label>
                        <ErrorMessage name="gender" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <Field as="select" name="user_type" className="form-select">
                            <option value="">Select User Type</option>
                            <option value="1">Agency</option>
                            <option value="2">Job-seeker</option>
                        </Field>
                        <ErrorMessage name="user_type" component="div" className="text-danger" />
                    </div>
                    {values.user_type === '1' && (
                        <>
                            <div className="mb-3">
                                <input
                                    name="resume"
                                    accept=".pdf, .docx"
                                    type="file"
                                    onChange={(event: any) => {
                                        setFieldValue("resume", event.currentTarget.files[0]);
                                    }}
                                    className="form-control"
                                />
                                    <ErrorMessage name="resume" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <Field as="select" name="agency" className="form-select">
                                    <option value="">Select Agency</option>
                                    {agencies?.map((agency:any) => (
                                        <option key={agency.id} value={agency.id}>
                                            {agency.firstname} {agency.lastname}
                                        </option>
                                    ))}
                                </Field>
                                    <ErrorMessage name="agency" component="div" className="text-danger" />
                            </div>
                        </>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Hobbies:</label>
                        <div>
                            <label className="me-3">
                                <Field type="checkbox" name="hobbies" 
                                value="reading"

                                onChange={(event: any) => {
                                    if (event.target.checked) {
                                        setFieldValue('hobbies', [...values.hobbies, event.target.value]);
                                    } else {
                                        setFieldValue('hobbies', values.hobbies.filter((hobby: any) => hobby !== event.target.value));
                                    }
                                }}
                                
                                 /> Reading
                            </label>
                            <label className="me-3">
                                <Field type="checkbox" name="hobbies"
                                value="writting"

                                onChange={(event: any) => {
                                    if (event.target.checked) {
                                        setFieldValue('hobbies', [...values.hobbies, event.target.value]);
                                    } else {
                                        setFieldValue('hobbies', values.hobbies.filter((hobby: any) => hobby !== event.target.value));
                                    }
                                }}
                                 /> Writing
                            </label>
                            <label className="me-3">
                                <Field type="checkbox" name="hobbies" value="fitness"
                                onChange={(event: any) => {
                                    if (event.target.checked) {
                                        setFieldValue('hobbies', [...values.hobbies, event.target.value]);
                                    } else {
                                        setFieldValue('hobbies', values.hobbies.filter((hobby: any) => hobby !== event.target.value));
                                    }
                                }}
                                /> Fitness
                            </label>
                            <label className="me-3">
                                <Field type="checkbox" name="hobbies" value="shoping"
                                onChange={(event: any) => {
                                    if (event.target.checked) {
                                        setFieldValue('hobbies', [...values.hobbies, event.target.value]);
                                    } else {
                                        setFieldValue('hobbies', values.hobbies.filter((hobby: any) => hobby !== event.target.value));
                                    }
                                }}

                                /> Shopping
                            </label>
                            <label className="me-3">
                                <Field type="checkbox" name="hobbies" value="guitar"
                                onChange={(event: any) => {
                                    if (event.target.checked) {
                                        console.log(values.hobbies)
                                        setFieldValue('hobbies', [...values.hobbies, event.target.value]);
                                    } else {
                                        console.log(values.hobbies)
                                        setFieldValue('hobbies', values.hobbies.filter((hobby: any) => hobby !== event.target.value));
                                    }
                                }}
                                /> Guitar
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </Form>
            )}
        </Formik>
    );
};

export default Signup;