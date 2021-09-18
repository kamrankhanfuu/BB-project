import React from 'react'
import { Link } from 'react-router-dom';
export default function servicelist({service, mainList , searchValue, urlCountry}) {
    return (
        <>
                   
                        <div className="item">
                            <div className="products-category">
                                <div className="products-img" style={{textAlign:"center", backgroundColor:"white",border: "1px solid #eee",borderBottom: "none"}}>
                                <img src={service.imagesURL === null? require("../../Assets/images/NoImage.png").default: service.imagesURL} alt="" />
                                </div>
                                <div className="products-content">
                                <h3 style={{fontSize: "medium"}}>{service.productName.substring(0, 20)} </h3>
                                <h3 style={{fontSize: "small", color:'blue'}}>{service.companyName.substring(0, 20)} </h3>
                                    <p>{service.countryName} <span>()</span></p>
                                  
                                    <h4>{service.currency} {service.sellingPrice}</h4>
                                    {/* <h5>30 - 50 min</h5> */}
                                    {/* <a href="javascript:void(0);">Add to Cart</a> */}
                                    <Link to={{ pathname: '/'+ urlCountry + `/detail`, state: { record:service, list: mainList , searchValue:searchValue , urlCountry : urlCountry} }}>View Detail</Link>
                                </div>
                            </div>
                        </div>

                     </>
    )
}
