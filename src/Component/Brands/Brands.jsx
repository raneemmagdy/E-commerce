import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [brands, setbrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  
  useEffect(() => {
  
    fetch('https://route-ecommerce.onrender.com/api/v1/brands')
      .then(response => response.json())
      .then(data => setbrands(data.data)) 
      .catch(error => console.error('Error fetching brands:', error));
  }, []);


 
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    const modal = new Modal(document.getElementById('brandModal'));
    modal.show();
  };

  return (<>
    <Helmet>
        <title>Brand component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
    <div>
    <h1 className="text-main text-center fw-bolder">All Brands</h1>
    <div className="container text-center">
      <div className="row">
        {brands.map((brand) => (
          <div className="col-md-3" key={brand._id}>
            <div className="brand-card card my-2" onClick={() => handleBrandClick(brand)}>
              <img src={brand.image} className="w-100 h-25 rounded-5" alt={brand.name} />
              <h2 className='fs-5'>{brand.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Modal */}
    <div className="modal fade" id="brandModal" tabIndex="-1" aria-labelledby="brandModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
           
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">

            <div className="col-md-6 d-flex flex-column justify-content-center">
                <h2 className='fw-bolder text-main'>{selectedBrand?.name}</h2>
                <h5>{selectedBrand?.slug}</h5>
                
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center">
                <img src={selectedBrand?.image} className="w-100 rounded-5" alt={selectedBrand?.name} />
                <button type="button" className="btn btn-secondary mt-3 align-self-end" data-bs-dismiss="modal">Close</button>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></>
);
}
