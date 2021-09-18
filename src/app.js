import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Header from './Components/Common/header';
import Footer from './Components/Common/footer';
import home from './Components/Home/index';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import url from "./Helpers/urls";
import Listing from './Components/Listing';
import Detail from './Components/Detail';
import LogIn from './Components/User/logIn';
import SignUp from './Components/User/signUp';
import MobileOTP from './Components/User/mobileOTP';
import ViewAll from './Components/Listing/viewAll';
import { OrderHistory } from './Components/Order/orderHistory';
import ResetPassword from './Components/Password/reset';
import ForgotPassword from './Components/Password/forgot';
import axios from "axios";
function App() {
    const [urlCountry, setUrlCountry] = useState();
    const data = async () => {
        await (fetch('https://extreme-ip-lookup.com/json/').then(res => res.json())
            .then(response => {
                { setUrlCountry(response.countryCode) }
            })
        )
    };


    data();

    return (
        <>
            <Router>
                <Header />
                <Switch>
                    <Route path={url.URL_HOME} exact component={home} />
                    <Route path={url.URL_LISTING} exact component={Listing} />
                    <Route path={url.URL_DETAIL} exact component={Detail} />
                    <Route path={url.URL_LOGIN} exact component={LogIn} />
                    <Route path={url.URL_SIGNUP} exact component={SignUp} />
                    <Route path={url.URL_VIEWALL} exact component={ViewAll} />
                    <Route path={url.URL_ORDERHISTORY} exact component={OrderHistory} />
                    <Route path={url.URL_MOBILEOTP} exact component={MobileOTP} />
                    <Route path={url.URL_RESET} exact component={ResetPassword} />
                    <Route path={url.URL_FORGOT} exact component={ForgotPassword} />
                    {urlCountry !== undefined ? <Redirect from="*" to={"/" + urlCountry} component={home} /> : <></>}
                    {/* <Redirect from="*" to={"/"+ urlCountry} component={home} /> */}

                </Switch>
                {/* {
                    window.location.pathname !== '/login' && window.location.pathname !== '/signup' ? <Footer /> : null
                } */}
                <Footer />
            </Router>


        </>
    );
}

export default App;
