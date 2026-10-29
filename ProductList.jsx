import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599593991497-df4fa28e20e8?w=300", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-34301d3a4773?w=300", description: "Great for beginners.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593482892548-d345339d6715?w=300", description: "Removes toxins from air.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", description: "Adds lush green look.", cost: "$20" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=300", description: "Shiny dark leaves.", cost: "$25" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Medicinal properties.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Calming scent.", cost: "$14" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=300", description: "Sweet night fragrance.", cost: "$16" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515584285042-19e1b7f2dc3f?w=300", description: "Herbal aroma.", cost: "$11" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=300", description: "Refreshing scent.", cost: "$8" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=300", description: "Crisp eucalyptus scent.", cost: "$22" },
        { name: "Geranium", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300", description: "Vibrant and fragrant.", cost: "$13" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207174415-13bacbcf0584?w=300", description: "Thrives in low light.", cost: "$20" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1571575131798-f46047a4ef3a?w=300", description: "Hard to kill.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Very resilient.", cost: "$22" },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300", description: "Requires minimal water.", cost: "$9" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", description: "Colorful foliage.", cost: "$19" },
        { name: "Parlor Palm", image: "https://images.unsplash.com/photo-1593482892548-d345339d6715?w=300", description: "Classic indoor palm.", cost: "$17" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setShowCart(false)}>Paradise Nursery</div>
        <div className="navbar-links">
          <span onClick={() => setShowCart(false)}>Plants</span>
          <span onClick={() => setShowCart(true)}>
            🛒 Cart ({totalItemsCount})
          </span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          <h2>Our Houseplants</h2>
          {plantsArray.map((cat, idx) => (
            <div key={idx} className="category-section">
              <h3>{cat.category}</h3>
              <div className="plants-cards">
                {cat.plants.map((plant, pIdx) => {
                  const isAdded = cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={pIdx} className="plant-card">
                      <img src={plant.image} alt={plant.name} />
                      <h4>{plant.name}</h4>
                      <p>{plant.description}</p>
                      <p className="price">{plant.cost}</p>
                      <button 
                        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={isAdded}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
