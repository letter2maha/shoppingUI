import React, { useState, useEffect } from 'react'
import Counter from './Counter/Counter';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ModalView from './Modal/ModalView';
import "./productspage.css"
import Select from 'react-select';

function ProductPage() {

    const PAGE_PRODUCTS = "products";
    const PAGE_CART = "cart";
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(PAGE_PRODUCTS);
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState([]);
    // const [globalQty, setGlobalQty] = useState([0])
    const [globalCat, setGlobalCat] = useState([]);

    useEffect(() => {
        
    }, [globalCat])


    let productList = [{
        id: "1",
        productName: "iphone 12 pro",
        category: "phone",
        price: "£999",
        img: "/assets/iphone-12-pro.jpg",
        color: ["White", "Black"]
    },
    {
        id: "2",
        productName: "iphone 12 ",
        category: "phone",
        price: "£799",
        img: "/assets/iphone-12.jpg",
        color: ["Pink", "Black"]
    },

    {
        id: "3",
        productName: "iphone SE ",
        category: "phone",
        price: "£549",
        img: "/assets/iphone-se.png",
        color: ["RED", "Black"]
    },

    {
        id: "4",
        productName: "iphone 11 ",
        category: "phone",
        price: "£649",
        img: "/assets/iphone11.png",
        color: ["White", "Black"]
    },

    {
        id: "5",
        productName: "Mac Book Pro ",
        category: "Laptop",
        price: "£649",
        img: "/assets/macbook.jpg",
        color: ["Gold", "Black"]
    },

    {
        id: "6",
        productName: "iMac ",
        category: "Laptop",
        price: "£999",
        img: "/assets/imac.jpg",
        color: ["Gold", "Black"]
    }

    ]

    const options = [
        { value: '', label: 'All' },
        { value: 'Laptop', label: 'Laptop' },
        { value: 'phone', label: 'Mobile' },
    ]



    const removeCart = (removeProduct) => {
        setCart(
            cart.filter((product) => product !== removeProduct)
        )

    }

    const navigateTo = (page) => {
        setPage(page);
    }

    const showModal = (product) => {
        setModal(true);
        setProduct(product);
    }


    if(globalCat){
        productList = productList.filter((i)=>{return i.category.match(globalCat)})
                        console.log(productList)
    }


    return (
        <>

            <div className="container">
                <header onClick={() => navigateTo(PAGE_PRODUCTS)}>Product</header>

                {page === "products" &&
                <header style={{ width: '300px' }}><Select
                    placeholder="Category"
                    width="100px" 
                    options={options}
                    searchable={false}
                    onChange={(e) => {
                        console.log('e' + e.value)
                        setGlobalCat(e.value)
                        
                    }}
                /> </header> }

                <header onClick={() => navigateTo(PAGE_CART)}>
                    <ShoppingCartIcon />
                </header>

            </div>
            <ModalView
                className="Modal"
                setModal={setModal} modal={modal} product={product}
                cart={cart} setCart={setCart}
            />

            {page === "products" &&
                <div className="productpage">
                    {productList.map((product) => (
                        <div className="product">
                            <div className="productName">{product.productName}</div>
                            <img src={product.img} alt="" />
                            <div className="productPrice">{product.price}</div>
                            <button className="addCart"
                                //  onClick={()=>{addToCart(product)}}

                                onClick={() => { showModal(product) }}

                            >Add to Cart</button>

                        </div>
                    ))}
                </div>}


            {page === "cart" &&
                <div className="productpage">
                    
                    {cart.map((product) => (
                        <div className="product">
                            <div className="productName">{product.productName}</div>
                            <img src={product.img} alt="" />
                            <div className="productPrice">Price: {product.price}</div>
                            {/* <div className="qantity">Quantity: {product.qty}</div> */}
                            <Counter qty={product.qty} product={product} setProduct={setProduct} />
                            <button className="addCart" onClick={() => removeCart(product)}>Remove</button>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default ProductPage
