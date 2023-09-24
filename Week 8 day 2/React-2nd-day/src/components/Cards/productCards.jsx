import React from 'react';
import './productCards.style.css';
import Button from '../buttons/button';

const ProductCards = () => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src="https://m.media-amazon.com/images/M/MV5BNDU0OGY4ZjUtZDFmMS00Y2M1LTg5NTUtYjRiZTY0OTdjYWFmXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
          className="product-img"
          alt="RTX 4090"
        />
      </div>
      <div className="product-info">
        <h3>Berserk</h3>
        <p className="product-description">The greatest manga of all time.</p>
        <p className="product-price">Price: 9$</p>
        <Button />
      </div>
    </div>
  );
};

export default ProductCards;
