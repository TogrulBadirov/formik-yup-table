import { ErrorMessage, Field, Formik, Form } from "formik";
import './App.css';
import { object, string } from "yup";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const SignUpSchema = object().shape({
  firstName: string()
    .min(3, "First name must be at least 3 characters.")
    .max(15, "First name cannot exceed 15 characters.")
    .required("First name is required."),

  lastName: string()
    .min(3, "Last name must be at least 3 characters.")
    .max(15, "Last name cannot exceed 15 characters.")
    .required("Last name is required."),

    email: string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address.'
    )
    .required('Email is required.'),

  password: string()
    .min(8, "Password must be at least 8 characters.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .required("Password is required.")
});

function App() {
  const [users, setusers] = useState(localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')) : [])
  useEffect(() => {

    localStorage.setItem('users',JSON.stringify(users))

  }, [users])
  
  return (
    <>
      <Formik
       initialValues={{  firstName: '',lastName: '',email: '', password: '' }}
       validationSchema={SignUpSchema}

       onSubmit={(values, { resetForm }) => {
        setusers([...users,values])
        resetForm()
        Swal.fire({
          heightAuto: false,
          title: "Success!",
          text: "You have successfully signed up!",
          icon: "success"
        });
       }}
     >

{({ isValid, dirty }) => (
          <Form>
            <h2>Sign Up</h2>
            <label htmlFor="">First Name</label>
            <Field type='text' name='firstName' placeholder="First Name"  />
           <div className="error-message"> <ErrorMessage name="firstName"  /></div>

           <label htmlFor="">Last Name</label>
            <Field type='text' name='lastName' placeholder="Last Name" />
            <div className="error-message"><ErrorMessage name="lastName" /></div>
            
            <label htmlFor="">Email</label>
            <Field type='email' name='email' placeholder="Email" />
            <div className="error-message"><ErrorMessage name="email" /></div>
            
            <label htmlFor="">Password</label>
            <Field type='password' name='password' placeholder="Password" />
            <div className="error-message"><ErrorMessage name="password" /></div>
            

            <button type="submit" disabled={!isValid || !dirty}>
              Sign Up
            </button>
          </Form>
        )}

     </Formik>
    </>
  );
}

export default App;

