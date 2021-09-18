import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApiCalls from '../../Helpers/Api/home';
import Swal from "sweetalert2";
const Detail = (props) => {
    let history = useHistory();
    const prop = props.location.state;
    const [singlRecord, setSingleRecord] = useState(props.location.state.record);
    //var singlRecord = props.location.state.record;
    const [relatedRecord, setrelatedRecord] = useState(props.location.state.list.filter((rec) => rec.productCategoryId == props.location.state.record.productCategoryId));
    const [cart, setCart] = useState([]);
    var [subTotal, setsubTotal] = useState(0);

    useEffect(() => {
        //localStorage.clear('cart_item');
        const localitem = JSON.parse(localStorage.getItem("cart_item"))
        //  console.log(relatedRecord)
        //  console.log(singlRecord)
        if (localitem != null) {
            setCart(localitem)
            subTotalPrice(localitem);
        }



        //localStorage.clear('cart_item');
    }, [])

    const subTotalPrice = (value) => {
        var price = 0;
        value.map((x) => (price = price + x.totalPrice))
        setsubTotal(price)

    }

    const addToCart = async () => {
        if (cart.length > 0) {
            const exist = cart.find((x) => x.productId == singlRecord.productId);
            if (exist) {

                setsubTotal(subTotal + exist.price)
                exist.Qty = exist.Qty + 1;
                exist.totalPrice = exist.price * exist.Qty;
                setCart(cart.map((x) => x.productId === exist.productId ? { ...exist } : x));
            }
            else {

                const record = { productName: singlRecord.productName, productId: singlRecord.productId, Qty: 1, userId: 0, price: singlRecord.sellingPrice, totalPrice: singlRecord.sellingPrice, accountId: singlRecord.accountId };

                cart.push(record)
                setsubTotal(subTotal + record.price)
            }
        }
        else {
            const record = { productName: singlRecord.productName, productId: singlRecord.productId, Qty: 1, userId: 0, price: singlRecord.sellingPrice, totalPrice: singlRecord.sellingPrice, accountId: singlRecord.accountId };

            cart.push(record)
            setsubTotal(subTotal + record.price)
        }


        localStorage.setItem("cart_item", JSON.stringify(cart));


    }
    const removeItem = (value) => {
        const newlist = cart.filter((x) => x.productId !== value.productId);
        setCart(newlist);
        localStorage.setItem("cart_item", JSON.stringify(newlist));
        subTotalPrice(newlist)
    }

    const saveOrder = async () => {
        const user = JSON.parse(localStorage.getItem("user_detail"));
        cart.forEach((item) => { item.userId = user.id });
        var result = await ApiCalls.postOrder(cart);
        if (result.status == true) {
            Swal.fire({
                icon: "success",
                title: "Thank You For Order",
            });

            localStorage.removeItem("cart_item");
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        }



    }
    return (
        <section className="details-outer">
            <div className="auto-container">
                <div className="details-left-outer">
                    <div className="details-breadcrumb">
                        <ul>
                            <li><a style={{ cursor: 'pointer' }} onClick={() => { history.push({ pathname: "/" + prop.urlCountry}) }}>Home</a></li>
                            <li><a style={{ cursor: 'pointer' }} onClick={() => { history.push({ pathname:"/" + prop.urlCountry+"/listing", state: {inputVal:prop.searchValue,urlCountry: prop.urlCountry} }) }}>Listing</a></li>
                            <li>{singlRecord.productName}</li>
                        </ul>
                    </div>
                    <div className="details-post-content">
                        <h1> {singlRecord.productName}</h1>
                        <h2 style={{ background: 'none' }}>{singlRecord.currency} {singlRecord.sellingPrice}</h2>
                        <br />



                        <div className="products-img" style={{ width: "50%", textAlign: "center", backgroundColor: "white", border: "1px solid #eee" }}>
                            <img src={singlRecord.imagesURL === null ? require("../../Assets/images/NoImage.png").default : singlRecord.imagesURL} alt="" />
                        </div>
                        <br />

                    </div>
                    {/* <h2>4.5 (500+ rating)</h2> */}
                    {/* <p>German ' kebab ' Vegetarian ' Halal ' Open until 23:59 ' Free delivery ' 0.33 miles away ' 304 Kilburn High Road, London, NW62DB ' <a href="#">View map</a></p> */}

                    {/* onClick = {addToCart} */}

                    <button onClick={addToCart} className="seacrh-btn" style={{ float: 'right', marginBottom: '20px' }} >Add To Cart</button>

                    <div className="details-tabs-content">
                        <div className="tabs">
                            {/* <ul className="tabs-nav">
                                <li><a href="#tab-1">Boss Box</a></li>
                                <li><a href="#tab-2">A La Carte </a></li>
                                <li><a href="#tab-3">Nibbles </a></li>
                                <li><a href="#tab-4">Doner Boxes</a></li>
                                <li><a href="#tab-5">Junior Meal Deals</a></li>
                                <li className="more-select"><select>
                                    <option>More</option>
                                    <option>Boss Box</option>
                                    <option>Nibbles</option>
                                    <option>Junior Meal Deals</option>
                                </select></li>
                            </ul> */}
                            <div className="tabs-stage">
                                {/* <div id="tab-1" className="tabs-con">
                                    <h2>Boss Box</h2>
                                    <ul>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <div className="product-img-pop">
                                                        <img src={require("../../Assets/images/product06.jpg").default} alt="" />
                                                    </div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html2" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html2">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html3" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html3">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html4" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html4">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html5" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html5">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html6" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html6">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html7" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html7">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html8" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html8">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html9" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html9">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html10" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html10">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html11" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html11">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html12" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html12">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html13" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html13">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html14" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html14">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html15" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html15">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html16" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html16">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html17" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html17">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html18" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html18">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html19" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html19">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html20" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html20">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html21" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html21">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html22" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html22">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html23" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html23">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html24" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html24">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html25" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html25">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html26" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html26">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html27" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html27">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html28" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html28">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html29" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html29">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html30" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html30">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                                {/* <div id="tab-2" className="tabs-con">
                                    <h2>A La Carte </h2>
                                    <ul>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html31" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html31">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html32" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html32">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html33" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html33">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html34" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html34">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html35" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html35">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html36" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html36">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html37" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html37">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html38" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html38">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html39" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html39">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html40" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html40">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html41" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html41">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html42" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html42">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html43" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html43">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html44" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html44">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html45" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html45">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html46" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html46">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html47" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html47">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html48" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html48">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html49" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html49">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html50" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html50">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html51" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html51">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html52" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html52">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html53" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html53">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html54" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html54">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html55" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html55">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html56" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html56">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html57" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html57">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html58" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html58">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html59" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html59">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html60" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html60">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                                {/* <div id="tab-3" className="tabs-con">
                                    <h2>Nibbles </h2>
                                    <ul>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html61" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html61">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html62" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html62">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html63" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html63">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html64" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html64">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html65" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html65">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html66" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html66">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html67" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html67">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html68" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html68">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html69" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html69">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html70" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html70">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html71" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html71">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html72" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html72">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html73" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html73">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html74" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html74">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html75" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html75">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html76" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html76">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html77" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html77">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html78" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html78">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html79" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html79">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html80" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html80">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html81" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html81">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html82" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html82">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html83" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html83">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html84" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html84">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html85" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html85">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html86" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html86">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html87" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html87">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html88" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html88">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html89" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html89">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html90" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html90">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                                {/* <div id="tab-4" className="tabs-con">
                                    <h2>Doner Boxes</h2>
                                    <ul>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html91" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html91">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html92" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html92">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html93" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html93">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html94" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html94">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html95" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html95">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html96" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html96">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html97" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html97">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html98" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html98">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html99" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html99">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html100" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html100">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html101" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html101">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html102" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html102">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html103" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html103">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html104" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html104">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html105" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html105">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html106" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html106">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html107" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html107">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html108" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html108">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html109" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html109">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html110" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html110">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html111" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html111">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html112" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html112">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html113" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html113">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html114" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html114">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html115" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html115">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html116" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html116">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html117" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html117">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html118" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html118">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html119" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html119">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html120" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html120">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}
                                <div id="tab-5" className="tabs-con">
                                    <h2>Related Products</h2>


                                    <ul>
                                        {
                                            relatedRecord.filter(x => x.productId !== singlRecord.productId).map((result) =>
                                            (
                                                <>
                                                    <li className="popup_main">

                                                        <button onClick={() => setSingleRecord(result)} style={{ width: '100%' }} className="open_popup"><span style={{ textAlign: 'center' }}><div><img style={{ width: 'unset' }} src={result.imagesURL === null ? require("../../Assets/images/NoImage.png").default : result.imagesURL} alt="" /></div></span> <strong className="tabs-content-inner">
                                                            {/* <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4> */}
                                                            <h3 style={{ fontSize: "medium" }}>{result.productName.substring(0, 20)} </h3>
                                                            <h3 style={{ fontSize: "small", color: 'blue' }}>{result.companyName.substring(0, 20)} </h3>
                                                            <p>{result.countryName} <span>()</span></p>

                                                            <h4>{result.currency} {result.sellingPrice}</h4>
                                                        </strong></button>
                                                    </li>
                                                </>
                                            ))
                                        }
                                        {/*  <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html121" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html121">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html122" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html122">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html123" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html123">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html124" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html124">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html125" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html125">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div> 
                                        </li>
                                        */}
                                        {/* <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html126" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html126">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html127" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html127">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html128" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html128">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html129" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html129">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html130" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html130">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html131" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html131">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html132" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html132">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html133" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html133">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html134" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html134">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html135" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html135">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html136" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html136">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html137" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html137">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html138" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html138">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html139" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html139">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html140" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html140">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html141" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html141">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html142" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html142">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html143" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html143">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html144" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html144">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html145" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html145">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li>
                                        <li className="popup_main">
                                            <button className="open_popup"><span><img src={require("../../Assets/images/product06.jpg").default} alt="" /></span> <strong className="tabs-content-inner">
                                                <h3>The Original German Doner Kebab</h3>
                                                <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                                                <h4>£ 6.99 </h4>
                                            </strong></button>
                                            <div className="popup_body">
                                                <div className="popup_back" />
                                                <div className="popup_contain">
                                                    <div className="popup_close">x</div>
                                                    <h3>The Original German Doner Kebab</h3>
                                                    <h4>Choice of any 2 wine</h4>
                                                    <p>Allergen information unavailable.</p>
                                                    <div className="popupcheck">
                                                        <form>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html146" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html146">Red Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html147" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html147">White wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html148" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html148">Rose wine 75 cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html149" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html149">Blossom Hill Rose Wine 70cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="checkbox" id="html150" />
                                                                <div className="form-groupeee">
                                                                    <label htmlFor="html150">Prosecco 75cl </label>
                                                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty" />
                                                                        <input type="text" className="qtyValue" defaultValue={1} />
                                                                        <i className="fa fa-plus increaseQty" /> </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="details-right-outer">
                    {/* <div className="details-delivery-outer"> <span><img src="images/product01.jpg" alt="" /></span>
                        <div className="listing-inner-top">
                            <h2>Deliver in 10 - 20 min<br />
                                <strong>Priory Park Rd, North Maida Vale, London NW6 7GZ, UK</strong></h2>
                            <a href="#">Change</a> </div>
                    </div>
                    <div className="order-btn"> <a href="#">Start Group Order</a> </div>
                    <div className="free-delivery"> <a href="#">Add 15.00 to get FREE DELIVERY</a> </div> */}
                    {/* <div className="order-btn"> <a href="#">Go to Checkout</a> </div> */}
                    {
                        cart.length > 0 ? <>
                            <div className="order-btn"> <a style={{ cursor: 'pointer' }} onClick={() => {
                                if (localStorage.getItem('user_detail') == null) {
                                    history.push({
                                        pathname: "/" + prop.urlCountry + "/login"
                                    })
                                }
                                else {
                                    saveOrder();
                                }
                            }}>Go to Checkout</a> </div>
                        </> : <>
                            <div className="order-btn"> <a href='#' style={{ pointerEvents: 'none' }}>Go to Checkout</a> </div>
                        </>
                    }






                    <div className="empty-outer">

                        {
                            cart.length > 0 ? cart.map((rec) => (
                                //totalPrice = totalPrice + rec.price* rec.Qty;
                                <>
                                    <div className="price-checkout">
                                        <div className="price-check-left">
                                            <div>
                                                <h2>{rec.productName} <br /><span>{rec.Qty} </span></h2>
                                            </div>

                                        </div>
                                        <div className="price-check-right" style={{ width: '17px' }}>
                                            <h2>{singlRecord.currency}{rec.totalPrice}</h2>

                                        </div>
                                        <button style={{ float: 'right' }} onClick={() => removeItem(rec)}>X</button>

                                    </div>
                                    {/* <div className="price-checkout">
                                        <div className="price-check-left">
                                            <h2>Subtotal <br /><span>50% off (-£32.50) </span></h2>
                                        </div>
                                        <div className="price-check-right">
                                            <h2>£32.49</h2>
                                        </div>
                                    </div>
                                    <div className="price-checkout">
                                        <div className="price-check-left">
                                            <h2>Delivery fee</h2>
                                        </div>
                                        <div className="price-check-right">
                                            <h2>£7.99</h2>
                                        </div>
                                    </div>
                                    <div className="price-checkout">
                                        <div className="price-check-left">
                                            <h2>Service fee</h2>
                                        </div>
                                        <div className="price-check-right">
                                            <h2>£2.00</h2>
                                        </div>
                                    </div>
                                    <div className="how-works">
                                        <a href="#">How fees work</a>
                                    </div> */}

                                </>))

                                : <div className="price-checkout">  <h2 style={{ color: '#ff7900' }}>Cart is empty</h2></div>
                        }
                        {
                            cart.length > 0 ?
                                <div className="price-checkout">
                                    <div className="price-check-left">
                                        <h2>Total</h2>
                                    </div>
                                    <div className="price-check-right">

                                        <h2>{singlRecord.currency}{subTotal}</h2>
                                    </div>
                                </div> : <></>
                        }






                        {/* <div className="price-checkout">
                            <div className="price-check-left">
                                <h2>Any 2 Wine <br /><span>Red Wine 70cl, White wine 75 cl </span></h2>
                            </div>
                            <div className="price-check-right">
                                <h2>£64.99</h2>
                            </div>
                        </div>
                        <div className="price-checkout">
                            <div className="price-check-left">
                                <h2>Subtotal <br /><span>50% off (-£32.50) </span></h2>
                            </div>
                            <div className="price-check-right">
                                <h2>£32.49</h2>
                            </div>
                        </div>
                        <div className="price-checkout">
                            <div className="price-check-left">
                                <h2>Delivery fee</h2>
                            </div>
                            <div className="price-check-right">
                                <h2>£7.99</h2>
                            </div>
                        </div>
                        <div className="price-checkout">
                            <div className="price-check-left">
                                <h2>Service fee</h2>
                            </div>
                            <div className="price-check-right">
                                <h2>£2.00</h2>
                            </div>
                        </div>
                        <div className="how-works">
                            <a href="#">How fees work</a>
                        </div>
                        <div className="price-checkout">
                            <div className="price-check-left">
                                <h2>Total</h2>
                            </div>
                            <div className="price-check-right">
                                <h2>£42.48</h2>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Detail;