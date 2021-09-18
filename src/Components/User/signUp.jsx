import React, { useState } from 'react'
import ApiCalls from '../../Helpers/Api/home';
import { userSchema } from './signUpValidation';
import { useHistory, useLocation } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
//import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
const style = {
    marginTop: '10px',
    marginBottom: '10px'
}
export default function SignUp() {
    let history = useHistory();
    let location = useLocation();
    const [formValue, setFormValue] = useState({
        email: '',
        phoneNumber: '',
        password: '',
        confpassword: '', 
        country:'+00'
    });

    const renderError = (message) => <p style={{ color: 'red', textAlign: 'left', marginLeft: '70px' }} >{message}</p>;
    // const inputValue = (event) => 
    // {
    //     const {name, value} = event.target;
    //     setFormValue((prevalue) => {
    //     return {
    //         ...prevalue, 
    //         [name]:value
    //     }
    // })
    // }

    //const {register, handleSubmit, errors} = useForm();
    const formData = async (values) => {
        const response = await ApiCalls.register(values);
        history.push({
            pathname: "/" + window.location.href.split('/')[3].toString() + "/mobileotp",
            state: response
        })
    }
    const countryChange = (e) => {
        setFormValue({country:e.target.value})
    }
    return (
        <div>
            <section className="banner-section" style={{ backgroundImage: 'none', backgroundColor: '#364150', padding: '50px' }}>
                <div className="auto-container">
                    <Formik
                        initialValues={formValue}
                        validationSchema={userSchema}
                        onSubmit={async (values, { resetForm }) => {
                            values.country = formValue.country;
                            await formData(values);
                            resetForm();
                        }}
                    >
                        <Form style={{ width: '500px', boxShadow: 'none' }}>
                            <Field
                                name="email"
                                type="text"
                                className="search-banner"
                                placeholder="Email address"
                                style={style}
                            />
                            <ErrorMessage name="email" render={renderError} />
                            <select onChange={countryChange} name="country" className="search-banner" placeholder="Slect Country" style={{marginBottom:'10px', marginTop:'10px', backgroundImage: 'none' }} >
                                <option value='+00'>Select Country</option>
                                <option value='+91'>India</option>
                                <option value='+44'>United Kingdom</option>
                            </select>
                            <ErrorMessage name="country" render={renderError} />
                            <br />
                            {/* <Field onChange={countryChange} id="countryvalue" as="select" name="country" className="search-banner" placeholder ="Slect Country" values={formValue.country} style={{backgroundImage:'none'}} >
                                <option  value="">Select Country</option>
                                <option value='+44'>India</option>
                                <option value='+99'>United Kingdom</option>
                            </Field>  */}

                            <span style={{padding:'13px 10px 13px 10px',backgroundColor:' antiquewhite'}}>{formValue.country}</span> 
                           
                           
                            <Field
                                name="phoneNumber"
                                type="text"
                                className="search-banner"
                                placeholder="phone number"
                                style={{marginBottom:'10px', marginTop:'10px',width:'60%'}}
                            />
                            <ErrorMessage name="phoneNumber" render={renderError} />
                            <Field
                                name="password"
                                type="password"
                                className="search-banner"
                                placeholder="New Password"
                                style={style}
                            />
                            <ErrorMessage name="password" render={renderError} />
                            <Field
                                name="confpassword"
                                type="password"
                                className="search-banner"
                                placeholder="Conform Password"
                                style={style}
                            /><br />
                            <ErrorMessage name="confpassword" render={renderError} />
                            <button type="submit" className="seacrh-btn">
                                Create Account
                            </button>
                        </Form>
                    </Formik>
                </div>

            </section>
        </div>
    )
}
