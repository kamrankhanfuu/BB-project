import React, { useState, useEffect } from 'react'
import ApiCalls from '../../Helpers/Api/home';
export const OrderHistory = (props) => {
    const tableStyle = {
        fontFamily: 'arial',
        borderCollapse: 'collapse',
        width: '100%'
    }
    const tdstyle = {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px'
    }

    const id = props.location.state;

    const [orderHistory, setOrderHistory] = useState([]);
    useEffect(async () => {
        const result = await ApiCalls.orderHistory(id);

        setOrderHistory(result);

    }, [])
    return (

        <div className="full-width">

            <section className="listing-outer">
                <div className="auto-container">
 
                    <div className="order-list">
                        <div>

                            <table style={tableStyle}>
                                <tr>
                                    <th style={tdstyle}>Product/Service</th>
                                    <th style={tdstyle}>Quantity</th>
                                    <th style={tdstyle}>Total Price</th>
                                    <th style={tdstyle}>Status</th>
                                </tr>
                                {
                                    
                                    orderHistory.map((item) => (
                                        <>
                                            <tr>
                                                <td style={tdstyle}>{item.productName}</td>
                                                <td style={tdstyle}>{item.qty}</td>
                                                <td style={tdstyle}>{item.totalPrice}</td>
                                                <td style={tdstyle}>{item.status}</td>
                                            </tr>
                                        </>
                                    ))
                                }


                            </table>







                        </div>

                    </div>

                </div>
            </section>
        </div>
    )
}
