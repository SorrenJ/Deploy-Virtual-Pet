import React, { useState } from 'react';
import '../styles/shop.scss';

const Shop = ({ money = 0, toys = [], toiletries = [], foods = [], onBuy, onAddMoney }) => {
  // State to track shopkeeper's mood
  const [shopkeeperMood, setShopkeeperMood] = useState({
    image: "https://res.cloudinary.com/deszclhtq/image/upload/v1728147784/Shopkeeper_Neutral_grmlj6.png",
    text: "Welcome to my little shop... I hope you can find what you need."
  });

  const handleBuy = (itemId, category, price) => {
    // Check if the user has enough money
    if (money < price) {
      // Change the shopkeeper's mood to angry
      setShopkeeperMood({
        image: "https://res.cloudinary.com/deszclhtq/image/upload/v1728147784/Shopkeeper_Murderous_bk3frq.png",
        text: "Are you trying to scam me?"
      });

      // Set a timer to revert the mood back to neutral after 8 seconds
      setTimeout(() => {
        setShopkeeperMood({
          image: "https://res.cloudinary.com/deszclhtq/image/upload/v1728147784/Shopkeeper_Neutral_grmlj6.png",
          text: "Welcome to my little shop... I hope you can find what you need."
        });
      }, 8000);
      return; // Exit the function if not enough money
    }

    // Call the onBuy function if there is enough money
    onBuy(itemId, category, price);

    // Change the shopkeeper's mood after a purchase
    setShopkeeperMood({
      image: "https://res.cloudinary.com/deszclhtq/image/upload/v1728147784/Shopkeeper_Happy_u6qjwq.png",
      text: "Thank you for your business!"
    });

    // Set a timer to revert the mood back to neutral after 8 seconds
    setTimeout(() => {
      setShopkeeperMood({
        image: "https://res.cloudinary.com/deszclhtq/image/upload/v1728147784/Shopkeeper_Neutral_grmlj6.png",
        text: "Welcome to my little shop... I hope you can find what you need."
      });
    }, 8000);
  };

  const handleDragStart = (event, itemId, category, price) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ itemId, category, price }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const { itemId, category, price } = JSON.parse(data);

    // Call the handleBuy function
    handleBuy(itemId, category, price);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Validate and ensure arrays are present before rendering
  const renderItems = (items, category) => {
    if (!items || items.length === 0) {
      return <p>No items available in this category.</p>;
    }

    return (
      <>
        <div className="items-row">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className={`${category} tooltip`}>
              <h2>{item.name}</h2>
              <div className="tooltiptext">
                Price: ${item.price}<br />
                {item.description || 'No description available'}
              </div>
              <img
                src={item.image || `${category}_placeholder.png`}
                alt={item.name}
                width="150"
                height="150"
                draggable
                onDragStart={(e) => handleDragStart(e, item.id, category, item.price)}
              />
              <button onClick={() => handleBuy(item.id, category, item.price)}>Buy</button>
            </div>
          ))}
        </div>
        {items.length > 3 && (
          <div className="items-row">
            {items.slice(3).map((item) => (
              <div key={item.id} className={`${category} tooltip`}>
                <h2>{item.name}</h2>
                <div className="tooltiptext">
                  Price: ${item.price}<br />
                  {item.description || 'No description available'}
                </div>
                <img
                  src={item.image || `${category}_placeholder.png`}
                  alt={item.name}
                  width="150"
                  height="150"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id, category, item.price)}
                />
                <button onClick={() => handleBuy(item.id, category, item.price)}>Buy</button>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="shop">
      <div className="shopkeeper-container" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="shopkeeper-wrapper">
          <h2 className="shopkeeper-text">{shopkeeperMood.text}</h2>
          <img src={shopkeeperMood.image} alt="shopkeeper" className="shopkeeper" />
          <div className="moving-clouds"></div>
        </div>
      </div>
      <div className="items-container">
        <h2 className="money">Your Balance: ${money}</h2>

        <div className="category-container">
          <h1 className="text-3xl font-bold">Toys</h1>
          {renderItems(toys, 'toys')}
        </div>

        <div className="category-container">
          <h1 className="text-3xl font-bold">Toiletries</h1>
          {renderItems(toiletries, 'toiletries')}
        </div>

        <div className="category-container">
          <h1 className="text-3xl font-bold">Foods</h1>
          {renderItems(foods, 'foods')}
        </div>
      </div>
    </div>
  );
};

export default Shop;
