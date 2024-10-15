import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

var user:any;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const loginUser = async(loginData: { email: string; password: string; user_type: string }) =>{
    console.log("login Data---------", loginData)
    const response = await axios.post('http://localhost:4000/login', loginData);
    localStorage.setItem('token', response.data.token);
    user = response.data.user;
    if(user.is_active == 0){
      console.log("Not Active-----------------");
      navigate("/Update")
    }
    else{
        console.log("Active-----------------");
        if(user.user_type == 1)
        {
          navigate('/Dashboard')
        }
        else{
          navigate('/profile')
        }
    }
    console.log(user)
    return response;
  }


  const loginMutation = useMutation({
    mutationFn: loginUser
  });

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    user_type: Yup.string().required('User type is required')
  });

  const handleLogin = (values:any) => {
    loginMutation.mutate(values);
  } 

  return (
    <div className="container mt-5  p-5 rounded-4 bg-dark">
      <div className="login-form card bg-secondary p-4">
        <h2 className="text-center">Login</h2>
        <Formik
          initialValues={{ email: '', password: '', user_type: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form>
              <div className="mb-3">
                <Field as="select" name="user_type" className="form-select">
                  <option value="" defaultChecked disabled>Log-in as </option>
                  <option value="1">Agency</option>
                  <option value="2">Job-seeker</option>
                </Field>
              </div>
              <div className="mb-3 ">
                <Field name="email" type="email" placeholder="Email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <Field name="password" type="password" placeholder="Password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
              {loginMutation.isError && (
                <div className="text-danger mt-3">Error logging in. Please try again.</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;