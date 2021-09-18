import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ViewAll(props) {
    
    const prop = props.location.state;
    const mainList = prop.list;
    const [list, setList] = useState(prop.list);
    const [selectedOption, setSelectedOption] = useState(0);
    const [priceRange, setPriceRange] = useState(0);
    const filterData = async (id) => {
        if (id != 0) {
            const result = mainList.filter(x => x.productCategoryId === id);
            setList(result);
        }
        else {
            setList(mainList)
        }
        setSelectedOption(id);
        setPriceRange(0);


    }
    const priceFilter = async (price) => {
        if(selectedOption !=0)
        {
            setList( mainList.filter(x => x.sellingPrice <= price && x.productCategoryId == selectedOption));
        }
        else{
            setList( mainList.filter(x => x.sellingPrice <= price));
           
        }
    }
    return (
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
                                value={0}
                                className="radio-button" checked={selectedOption === 0} onClick={() => filterData(0)} />
                            <label for="radio-all"
                                className="radio-button-click-target">
                                <span className="radio-button-circle"></span>All
                            </label>
                            <br />
                            {

                                mainList.length != 0 ?
                                    mainList[0].productCategories.map((x) => (
                                        <>
                                            <input type="radio"
                                                name="common-radio-name"
                                                id={"radio-" + x.id}
                                                value={x.id}
                                                checked={selectedOption === x.id}
                                                className="radio-button" onClick={() => filterData(x.id)} />
                                            <label for={"radio-" + x.id}
                                                className="radio-button-click-target"  >
                                                <span className="radio-button-circle"></span>{x.categoryName}
                                            </label>
                                            <br />
                                        </>)) : <></>
                            }

                            <div className="listing-inner-top">

                                <a href="javascript:void(0);" style={{ marginBottom: '5px' }}>Price Ranges</a>
                            </div>
                            <label style={{ padding: '0' }} className="radio-button-click-target">{priceRange}</label>  <br />
                            <input type="range"
                                name="priceRange"
                                id="priceRange"
                                min='0'
                                max='5000'
                                value={priceRange}
                                onChange={(e) => { setPriceRange(e.target.value); priceFilter(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="listing-right" >
                        <div style={{ padding: 'none' }} className="products-outer">
                            <div style={{ padding: '50px' }} className="products-outer-slider listing-slider">
                                <div className="owl-carousel owl-theme">
                                    {
                                        list.length > 0 ?
                                            list.map((record, i) => (
                                                <>
                                                    <div className="item" key={i}>
                                                        <div className="products-category">
                                                            <div className="products-img" style={{ textAlign: "center", backgroundColor: "white", border: "1px solid #eee", borderBottom: "none" }}>
                                                                <img src={record.imagesURL === null ? require("../../Assets/images/NoImage.png").default : record.imagesURL} alt="" />
                                                            </div>
                                                            <div className="products-content">
                                                       
                                                                <h3 style={{ fontSize: "medium" }}>{record.productName.substring(0, 20)} </h3>
                                                                <h3 style={{ fontSize: "small", color: 'blue' }}>{record.companyName.substring(0, 30)} </h3>
                                                                <p>{record.countryName} <span>( )</span></p>
                                                                <h4>{record.currency} {record.sellingPrice}</h4>
                                                                <Link to={{ pathname: "/"+ prop.urlCountry + `/detail`, state: { record: record, list: list , urlCountry : prop.urlCountry , searchValue: prop.inputVal} }}>View Detail</Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                            ) : <><h1 style={{ textAlign: 'center', color: '#03989e', fontSize: '30px' }}>Record Not Found</h1></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}



