import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';

import { Link } from 'react-router-dom'

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch('https://route-ecommerce.onrender.com/api/v1/categories')
      .then(response => response.json())
      .then(data => setCategories(data.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetch(`https://route-ecommerce.onrender.com/api/v1/categories/${category._id}/subcategories`)
      .then(response => response.json())
      .then(data => setSubcategories(data.data))
      .catch(error => console.error('Error fetching subcategories:', error));
    const modal = new Modal(document.getElementById('subcategoryModal'));
    modal.show();
  };

  return (
    <>
    <Helmet>
        <title>Category component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
    <div className="container ">
      <div className="row">
        {categories.map((category) => (
          <div className="col-md-4" key={category._id}>
            <div className="card category-card my-3 cursor-pointer text-center " onClick={() => handleCategoryClick(category)}>
              <img src={category.image} className="card-img-top w-100" style={{ height: '400px' }} alt="..." />
              <div className="card-body">
                <h2 className='new-color fw-bolder'>{category.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="modal fade" id="subcategoryModal" tabIndex="-1" aria-labelledby="subcategoryModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title new-color fw-bolder" id="subcategoryModalLabel">{selectedCategory?.name} Subcategories</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul>
                {subcategories.map(subcategory => (
                  <li className='fs-5' key={subcategory._id}>{subcategory.slug}</li>
                ))}
              </ul>
              <button type="button" className="btn btn-secondary mt-3" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
}
