import React, { useState } from 'react'
import * as yup from "yup";
import ApiCalls from '../../Helpers/Api/home';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
const style = {
    marginTop: '10px',
    marginBottom: '10px'
};
const MobileOTP = (props) => {
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const formValue = {
        code: '',
        userid: props.location.state.id
    }
    const formValidation = yup.object().shape({
        code: yup.string().max(6, "Please enter 6 degits").min(6, "please enter 6 degits").required("OTP code is required")
    })
    const renderError = (message) => <p style={{ color: 'red', textAlign: 'left', marginLeft: '70px' }} >{message}</p>;
    const formData = async (values) => {
        const response = await ApiCalls.verifyPhone(values);
        if (response.result) {
            history.push({
                pathname: "/" + window.location.href.split('/')[3].toString() + "/login"
            })
        }
        else {
            setErrorMessage("Please enter valid code")
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
                                name="code"
                                type="text"
                                className="search-banner"
                                placeholder="Enter OTP code"
                                style={style}
                            />
                            <ErrorMessage name="code" render={renderError} />
                            <p style={{ color: 'red' }}>{errorMessage}</p><br />
                            <button type="submit" className="seacrh-btn">
                                Conform Code
                            </button>
                            {/* <button type="button" className="seacrh-btn">
                        Resend Code
                    </button> */}
                        </Form>
                    </Formik>
                </div>

            </section>
        </div>
    )
}
export default MobileOTP;