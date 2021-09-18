import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ApiCalls from '../../Helpers/Api/home';

export default function Main() {
    let history = useHistory();
    const [country, setCountry] = useState([]);
    const [getCountry, setgetCountry] = useState(false);
    const [value, setValue] = useState("");
    const[urlCountry, setUrlCountry] = useState();
    useEffect(async () => {
        const urlCountry = window.location.href.split('/')[3].toString();
        setUrlCountry(urlCountry);
        if (country.length == 0) {
            const response = await ApiCalls.getCountry(urlCountry);
            setCountry(response);
        }
    }, [getCountry])
    const loadCountryAndState = async (e) => {
        setgetCountry(getCountry == false ? true : true)

        setValue(e.target.value);
        Showcountries();
    }

    const Showcountries = () => {

        return (
            <>
                {
                    country.filter(x => x.countryName.toLowerCase().includes(value.toLowerCase())).length > 0 && value.length > 0 ?

                        <div style={{ overflow: 'scroll', height: '300px' }}>

                            {
                                country.filter(x => x.countryName.toLowerCase().includes(value.toLowerCase())).map((result) => (
                                    <>
                                        <p style={{ textAlign: 'left' }}>
                                            <h3 >Country: </h3>
                                            {/* <h4 style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { document.getElementById("searchBox").value = result.countryName; setCountry([]) }}>{result.countryName}</h4> */}
                                            <h4 style={{color: 'blue' }} >{result.countryName}</h4>
                                        </p>

                                        <hr />

                                        <p style={{ textAlign: 'left' }}>{result.state.map((result) => (<h4 style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { document.getElementById("searchBox").value = result; setCountry([]) }}>{result}</h4>))} <hr /></p>

                                    </>
                                ))

                            }
                        </div> : <></>
                }
            </>
        )
    }

    const handleChange = async () => {
        var inputVal = document.getElementById("searchBox").value;
        if (inputVal.length > 2) {
            history.push({
                pathname: "/"+ urlCountry + "/listing" ,
                search:"?"+ new URLSearchParams({state:inputVal, category: "all"/*, zipcode: null */}),
                //state: {inputVal , urlCountry}
            })
        }
    }

    return (
        <div>


            <section className="banner-section">
                <div className="auto-container">
                    <h1>Your favourite restaurants and takeaways, delivered to your door</h1>
                    <form>
                        <h2>Search Your Favourite Items</h2>
                        <div className="search-outer">
                            <input name="" id="searchBox" type="text" className="search-banner" placeholder="Enter location" onChange={loadCountryAndState} autoComplete='off' />
                            <input name="" type="button" className="seacrh-btn" value="Search" onClick={handleChange} />

                            <Showcountries />

                        </div>
                        {
                            localStorage.getItem('user_detail') == null ? <h3><Link to={"/" +window.location.href.split('/')[3].toString() +"/login"}>Log in </Link>for your recent orders.</h3> : <></>
                        }

                    </form>

                </div>

            </section>


            <section className="menu-section">
                <div className="auto-container">

                    <h2 className="title-con">What's on the menu?</h2>

                    <ul>
                        <li>
                            <span><img src={require("../../Assets/images/product01.jpg").default} /></span>
                            <div className="product-content">
                                <h3>Comfort food</h3>
                                <p>Classic, comforting dishes that always hit the spot.</p>
                                <a href="javascript:void(0);">View Comfort food </a>
                            </div>
                        </li>
                        <li>
                            <span><img src={require("../../Assets/images/product02.jpg").default} /></span>
                            <div className="product-content">
                                <h3>Desserts and sweet dishes</h3>
                                <p>Sweet delights that are a tasty addition to any day.</p>
                                <a href="javascript:void(0);">View Desserts and sweet dishes </a>
                            </div>
                        </li>
                        <li>
                            <span><img src={require("../../Assets/images/product03.jpg").default} /></span>
                            <div className="product-content">
                                <h3>Office Catering</h3>
                                <p>Whether you're hosting clients, planning a work event or feeding your team, check out our selection of platters created just for the office.</p>
                                <a href="javascript:void(0);">View Office Catering</a>
                            </div>
                        </li>
                        <li>
                            <span><img src={require("../../Assets/images/product04.jpg").default} /></span>
                            <div className="product-content">
                                <h3>Healthy</h3>
                                <a href="javascript:void(0);">View Healthy </a>
                            </div>
                        </li>

                        <li>
                            <span><img src={require("../../Assets/images/product05.jpg").default} /></span>
                            <div className="product-content">
                                <h3>Only on Bigbook Shop</h3>
                                <p>Whether high street faves or local haunts, you won't find these guys anywhere else.</p>
                                <a href="javascript:void(0);">View Only on Bigbook Shop </a>
                            </div>
                        </li>
                        <li>
                            <span><img src={require("../../Assets/images/product06.jpg").default} /></span>
                            <div className="product-content">
                                <h3>Big flavours, small prices</h3>
                                <p>Proof that you can have great food every day. Check out our selection of wallet-friendly eats.</p>
                                <a href="javascript:void(0);">View Big flavours, small prices </a>
                            </div>
                        </li>

                        <li>
                            <span><img src={require("../../Assets/images/product07.jpg").default} /></span>
                            <div className="product-content">
                                <h3>Our picks</h3>
                                <p>Discover a new local favourite with recommendations from Deliveroo's expert restaurant team.</p>
                                <a href="javascript:void(0);">View Our picks </a>
                            </div>
                        </li>

                        <li>
                            <span><img src={require("../../Assets/images/product08.jpg").default} /></span>
                            <div className="product-content">
                                <h3>Bigbook Shop Editions</h3>
                                <p>A collection of delivery-only kitchens created for your neighbourhood, giving you more choice than ever.</p>
                                <a href="javascript:void(0);">View Bigbook Shop Editions </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>





            <section className="delivered-section">
                <div className="auto-container">


                    <h2 className="title-con">Loved by you, delivered by us</h2>

                    <div className="delivered-inner">
                        <div className="delivered-left">
                            <ul>
                                <li>
                                    <span><img src={require("../../Assets/images/dishes01.jpg").default} alt="" /></span>
                                    <h3>Pho</h3>
                                </li>
                                <li>
                                    <span><img src={require("../../Assets/images/dishes02.jpg").default} alt="" /></span>
                                    <h3>Wagamama</h3>
                                </li>
                                <li>
                                    <span><img src={require("../../Assets/images/dishes03.jpg").default} alt="" /></span>
                                    <h3>KFC</h3>
                                </li>
                                <li>
                                    <span><img src={require("../../Assets/images/dishes04.jpg").default} alt="" /></span>
                                    <h3>Byron</h3>
                                </li>
                            </ul>
                        </div>

                        <div className="delivered-right">

                            <h3>Need some more options? </h3>

                            <ul>
                                <li><a href="javascript:void(0);">chinese</a></li>
                                <li><a href="javascript:void(0);">italian</a></li>
                                <li><a href="javascript:void(0);">thai</a></li>
                                <li><a href="javascript:void(0);">pizza</a></li>
                                <li><a href="javascript:void(0);">breakfast</a></li>
                                <li><a href="javascript:void(0);">mexican</a></li>
                                <li><a href="javascript:void(0);">japanese</a></li>
                                <li><a href="javascript:void(0);">vegetarian</a></li>
                                <li><a href="javascript:void(0);">lebanese</a></li>
                                <li><a href="javascript:void(0);">american</a></li>
                                <li><a href="javascript:void(0);">greek</a></li>
                                <li><a href="javascript:void(0);">halal</a></li>
                                <li><a href="javascript:void(0);">sushi</a></li>
                                <li><a href="javascript:void(0);">indian</a></li>
                                <li><a href="javascript:void(0);">dessert</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            <section className="kitchen-section">
                <div className="auto-container">

                    <h2 className="title-con">Fresh from the kitchen</h2>


                    <div className="kitchen-inner">
                        <div className="kitchen-left">

                            <img src={require("../../Assets/images/deliveroo1.jpg").default} alt="" />
                        </div>


                        <div className="kitchen-right">
                            <h3>Bigbook Shop for Business</h3>
                            <p>Hungry clients or hungry staff, our corporate team can help.</p>
                            <a href="javascript:void(0);" className="enquire">Enquire</a>
                        </div>


                    </div>

                    <div className="kitchen-inner">



                        <div className="kitchen-right google-play">
                            <h3>Have you got the app?</h3>
                            <p>Get yours now - available on the iOS and Android app stores!</p>
                            <ul>
                                <li>
                                    <a href="javascript:void(0);"><img src={require("../../Assets/images/app01.png").default} alt="" /></a>
                                </li>

                                <li>
                                    <a href="javascript:void(0);"><img src={require("../../Assets/images/app02.png").default} alt="" /></a>
                                </li>
                            </ul>
                        </div>
                        <div className="kitchen-left">

                            <img src={require("../../Assets/images/deliveroo2.jpg").default} alt="" />
                        </div>


                    </div>


                </div>
            </section>


        </div>
    )
}
