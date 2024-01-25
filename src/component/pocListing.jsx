import React from 'react'

const PocListing = () => {
  const products = JSON.parse(localStorage.getItem("offlineData"))
  const data = products.filter((d)=> !d.name == "")
  // const data  = [products]
  console.log({products, data});

  return (
    <>
    <div className="product-card-list">
      {data?.map((data, index) => (
        <div className="product-card" key={index}>
          <div className="product-info">
            <h3>{data.name}</h3>
            <p>{data.email}</p>
            <span className="price">{data.address}</span>
          </div>
        </div>
      ))}
    </div>
    
    </>
  )
}

export default PocListing
