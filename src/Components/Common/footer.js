import React from 'react'

export default function Footer() {
    return (
        <footer>

            <div className="auto-container">

                <div className="footer01">
                    <h2>Discover Bigbook Shop</h2>
                    <ul> 
                        <li><a href="javascript:void(0);">About us</a></li>
                        <li><a href="javascript:void(0);">Takeaway</a></li> 
                        <li><a href="javascript:void(0);">Newsroom</a></li> 
                        <li><a href="javascript:void(0);">Careers</a></li>
                        <li><a href="javascript:void(0);">Restaurant signup</a></li>
                        <li><a href="javascript:void(0);">Become a rider</a></li>
                    </ul>


                </div>

                <div className="footer01">
                    <h2>Legal</h2>

                    <ul>
                        <li><a href="javascript:void(0);">Terms and conditions</a></li>
                        <li><a href="javascript:void(0);">Privacy</a></li>
                        <li><a href="javascript:void(0);">Cookies</a></li>
                        <li><a href="javascript:void(0);">Modern Slavery Statement</a></li>
                        <li><a href="javascript:void(0);">Tax Strategy</a></li>
                        <li><a href="javascript:void(0);">Section 172 Statement</a></li>
                    </ul>



                </div>

                <div className="footer01">

                    <h2>Help</h2>

                    <ul>
                        <li><a href="javascript:void(0);">Contact</a></li>
                        <li><a href="javascript:void(0);">FAQs</a></li>
                        <li><a href="javascript:void(0);">Cuisines</a></li>
                        <li><a href="javascript:void(0);">Brands</a></li>
                        <li><a href="javascript:void(0);">Site map</a></li>
                    </ul>


                </div>

                <div className="footer01">

                    <h2>Take Bigbook Shop with you</h2>
                    <ul className="app-con">
                        <li><a href="javascript:void(0);"><img src={require("../../Assets/images/app01.png").default} alt="" /></a></li>
                        <li><a href="javascript:void(0);"><img src={require("../../Assets/images/app01.png").default} alt="" /></a></li>
                    </ul>


                </div>



            </div>

            <div className="copyright-outer">

                <p>© 2021 Bigbook. All Rights Reserved </p>

            </div>




        </footer>
    )
}
