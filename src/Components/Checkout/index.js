import React, { useState, useEffect } from 'react';

export default function Checkout() {
    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
         document.body.appendChild(script);
       });
    };
    
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    });
    const rosarpay = ()=>{
        const options = {
            key: "rzp_test_5MCyb7lkQx7mW6",
            currency: "INR",
            amount: 100,
            name: "Learning To Code Online",
            description: "Test Wallet Transaction",
            image: "http://localhost:1337/logo.png",
            id:2,
            payment_capture:3,
            handler: function (response) {
                console.log("response",response);
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature);
            },
            prefill: {
              name: "vishal",
              email: "vishalhnakum011@gmail.com",
              contact: "7990448105",
            },
          };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    
    return (
        <div className="checkout">
            <div className="container">
                <div className="checkout__content">
                    <div className="checkout__left-column">
                        <div className="checkout__order-info">
                            <h1>product name</h1>
                            <span>Deliver in 25 - 45 min</span>
                        </div>
                        <form method="post" action="/checkout/payment" className="form-branded checkout--payment-form" novalidate="">
                            <div className="address-details checkout__section checkout__section-address">
                                <h3>Delivery address</h3>
                                <button
                                    type="button"
                                    className="course-payment-button"
                                    onClick={rosarpay}
                                >
                                    Buy Now
                                </button>
                                <div className="form-field">
                                    <label>Flat number / building name</label>
                                    <input type="text" name="address2" />
                                </div>
                                <div className="form-field">
                                    <label>Street address</label>
                                    <input type="text" name="address1" />
                                    <small className="note">Includes your street name and building number</small>
                                </div>

                                <div className="flex postcode-phone">
                                    <div className="form-field pr10">
                                        <label>Postcode</label>
                                        <input type="text" name="address1" />
                                    </div>
                                    <div className="form-field pl10">
                                        <label>Phone number</label>
                                        <input type="text" name="address1" />
                                    </div>
                                </div>
                                <div className="form-field ">
                                    <label>Instructions for your rider</label>
                                    <input type="text" name="address1" />
                                </div>
                            </div>
                            <div className="checkout__section">
                                <button type="submit">Place delivery order</button>
                            </div>
                        </form>
                    </div>
                    {/* right side */}
                    <div className="checkout__right-column">
                        <div className="basket-summary-wrapper">
                            <div className="basket--summary">
                                <div className="title">
                                    <h4>Basket</h4>
                                </div>
                                <div className="basket-items">
                                    <div className="text-muted">
                                        3x
                                    </div>
                                    <div>
                                        <label>Tear n Share Bread Ring (V)</label>
                                        <div className="text-muted">Red Pesto</div>
                                    </div>
                                    <div className="total-price">$110</div>
                                </div>
                                <hr className="basket-separator" />
                                <div className="basket-totals">
                                    <ul className="no-ui order-summary subtotals">
                                        <li className="order-summary-offer">
                                            <span >Subtotal</span>
                                            <span className="text-muted">£15.36</span>
                                        </li>
                                        <li className="order-summary-offer">
                                            <span>Delivery fee</span>
                                            <span className="text-muted">£2.99</span>
                                        </li>
                                        <li className="order-summary-offer">
                                            <span>Service fee</span>
                                            <span className="text-muted">£2.99</span>
                                        </li>
                                        <li className="order-summary-offer">
                                            <span>Rider tip</span>
                                            <span className="text-muted">£00</span>
                                        </li>
                                    </ul>
                                </div>
                                <hr className="basket-separator"/>
                                <div className="summary-total-container">
                                    <span>Total</span>
                                    <span>£19.31</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
