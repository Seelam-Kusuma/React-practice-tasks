import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const LoginForm = () => {
    const navigate = useNavigate();
    const initialValues = { email: '', password: '' };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too short').required('Required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Login data:', values);
        setSubmitting(false);
        setTimeout(() => {
            navigate('/home'); // Navigate to home page
        }, 500);
    

};

return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <Field type="email" name="email" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <ErrorMessage name="email" component="div" style={{ color: 'red', marginTop: '5px' }} />


                </div>

                <div style={{ marginBottom: '15px' }} >

                    <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <Field type="password" name="password" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <ErrorMessage name="password" component="div" style={{ color: 'red', marginTop: '5px' }} />
                </div>

                <button type="submit">Login</button>
            </Form>
        </Formik>
    </div>
);
};

export default LoginForm;
