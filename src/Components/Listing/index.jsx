import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ApiCalls from '../../Helpers/Api/home';
 import Product from '../Listing/productlist.jsx';
 import Service from '../Listing/servicelist.jsx';

export default class Listing extends React.Component{
   
    state = {
        countryState:'',
        category:'', 
        zipCode:'',
        //inputVal : this.props.location.state.inputVal,
        mainList:[],
        list:[],
        priceRange:0, 
        selectedOption:0,
        prop: this.props.location.state,
        productItemslist: [{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}},{"id":2,"title":"Mens Casual Premium Slim Fit T-Shirts ","price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.","category":"men's clothing","image":"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg","rating":{"rate":4.1,"count":"259"}}],
        isLoaded:false
    };
   
    async componentDidMount(){
        try {

            fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(
              (result) => {
                  console.log(result);
                this.setState({
                    isLoaded: true,
                    productItemslist: result
                });

                console.log(this.state.productItemslist);
              },
               (error) => {
                
              }
            )
            const search = this.props.location.search;
            this.setState( {countryState: new URLSearchParams(search).get("state")});
            this.setState( {category: new URLSearchParams(search).get("category")});
            this.setState( {zipCode: new URLSearchParams(search).get("zipcode")});
            const response = await ApiCalls.searchProducts(new URLSearchParams(search).get("state"), new URLSearchParams(search).get("category"));
            
            this.setState({list:response});
            this.setState({mainList:response});
            
           
         } catch (error) {
             console.error("handleChange -> error", error);
         };
        //  console.log(this.state.list[0])
    }

  

    render(){
     
      
        const filterData = async (id, category) => 
        {
            if(id != 0)
            {
            const result = this.state.mainList.filter(x => x.productCategoryId === id);
            window.history.replaceState(null, '', `listing?state=${this.state.countryState}&category=${category}&zipcode=null`);
            this.setState({category:category})
            //const response = await ApiCalls.searchProducts({id:id, text:this.state.inputVal});
            this.setState({list:result});
           
            }
            else{
                this.setState({list:this.state.mainList})
               
            }
            this.setState({selectedOption: id});
            this.setState({priceRange:0})
        }
        const priceFilter = async (price) => 
        {
            //const response = await ApiCalls.searchProducts({id:0, text:this.state.inputVal, priceRange:price});
            if(this.state.selectedOption !=0)
            {
                this.setState({list:this.state.mainList.filter(x => x.sellingPrice <= price && x.productCategoryId == this.state.selectedOption)});
            }else
            {
                this.setState({list:this.state.mainList.filter(x => x.sellingPrice <= price)})
            }
            // this.setState({list:result});
        }
        const searchByName = async (e)=> {
            var result = this.state.mainList.filter(x => x.productName.toLowerCase().includes(e.target.value.toLowerCase()));
            this.setState({list:result});
        }
        return(
            <div className="full-width">

             <section className="listing-outer">
                <div className="auto-container">
                       
                     <div className="listing-left">

                         <div className="listing-inner-top">
                             <h2>Now<br /><strong>Kilburn</strong></h2>
                             <a href="javascript:void(0);">Category</a>
                         </div>
                         <div className="listing-inner-filter">

                         <input type="radio"
                                   name="common-radio-name"
                                   id="radio-all"
                                   value = {0}
                                   className="radio-button" defaultChecked = {this.state.selectedOption===0} onClick={() => filterData(0, "all")} />
                               <label htmlFor="radio-all"
                                   className="radio-button-click-target">
                                   <span className="radio-button-circle"></span>All
                                 </label>
                                 <br />
                        {
                            
                            this.state.mainList.length != 0 ?
                             this.state.mainList[0].productCategories.map((x) =>(
                                <>
                                
                                {/* <form> */}
                         
                                <input type="radio"
                                  name="common-radio-name"
                                   id={"radio-" + x.id}
                                   value = {x.id}
                                   checked = {this.state.selectedOption===x.id}
                                   className="radio-button" onClick={() => filterData(x.id, x.categoryName)} />
                               <label htmlFor={"radio-" + x.id}
                                   className="radio-button-click-target"  >
                                   <span className="radio-button-circle"></span>{x.categoryName}
                                  </label>
                                 <br />
                                {/* </form> */}
                                </>)):<></>
                            
                           
                        }
                      
                        <div className="listing-inner-top">
                             
                             <a href="javascript:void(0);" style={{marginBottom:'5px'}}>Price Ranges</a>
                         </div>
                                <label style={{ padding: '0' }} className="radio-button-click-target">{this.state.priceRange}</label>  <br />
                                <input type="range"
                                    name="priceRange"
                                    id="priceRange"
                                    min='0'
                                    max='5000'
                                    value={this.state.priceRange}
                                    onChange={(e) => {this.setState({ priceRange: e.target.value }); priceFilter(e.target.value)}}
                                />
                        </div>
                    </div>

                    <div className="listing-right">

                  
                                
                    
                        {/* <div className="listing-right-inner">
                            <h2>Delivering to Kilburn</h2>

                            <div className="listing-slider owl-carousel1">

                                <div className="owl-carousel owl-theme">
                                    <div className="item">
                                        <Link to="/detail">
                                            <div className="food-category">
                                                <img src={require("../../Assets/images/category01.jpg").default} alt="" />
                                                <h3>Pizza</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="item">
                                        <div className="food-category">
                                            <img src={require("../../Assets/images/category02.jpg").default} alt="" />
                                            <h3>Grocery</h3>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="food-category">
                                            <img src={require("../../Assets/images/category03.jpg").default} alt="" />
                                            <h3>Chinese</h3>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="food-category">
                                            <img src={require("../../Assets/images/category04.jpg").default} alt="" />
                                            <h3>Burgers</h3>
                                        </div>
                                    </div> 
                                    
                                </div>


                            </div>

                            <div className="listing-slider listing-offers-slider owl-carousel2">

                                <div className="owl-carousel owl-theme">
                                    <div className="item">
                                        <div className="fine-category">

                                            <img src={require("../../Assets/images/fine-dining.jpg").default} alt="" />
                                            <div className="fine-category-inner">
                                                <h3>Fine Dining</h3>
                                                <p>Exquisite food, bold flavours and Michelin stars.</p>
                                                <a href="javascript:void(0);">View options</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="fine-category">
                                            <img src={require("../../Assets/images/fine-dining.jpg").default} alt="" />
                                            <div className="fine-category-inner">
                                                <h3>Fine Dining</h3>
                                                <p>Exquisite food, bold flavours and Michelin stars.</p>
                                                <a href="javascript:void(0);">View options</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="fine-category">
                                            <img src={require("../../Assets/images/fine-dining.jpg").default} alt="" />
                                            <div className="fine-category-inner">
                                                <h3>Fine Dining</h3>
                                                <p>Exquisite food, bold flavours and Michelin stars.</p>
                                                <a href="javascript:void(0);">View options</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="fine-category">
                                            <img src={require("../../Assets/images/fine-dining.jpg").default} alt="" />
                                            <div className="fine-category-inner">
                                                <h3>Fine Dining</h3>
                                                <p>Exquisite food, bold flavours and Michelin stars.</p>
                                                <a href="javascript:void(0);">View options</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            <div className="search-outer">
                                <input style={{width:'30%'}} id="searchBox" type="text" className="search-banner" placeholder="Search By Name" onChange={searchByName} autoComplete='off' />

                            </div>
                        <div className="products-outer">
                       
                       {/* <div style={{textAlign:'center'}}>
                           <button  className="seacrh-btn">Product</button>
                           <button  className="seacrh-btn">Services</button>
                       </div> */}
                            <h2>Products <span><a style={{cursor:'pointer'}} onClick = {() => { this.props.history.push({ pathname: "/" + this.state.prop.urlCountry+"/viewall"  , state: {list:this.state.list.filter(x => x.type == "G") , urlCountry:this.state.prop.urlCountry, inputVal:this.state.inputVal}})}}> View all ({this.state.list.filter(x => x.type == "G").length})</a></span></h2>

                            <div className="products-outer-slider listing-slider">
                                <div className="owl-carousel owl-theme">
                                // {
                                            
                                // this.state.list.filter(x => x.type == "G").slice(0,8).map( (record,i) => (
                                //     <Product product = {record} mainList = {this.state.mainList} searchValue = {this.state.countryState} urlCountry = "PK"/>
                            
                                //                 )
                                //             )
                                //     } 
                                 
                             
                             
                              
                      
                        this.state.productItemslist.map(item => (
                                     <div className="item"  key={item.id} >
                                        <div className="products-category">
                                            <div className="products-img">
                                                <img src={require("../../Assets/images/product03.jpg").default} alt="" />
                                            </div>
                                            <div className="products-content">
                                                <h3>Tossed </h3>
                                                <p>{item.title}</p>
                                                <h4>1.6 miles away, Free delivery</h4>
                                                <h5>30 - 50 min</h5>

                                                <h6 className="delivery-price">£{item.price}<br /> delivery</h6>

                                                <a href="javascript:void(0);">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                             
                         
                                   {/* <div className="item">
                                        <div className="products-category">
                                            <div className="products-img">
                                                <img src={require("../../Assets/images/product03.jpg").default} alt="" />
                                            </div>
                                            <div className="products-content">
                                                <h3>Tossed </h3>
                                                <p>Chicken, Salads, Healthy, Juices</p>
                                                <h4>1.6 miles away, Free delivery</h4>
                                                <h5>30 - 50 min</h5>
                                                <h6 className="delivery-price">£1.99<br /> delivery</h6>
                                                <a href="javascript:void(0);">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="products-category">
                                            <div className="products-img">
                                                <img src={require("../../Assets/images/product03.jpg").default} alt="" />
                                            </div>
                                            <div className="products-content">
                                                <h3>Tossed </h3>
                                                <p>Chicken, Salads, Healthy, Juices</p>
                                                <h4>1.6 miles away, Free delivery</h4>
                                                <h5>30 - 50 min</h5>
                                                <h6 className="delivery-price">£1.99<br /> delivery</h6>
                                                <a href="javascript:void(0);">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="products-category">
                                            <div className="products-img">
                                                <img src={require("../../Assets/images/product03.jpg").default} alt="" />
                                            </div>
                                            <div className="products-content">
                                                <h3>Tossed </h3>
                                                <p>Chicken, Salads, Healthy, Juices</p>
                                                <h4>1.6 miles away, Free delivery</h4>
                                                <h5>30 - 50 min</h5>
                                                <h6 className="delivery-price">£1.99<br /> delivery</h6>
                                                <a href="javascript:void(0);">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div> */}
                                     
                                </div>
                            </div>


                        </div>


                        <div className="products-outer">
                        <h2>Services <span><a style={{cursor:'pointer'}} onClick = {() => { this.props.history.push({ pathname: "/" + this.state.prop.urlCountry + "/viewall", state: {list:this.state.list.filter(x => x.type == "S") , urlCountry :this.state.prop.urlCountry, inputVal:this.state.inputVal}})}}> View all ({this.state.list.filter(x => x.type == "S").length})</a></span></h2>
                           

                            <div className="products-outer-slider listing-slider">
                                <div className="owl-carousel owl-theme">

                                {
                // this.state.list.filter(x => x.type == "S").slice(0,8).map((record,i) =>(
                //     <Service service = {record} mainList = {this.state.mainList} searchValue = {this.state.inputVal} urlCountry = {this.state.prop.urlCountry}/>
                
                //      )
                // )
           }






{/* 
                                    <div className="item">
                                        <div className="products-category">
                                            <div className="products-img">
                                                <img src={require("../../Assets/images/product03.jpg").default} alt="" />
                                            </div>
                                            <div className="products-content">
                                                <h3>Tossed </h3>
                                                <p>Chicken, Salads, Healthy, Juices</p>
                                                <h4>1.6 miles away, Free delivery</h4>
                                                <h5>30 - 50 min</h5>
                                                <a href="javascript:void(0);">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="products-category">
                                            <div className="products-img">
                                                <img src={require("../../Assets/images/product03.jpg").default} alt="" />
                                            </div>
                                            <div className="products-content">
                                                <h3>Tossed </h3>
                                                <p>Chicken, Salads, Healthy, Juices</p>
                                                <h4>1.6 miles away, Free delivery</h4>
                                                <h5>30 - 50 min</h5>
                                                <a href="javascript:void(0);">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="products-category">
                                            <div className="products-img">
                                                <img src={require("../../Assets/images/product03.jpg").default} alt="" />
                                            </div>
                                            <div className="products-content">
                                                <h3>Tossed </h3>
                                                <p>Chicken, Salads, Healthy, Juices</p>
                                                <h4>1.6 miles away, Free delivery</h4>
                                                <h5>30 - 50 min</h5>
                                                <a href="javascript:void(0);">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="products-category">
                                            <div className="products-img">
                                                <img src={require("../../Assets/images/product03.jpg").default} alt="" />
                                            </div>
                                            <div className="products-content">
                                                <h3>Tossed </h3>
                                                <p>Chicken, Salads, Healthy, Juices</p>
                                                <h4>1.6 miles away, Free delivery</h4>
                                                <h5>30 - 50 min</h5>
                                                <a href="javascript:void(0);">Add to Cart</a>
                                            </div>
                                        </div>
                                    </div> */}
                                   
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </section>
        </div>
        )
    }
}











// export default function Listing(props) {
//     const [list, setlist] = useState([]);
//     const [serviceslist, setserviceslist] = useState([]);
//     const [productlist, setproductlist] = useState([]);
//     useEffect(async()=>{
//        await  handleChange();
//         separatelist();
//       },[])
//     const handleChange = async () => {
//         var inputVal = props.location.state.inputVal;
//             try {
//                const response = await ApiCalls.searchProducts(inputVal);
//                setlist(response);
//                console.log(list);
//             } catch (error) {
//                 console.error("handleChange -> error", error);

//             };
//     }
//     const separatelist = () =>{
//         setproductlist(list.filter(x => x.type == "G"));
//         setserviceslist(list.filter(x => x.type == "S"));
//     }
   
//     return (

//        
//     )
// }
