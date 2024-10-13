import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const UpdatePassword: React.FC = () => {
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token)
  
  if(token===null){
    navigate("/Login")
}

  
  
  const updatePass = async(passwordData: { password: string }) =>
    {
    // const token = localStorage.getItem('token');
    console.log(token)
    const response = await axios.post('http://localhost:4000/reset-password', passwordData,{
      'headers':{
        "Authorization": `Bearer ${token}`
      }
    })
    if(response.data.user.user_type == 1){
      navigate('/Dashboard');
    }
    else{
      navigate('/Profile')
    }
  
    return response;
  }
  const updatePasswordMutation = useMutation({
    mutationFn: updatePass
  });

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'New password must be at least 6 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirmation is required'),
  });

  const handleUpdate = (values:any) => {
    updatePasswordMutation.mutate({password: values.password,});
  }

      
      return (
        <div className="container mt-5 p-5 bg-dark rounded-5">
          <div className="update-password-form card p-4 bg-secondary ">
            <h2 className="text-center">Update Password</h2>
            <Formik
              initialValues={{ password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {() => (
                <Form>
                  <div className="mb-3">
                    <Field
                      name="password"
                      type="password"
                      placeholder="New Password"
                      className="form-control"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      className="form-control"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Update Password</button>
                  {updatePasswordMutation.isError && (
                    <div className="text-danger mt-3">Error updating password. Please try again.</div>
                  )}
                  {updatePasswordMutation.isSuccess && (
                    <div className="text-success mt-3">Password updated successfully!</div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      );

};

export default UpdatePassword;