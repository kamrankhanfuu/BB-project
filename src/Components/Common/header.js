import React,{useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
// import logo from ' Assets/images/logo.png'
export default function Header() {
    let history = useHistory();
    const [userDetail, setUserDetail]= useState();
    const [urlCountry , setUrlCountry] = useState();
    useEffect( () => {
       // const user =JSON.parse(localStorage.getItem('user_detail'))
        const user = JSON.parse(localStorage.getItem("user_detail"))
      
        if(user!==null)
        {
            //userDetail.push(user)
            setUserDetail(user)
        }
        else{
            setUserDetail(null)
        }
        setTimeout(() => {
            setUrlCountry( window.location.href.split('/')[3].toString());
        }, 2000);
        
    }, [])
    return (
        
        <header>


            <div className="auto-container">
                <div className="logo-outer">
                    <a href="/"><img alt="logo" src={require("../../Assets/images/logo.png").default} /></a>
                </div>
                <div className="nav-outer">
                    <div className="mobile-icons">
                        <img src={require("../../Assets/images/mobile-icon.png").default} />

                    </div>
                    <ul>
                  
                    </ul>
                </div>
                <div className="signup-outer">
                    <ul>
                        
                        {
                            userDetail != null ? <li> <span style={{border:'none'}} href="javascript:void(0)">Welcome {userDetail.email} !</span> <Link to={{ pathname: "/" + window.location.href.split('/')[3].toString()+"/orderhistory", state: userDetail.id }}>Order History</Link>  <a style={{cursor:'pointer'}} onClick = {() => {localStorage.removeItem('user_detail') ; history.push({pathname:'/' + window.location.href.split('/')[3].toString()});  window.location.reload()}}>LogOut</a></li>: <li><Link to={{pathname:"/"+ urlCountry +'/login'}}>Sign up or log in</Link></li>
                        }

{/* <li><a href="#">Sign up or log in</a></li> */}
                       
                    </ul>
                </div>
            </div>
        </header>
    )
}
