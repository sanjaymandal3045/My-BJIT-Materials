import React from 'react'
import "./button.style.scss"

const Button = () => {
    return (
        <div>
            <button type="submit" className="addToCartButton">
                Add to cart
                {/* <i className="fa fa-search icon"></i> */}
            </button>
        </div>
    )
}

export default Button
