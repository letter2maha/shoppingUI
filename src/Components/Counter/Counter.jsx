import React, { useState } from "react";
import "./counter.scss"
function Counter(props) {
    // Set the initial count state to zero, 0
    const [count, setCount] = useState(props.product.qty);
    const [isDisabled, setIsDisabled] = useState(true)

    // Create handleIncrement event handler
    const handleIncrement = () => {
        if (count < 2) {
            setIsDisabled(true)
        }
        else
            setIsDisabled(false)
        setCount(prevCount => prevCount + 1);
        console.log("props.product")
        props.product.qty = props.product.qty + 1;
        console.log(props.product)


    };

    //Create handleDecrement event handler
    const handleDecrement = () => {
        if (count === 1) {
            setIsDisabled(true)
        }
        else {
            setIsDisabled(false)
            props.product.qty = props.product.qty - 1;
            setCount(prevCount => prevCount - 1);
            if (count === 1) {
                setIsDisabled(true)
            }
        }
    };
    return (
        <div>
            <div className="counterDiv">
                <h5>Quanity is {count}</h5>
                <button disabled={count <= 1 && isDisabled} onClick={handleDecrement}>-</button>
                <button onClick={handleIncrement}>+</button>
            </div>

        </div>
    );
}

export default Counter;