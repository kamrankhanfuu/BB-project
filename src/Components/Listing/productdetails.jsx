import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation,useParams } from 'react-router-dom';
import queryString from 'query-string';
import "../../Assets/css/style.css"
 

export default class productdetails extends React.Component{
 constructor({ match, ...props })
 {
     super();
     const queryParams = new URLSearchParams(window.location.search);
     const id = queryParams.get('id');
     console.log(id)
     this.state={
      ProductID:id,
      productName:null,
      desc:null,

     }
 }
 componentDidMount()
 {
    fetch("https://fakestoreapi.com/products/1")
    .then(res => res.json())
    .then(
      (result) => {
          console.log(result);
        this.setState({
          
            productName: result.title,
            desc:result.description,
        });

        console.log(this.state.productItemslist);
      },
       (error) => {
        
      }
    )
   
 }
    
    render() {

      //  const { ProductId } = this.props.match.params.id;

        return <div>
        <section className="details-outer details-outer2">
        <div className="bg-image">
      
          
        </div>
        <div className="auto-container pt">
          <div className="details-left-outer">
            <div className="details-breadcrumb">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Kilburn</a></li>
                <li>German Doner Kebab</li>
              </ul>
            </div>
             <div className="details-delivery-outer">
              <div className="main-left_image_section">
                <div className="left-img">
                  <span><img src="images/product01.jpg" alt="" /></span>
                </div>
                <div className="right-txt">
              
              
               <div className="details-post-content details-post-content2">
              <h1>{this.state.productName}</h1>
              <h2>4.5 (500+ rating)</h2>
              
              <p>{this.state.desc}</p>
            </div>
            </div>
            </div>
              <div className="listing-inner-top listing-inner-top2">
                <h2>Deliver in 10 - 20 min<br/>
                  <strong>Priory Park Rd, North Maida Vale, London NW6 7GZ, UK</strong></h2>
                <a href="#">Change</a>
                 </div>
            </div>
           
            <div className="details-tabs-content">
              <div className="tabs">
                <ul className="tabs-nav media-img">
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
                  
                </ul>
                <div className="tabs-stage">
                  <div id="tab-1" className="tabs-con">
                    <h2>Boss Box</h2>
                    <ul>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            
                        <div className="product-img-pop">
                        <img src="images/product06.jpg" alt="" />
                        </div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html" />
                                  <div className="form-groupeee">
                                    <label for="html">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html2" />
                                  <div className="form-groupeee">
                                    <label for="html2">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html3"/>
                                  <div className="form-groupeee">
                                    <label for="html3">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html4"/>
                                  <div className="form-groupeee">
                                    <label for="html4">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html5"/>
                                  <div className="form-groupeee">
                                    <label for="html5">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html6"/>
                                  <div className="form-groupeee">
                                    <label for="html6">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html7"/>
                                  <div className="form-groupeee">
                                    <label for="html7">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html8"/>
                                  <div className="form-groupeee">
                                    <label for="html8">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html9"/>
                                  <div className="form-groupeee">
                                    <label for="html9">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html10"/>
                                  <div className="form-groupeee">
                                    <label for="html10">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html11"/>
                                  <div className="form-groupeee">
                                    <label for="html11">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html12"/>
                                  <div className="form-groupeee">
                                    <label for="html12">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html13"/>
                                  <div className="form-groupeee">
                                    <label for="html13">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html14"/>
                                  <div className="form-groupeee">
                                    <label for="html14">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html15"/>
                                  <div className="form-groupeee">
                                    <label for="html15">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html16"/>
                                  <div className="form-groupeee">
                                    <label for="html16">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html17"/>
                                  <div className="form-groupeee">
                                    <label for="html17">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1"/>
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html18" />
                                  <div className="form-groupeee">
                                    <label for="html18">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html19"/>
                                  <div className="form-groupeee">
                                    <label for="html19">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html20"/>
                                  <div className="form-groupeee">
                                    <label for="html20">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html21"/>
                                  <div className="form-groupeee">
                                    <label for="html21">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html22"/>
                                  <div className="form-groupeee">
                                    <label for="html22">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html23"/>
                                  <div className="form-groupeee">
                                    <label for="html23">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html24"/>
                                  <div className="form-groupeee">
                                    <label for="html24">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html25"/>
                                  <div className="form-groupeee">
                                    <label for="html25">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html26"/>
                                  <div className="form-groupeee">
                                    <label for="html26">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html27"/>
                                  <div className="form-groupeee">
                                    <label for="html27">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html28"/>
                                  <div className="form-groupeee">
                                    <label for="html28">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html29"/>
                                  <div className="form-groupeee">
                                    <label for="html29">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html30"/>
                                  <div className="form-groupeee">
                                    <label for="html30">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div id="tab-2" className="tabs-con">
                    <h2>A La Carte </h2>
                    <ul>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html31"/>
                                  <div className="form-groupeee">
                                    <label for="html31">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html32"/>
                                  <div className="form-groupeee">
                                    <label for="html32">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html33"/>
                                  <div className="form-groupeee">
                                    <label for="html33">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html34"/>
                                  <div className="form-groupeee">
                                    <label for="html34">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html35"/>
                                  <div className="form-groupeee">
                                    <label for="html35">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html36"/>
                                  <div className="form-groupeee">
                                    <label for="html36">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html37"/>
                                  <div className="form-groupeee">
                                    <label for="html37">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html38"/>
                                  <div className="form-groupeee">
                                    <label for="html38">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html39"/>
                                  <div className="form-groupeee">
                                    <label for="html39">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html40"/>
                                  <div className="form-groupeee">
                                    <label for="html40">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html41"/>
                                  <div className="form-groupeee">
                                    <label for="html41">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html42"/>
                                  <div className="form-groupeee">
                                    <label for="html42">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html43"/>
                                  <div className="form-groupeee">
                                    <label for="html43">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html44"/>
                                  <div className="form-groupeee">
                                    <label for="html44">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html45"/>
                                  <div className="form-groupeee">
                                    <label for="html45">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html46"/>
                                  <div className="form-groupeee">
                                    <label for="html46">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html47"/>
                                  <div className="form-groupeee">
                                    <label for="html47">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html48"/>
                                  <div className="form-groupeee">
                                    <label for="html48">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html49"/>
                                  <div className="form-groupeee">
                                    <label for="html49">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html50"/>
                                  <div className="form-groupeee">
                                    <label for="html50">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
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
                                    <label for="html51">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html52"/>
                                  <div className="form-groupeee">
                                    <label for="html52">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html53"/>
                                  <div className="form-groupeee">
                                    <label for="html53">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html54"/>
                                  <div className="form-groupeee">
                                    <label for="html54">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html55"/>
                                  <div className="form-groupeee">
                                    <label for="html55">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html56"/>
                                  <div className="form-groupeee">
                                    <label for="html56">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html57"/>
                                  <div className="form-groupeee">
                                    <label for="html57">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html58"/>
                                  <div className="form-groupeee">
                                    <label for="html58">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html59"/>
                                  <div className="form-groupeee">
                                    <label for="html59">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html60"/>
                                  <div className="form-groupeee">
                                    <label for="html60">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div id="tab-3" className="tabs-con">
                    <h2>Nibbles </h2>
                    <ul>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html61"/>
                                  <div className="form-groupeee">
                                    <label for="html61">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html62"/>
                                  <div className="form-groupeee">
                                    <label for="html62">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html63"/>
                                  <div className="form-groupeee">
                                    <label for="html63">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html64"/>
                                  <div className="form-groupeee">
                                    <label for="html64">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html65"/>
                                  <div className="form-groupeee">
                                    <label for="html65">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html66"/>
                                  <div className="form-groupeee">
                                    <label for="html66">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html67"/>
                                  <div className="form-groupeee">
                                    <label for="html67">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html68"/>
                                  <div className="form-groupeee">
                                    <label for="html68">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html69"/>
                                  <div className="form-groupeee">
                                    <label for="html69">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html70"/>
                                  <div className="form-groupeee">
                                    <label for="html70">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html71"/>
                                  <div className="form-groupeee"/>
                                      <label for="html71">Red Wine 70cl </label>
                                            <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                            <input type="text" className="qtyValue" value="1" />
                                            <i className="fa fa-plus increaseQty"></i>
                                            </div>
                                    </div>
                                
                                <div className="form-group">
                                  <input type="checkbox" id="html72"/>
                                  <div className="form-groupeee">
                                    <label for="html72">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html73"/>
                                  <div className="form-groupeee">
                                    <label for="html73">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html74"/>
                                  <div className="form-groupeee">
                                    <label for="html74">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html75" />
                                  <div className="form-groupeee">
                                    <label for="html75">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html76"/>
                                  <div className="form-groupeee">
                                    <label for="html76">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html77"/>
                                  <div className="form-groupeee">
                                    <label for="html77">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html78"/>
                                  <div className="form-groupeee">
                                    <label for="html78">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html79"/>
                                  <div className="form-groupeee">
                                    <label for="html79">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html80"/>
                                  <div className="form-groupeee">
                                    <label for="html80">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html81"/>
                                  <div className="form-groupeee">
                                    <label for="html81">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html82"/>
                                  <div className="form-groupeee">
                                    <label for="html82">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html83"/>
                                  <div className="form-groupeee">
                                    <label for="html83">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html84"/>
                                  <div className="form-groupeee">
                                    <label for="html84">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html85"/>
                                  <div className="form-groupeee">
                                    <label for="html85">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html86"/>
                                  <div className="form-groupeee">
                                    <label for="html86">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html87"/>
                                  <div className="form-groupeee">
                                    <label for="html87">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html88"/>
                                  <div className="form-groupeee">
                                    <label for="html88">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html89"/>
                                  <div className="form-groupeee">
                                    <label for="html89">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html90"/>
                                  <div className="form-groupeee">
                                    <label for="html90">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div id="tab-4" className="tabs-con">
                    <h2>Doner Boxes</h2>
                    <ul>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product04.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html91"/>
                                  <div className="form-groupeee">
                                    <label for="html91">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html92"/>
                                  <div className="form-groupeee">
                                    <label for="html92">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html93"/>
                                  <div className="form-groupeee">
                                    <label for="html93">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html94"/>
                                  <div className="form-groupeee">
                                    <label for="html94">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html95"/>
                                  <div className="form-groupeee">
                                    <label for="html95">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html96"/>
                                  <div className="form-groupeee">
                                    <label for="html96">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html97"/>
                                  <div className="form-groupeee">
                                    <label for="html97">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html98"/>
                                  <div className="form-groupeee">
                                    <label for="html98">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html99"/>
                                  <div className="form-groupeee">
                                    <label for="html99">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html100"/>
                                  <div className="form-groupeee">
                                    <label for="html100">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html101"/>
                                  <div className="form-groupeee">
                                    <label for="html101">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html102"/>
                                  <div className="form-groupeee">
                                    <label for="html102">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html103"/>
                                  <div className="form-groupeee">
                                    <label for="html103">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html104"/>
                                  <div className="form-groupeee">
                                    <label for="html104">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html105"/>
                                  <div className="form-groupeee">
                                    <label for="html105">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html106"/>
                                  <div className="form-groupeee">
                                    <label for="html106">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html107"/>
                                  <div className="form-groupeee">
                                    <label for="html107">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html108"/>
                                  <div className="form-groupeee">
                                    <label for="html108">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html109"/>
                                  <div className="form-groupeee">
                                    <label for="html109">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html110"/>
                                  <div className="form-groupeee">
                                    <label for="html110">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html111"/>
                                  <div className="form-groupeee">
                                    <label for="html111">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html112"/>
                                  <div className="form-groupeee">
                                    <label for="html112">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html113"/>
                                  <div className="form-groupeee">
                                    <label for="html113">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html114"/>
                                  <div className="form-groupeee">
                                    <label for="html114">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html115"/>
                                  <div className="form-groupeee">
                                    <label for="html115">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
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
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html116"/>
                                  <div className="form-groupeee">
                                    <label for="html116">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html117"/>
                                  <div className="form-groupeee">
                                    <label for="html117">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html118"/>
                                  <div className="form-groupeee">
                                    <label for="html118">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html119"/>
                                  <div className="form-groupeee">
                                    <label for="html119">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html120"/>
                                  <div className="form-groupeee">
                                    <label for="html120">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div id="tab-5" className="tabs-con">
                    <h2>Junior Meal Deals</h2>
                    <ul>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html121"/>
                                  <div className="form-groupeee">
                                    <label for="html121">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html122"/>
                                  <div className="form-groupeee">
                                    <label for="html122">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html123"/>
                                  <div className="form-groupeee">
                                    <label for="html123">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html124"/>
                                  <div className="form-groupeee">
                                    <label for="html124">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html125"/>
                                  <div className="form-groupeee">
                                    <label for="html125">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html126"/>
                                  <div className="form-groupeee">
                                    <label for="html126">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html127"/>
                                  <div className="form-groupeee">
                                    <label for="html127">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html128"/>
                                  <div className="form-groupeee">
                                    <label for="html128">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html129"/>
                                  <div className="form-groupeee">
                                    <label for="html129">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html130"/>
                                  <div className="form-groupeee">
                                    <label for="html130">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html131"/>
                                  <div className="form-groupeee">
                                    <label for="html131">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html132"/>
                                  <div className="form-groupeee">
                                    <label for="html132">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html133"/>
                                  <div className="form-groupeee">
                                    <label for="html133">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html134"/>
                                  <div className="form-groupeee">
                                    <label for="html134">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html135"/>
                                  <div className="form-groupeee">
                                    <label for="html135">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html136"/>
                                  <div className="form-groupeee">
                                    <label for="html136">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html137"/>
                                  <div className="form-groupeee">
                                    <label for="html137">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html138"/>
                                  <div className="form-groupeee">
                                    <label for="html138">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html139"/>
                                  <div className="form-groupeee">
                                    <label for="html139">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html140"/>
                                  <div className="form-groupeee">
                                    <label for="html140">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html141"/>
                                  <div className="form-groupeee">
                                    <label for="html141">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html142"/>
                                  <div className="form-groupeee">
                                    <label for="html142">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html143"/>
                                  <div className="form-groupeee">
                                    <label for="html143">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html144"/>
                                  <div className="form-groupeee">
                                    <label for="html144">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html145"/>
                                  <div className="form-groupeee">
                                    <label for="html145">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                      <li className="popup_main">
                        <button className="open_popup"><span><img src="images/product06.jpg" alt="" /></span> <strong className="tabs-content-inner">
                        <h3>The Original German Doner Kebab</h3>
                        <p>Our Trademark kebab sandwich, a must try! Your choice of done...</p>
                        <h4>£ 6.99 </h4>
                        </strong></button>
                        <div className="popup_body">
                          <div className="popup_back"></div>
                          <div className="popup_contain">
                            <div className="popup_close">x</div>
                            <h3>The Original German Doner Kebab</h3>
                            <h4>Choice of any 2 wine</h4>
                            <p>Allergen information unavailable.</p>
                            <div className="popupcheck">
                              <form>
                                <div className="form-group">
                                  <input type="checkbox" id="html146"/>
                                  <div className="form-groupeee">
                                    <label for="html146">Red Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html147"/>
                                  <div className="form-groupeee">
                                    <label for="html147">White wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html148"/>
                                  <div className="form-groupeee">
                                    <label for="html148">Rose wine 75 cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html149"/>
                                  <div className="form-groupeee">
                                    <label for="html149">Blossom Hill Rose Wine 70cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <input type="checkbox" id="html150"/>
                                  <div className="form-groupeee">
                                    <label for="html150">Prosecco 75cl </label>
                                    <div className="qtySelector text-center"> <i className="fa fa-minus decreaseQty"></i>
                                      <input type="text" className="qtyValue" value="1" />
                                      <i className="fa fa-plus increaseQty"></i> </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <a href="#" className="cacel-btn">Cancel</a> <a href="#" className="cacel-btn">£32.50 <span>Add for £64.99</span></a> </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="details-right-outer">
           
          
          
            <div className="empty-outer media-img">
              <div className="price-checkout">
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
              
              </div>
              
              
            </div>
              <div className="order-btn"> <a href="#">Go to Checkout</a> </div>
          </div>
        </div>
      </section>
        </div>
      }
}