import React, { useState } from 'react'
import Select from 'react-select'
import Modal from "react-modal"
import "./modalview.scss"

function ModalView(props) {

    const [color, setColor] = useState([]);
    const [isSelectedColor, setSelectedColor] = useState(false)

    const listItem = (product) => {

        const items = [];

        product.color.map((c) => {
            return items.push(
                <div className={"colorOption " + (isSelectedColor && 'active')}
                    onClick={() => {
                        setColor(c)
                        setSelectedColor(true)

                    }}>{c}</div>)
        })


        console.log(color)
        return items
    }

    const addToCart = (product) => {
        const addproduct ={...product};
        addproduct.color= color;
        addproduct.qty=1;
        console.log(addproduct);

        var flag=0;
        props.cart.map((item)=>{
            console.log("22342423");
            if(item.id === addproduct.id && item.color ===addproduct.color){
                item.qty= item.qty + 1;
                console.log("duplicate order");
                flag++;
            }
        })

        if(flag ===0)
        {props.setCart([...props.cart, addproduct])}
    }

    return (
        <div className="modalContainer">

            <Modal
                isOpen={props.modal} onRequestClose={() => { props.setModal(false) }}>
                <div className="modalDetails">
                    <h2>{props.product.productName}</h2>
                    <div className="bottomPannel">
                        <div className="right">
                            <img src={props.product.img} alt="" />
                        </div>
                        <div className="left">
                            <h2>Available Color Options</h2>

                            <div className="options">


                                {props.product != "" ?
                                    listItem(props.product)

                                    : null}
                                {/* <Select
                                    // width='200px'
                                    // styles={customStyles}
                                    options={colorOpt}
                                    placeholder={"Choose Color"}
                                    value={props.product.color}
                                    // onChange={this.handleChange}
                                  
                                /> */}
                            </div>

                            <button type="submit" onClick={()=>{addToCart(props.product)
                            props.setModal(false) }}>Add to Cart</button>
                        </div>

                    </div>


                </div>
            </Modal>
        </div>
    )
}

export default ModalView
