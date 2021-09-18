import React from 'react'
import ApiCalls from '../../Helpers/Api/home';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
const style = {
    marginTop: '10px',
    marginBottom: '10px'
};
const Reset = (props) => {
    let history = useHistory();
    const initialValue = {
        userid:'',
        code: '',
        password: '',
        confPassword: ''
    }
    const validationSchema = yup.object().shape({
        password: yup.string().required('Password is required'),
        confPassword: yup.string().oneOf([yup.ref('password')], "Password doesn't match").required('Password is required')
    })
    const renderError = (message) => <p style={{ color: 'red', textAlign: 'left', marginLeft: '70px' }} >{message}</p>;
    const handleSubmit = async (values) => {
        values.code = props.match.params.code
        values.userid = props.match.params.userid
        var response = await ApiCalls.resetPassword(values.password, values.code, values.userid)
      
        if (response.status) {
            history.push({
                pathname: "/"+ window.location.href.split('/')[3].toString() + "/login"
            })
        }
    }
    return (
        <div>
            <section className="banner-section" style={{ backgroundImage: 'none', backgroundColor: '#364150', padding: '50px' }}>
                <div className="auto-container">
                    <Formik
                        initialValues={initialValue}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { resetForm }) => {
                            await handleSubmit(values);
                            resetForm();
                        }}
                    >
                        <Form style={{ width: '500px', boxShadow: 'none' }}>
                            <Field
                                name='password'
                                type='password'
                                className='search-banner'
                                placeholder="Enter password"
                                style={style}

                            />
                            <ErrorMessage name="password" render={renderError} />
                            <Field
                                name='confPassword'
                                type='password'
                                className='search-banner'
                                placeholder="Enter conform password"
                                style={style}
                            />
                            <ErrorMessage name="confPassword" render={renderError} />
                            <br/>
                            <button type="submit" className="seacrh-btn">
                                Save
                            </button>
                        </Form>
                    </Formik>
                </div>
            </section>
        </div>
    )
}
export default Reset;