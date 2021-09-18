import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ApiCalls from '../../Helpers/Api/home';
import { Link } from 'react-router-dom';
export default function LogIn() {
    let history = useHistory();
    const style = {
        marginTop: '10px',
        marginBottom: '10px'
    }

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, seterrorMessage] = useState({
        loginErrorMessage: "",
        emialErrorMessage: "",
        passwordErrorMessage: ""
    });
    const inputValue = (event) => {
        const { name, value } = event.target;
        setFormValue((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }
    const formData = async (event) => {
        event.preventDefault();
        if (formValue.email != '' && formValue.password != '') {
            const response = await ApiCalls.getUser(formValue);
            if (response !== "") {
                if (!response.mobileVerified) {
                    history.push({
                        pathname: "/" + window.location.href.split('/')[3].toString() + "mobileotp",
                        state: response
                    })
                }
                else {

                    localStorage.setItem('user_detail', JSON.stringify(response))

                    history.push({
                        pathname: "/"+window.location.href.split('/')[3].toString()
                    })
                    window.location.reload()
                }
            }
            else {
                seterrorMessage({ loginErrorMessage: "Please enter a valid email or password" })
            }
        }
        else {
            seterrorMessage({ loginErrorMessage: "Please enter a valid email or password" })
        }
    }


    return (
        <div>
            <section className="banner-section" style={{ backgroundImage: 'none', backgroundColor: '#364150', padding: '30px 5px;' }}>
                <div className="auto-container">
                    <form onSubmit={formData} style={{ boxShadow: 'none', margin: 'none', width: '550px', marginBottom:'10px' }}>
                        <h2>Login into your shop</h2>
                        <div className="search-outer">
                            <input style={style} name="email" id="email" type="text" className="search-banner" placeholder="Enter your email" autoComplete='off' onChange={inputValue} /><br />
                            <input style={style} name="password" id="password" type="password" className="search-banner" placeholder="Enter your password" onChange={inputValue} /><br />
                            <p style={{ color: 'red' }}>{errorMessage.loginErrorMessage}</p><br />
                            <input name="" type="submit" className="seacrh-btn" value="LogIn" />

                            <input name="" type="button" className="seacrh-btn" value="SignUp" onClick={() => { history.push({ pathname:"/"+ window.location.href.split('/')[3].toString()+"/signup" }) }} />
                           
                        </div>
                     
                        <Link style={{marginTop:'10px'}} to={"/" + window.location.href.split('/')[3].toString() + "/forgotpassword"}> Forgot password?</Link>
                    </form>
                   

                </div>

            </section>
        </div>
    )
}
