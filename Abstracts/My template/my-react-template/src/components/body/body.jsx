import { createContext, useContext, useState, useEffect } from 'react';
import Header from './header/header'
import Footer from './footer/footer'
import "./body.style.scss"

export const MyContextVariables = createContext();

const Body = ({ bookData }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);


    const addToCart = (name, price) => {
        const updatedCart = [...cart, { name, price }];
        setCart(updatedCart);
        updateTotal(calculateTotalPrice(updatedCart));
    };

    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((total, product) => total + product.price, 0);
    };

    const updateTotal = (newTotal) => {
        setTotal(newTotal);
    };

    console.log("Updated Cart:", cart, total)

    useEffect(() => {
        console.log("Updated Cart:", cart, total);
    }, [cart]);

    

    return (
        <>
            <div className='header'>
                <MyContextVariables.Provider value={{ cart, total }}>
                    <Header/>
                </MyContextVariables.Provider>
            </div>
            <div>
                <div className='temp'>
                    <div className='banner'>
                        <div className='banner-content'>
                            <h2>Your everyday book store</h2>
                        </div>
                    </div>
                    <div>
                        <h2>Products:</h2>
                    </div>
                    <div className='container-main'>
                        {bookData.length > 0 &&
                            bookData.map((card, i) => {
                                return (
                                    <div key={i}>
                                        <div className="product-card">
                                            <div className="image-container">
                                                <img
                                                    src={card.imageLink}
                                                    className="product-img"
                                                    alt={card.name}
                                                />
                                            </div>
                                            <div className="product-info">
                                                <h3>{card.name}</h3>
                                                <p className="product-description">{card.shortDescription}</p>
                                                <p className="product-price">Price: {card.price}$</p>
                                                <atcButton onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(card.name, card.price);
                                                    alert("Added to cart!");
                                                }} className="addToCartButton">Add to Cart</atcButton>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Body