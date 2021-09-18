import React, { useState } from 'react'
import ApiCalls from '../../Helpers/Api/home';
import { useHistory } from 'react-router-dom';
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from 'formik';

const style = {
    marginTop: '10px',
    marginBottom: '10px'
};
 const Forgot = () => {
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const formValue = {
        email: '',
    }
    const formValidation = yup.object().shape({
        email: yup.string().email("Email must be equal to email pattern").required("Email is required")
    })
    const renderError = (message) => <p style={{ color: 'red', textAlign: 'left', marginLeft: '70px' }} >{message}</p>;
    const formData = async (values) => {
        const response = await ApiCalls.forgotPassword(values.email);
        if (response != null) {


            history.push({
                pathname: "/"+ window.location.href.split('/')[3].toString() + "/login"
            })
        }
        else {
            setErrorMessage("Please enter valid email")
        }
    }
    return (
      
            <div>
                <section className="banner-section" style={{ backgroundImage: 'none', backgroundColor: '#364150', padding: '50px' }}>
                    <div className="auto-container">
                        <Formik
                            initialValues={formValue}
                            validationSchema={formValidation}
                            onSubmit={async (values, { resetForm }) => {
                                await formData(values);
                                resetForm();
                            }}
                        >
                            <Form style={{ width: '500px', boxShadow: 'none' }}>
                                <Field
                                    name="email"
                                    type="text"
                                    className="search-banner"
                                    placeholder="Enter email"
                                    style={style}
                                />
                                <ErrorMessage name="email" render={renderError} />
                                <p style={{ color: 'red' }}>{errorMessage}</p><br />
                                <button type="submit" className="seacrh-btn">
                                    Reset Password
                                </button>
                            </Form>
                        </Formik>
                    </div>
    
                </section>
            </div>
        )
    
}
export default Forgot;