import React from 'react'
import "./container.style.css"
import ProductCards from '../Cards/productCards'

const Container = () => {
  return (
    <div >
      <div className='banner'>
        <div className='banner-content'>
          <h2>Your everyday book store</h2>
        </div>
      </div>
      <div>
        <h2>Products:</h2>
      </div>
      <div className='container-main'>
        <div>
          <ProductCards />
        </div>
        <div>
          <ProductCards />
        </div>
        <div>
          <ProductCards />
        </div>
        <div>
          <ProductCards />
        </div>
      </div>
    </div>
  )
}

export default Container
