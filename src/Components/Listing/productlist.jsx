import React from 'react'
import { Link } from 'react-router-dom';
export default function productlist({product, mainList, searchValue, urlCountry}) {
    return (
          <>
                   
                      <div className="item">
                      <div className="products-category">
                         
                          <div className="products-img" style={{textAlign:"center", backgroundColor:"white",border: "1px solid #eee",borderBottom: "none"}}>
                          <img src={product.imagesURL === null? require("../../Assets/images/NoImage.png").default: product.imagesURL} alt="" />
                          </div>
                          <div className="products-content">
                      
                              <h3 style={{fontSize: "medium"}}>{product.productName.substring(0, 20)} </h3>
                              <h3 style={{fontSize: "small", color:'blue'}}>{product.companyName.substring(0, 30)} </h3>
                              <p>{product.countryName} <span>{product.address !=null ? <>( {product.address} )</>:<></>}</span></p>
                                <h4>{product.currency} {product.sellingPrice}</h4>
                              {/* <h4>1.6 miles away, Free delivery</h4> */}
                              {/* <h5>30 - 50 min</h5> */}

                              {/* <h6 className="delivery-price">£1.99<br /> delivery</h6> */}

                              {/* <a href="javascript:void(0);">Add to Cart</a> */}
                              <Link to={{ pathname: '/'+ urlCountry + `/detail`, state: { record :product, list : mainList , searchValue : searchValue, urlCountry : urlCountry }}}>View Detail</Link>
                          </div>
                      </div>
                  </div>

                     </>
    )
}
