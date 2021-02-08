import { useState } from "react";

function PlantCard({ plant, onUpdatePlant,onDeletePlant }) {
  const [inStock, setInStock] = useState(true)
  const [priceUpdate, setPriceUpdate] = useState(plant.price)

  function handleStock() {
    setInStock((inStock) => !inStock)
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    });

    onDeletePlant(plant.id)
  }

  function handlePriceForm(e) {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: priceUpdate }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
      });
  }


  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {inStock ? (
        <button className="primary" onClick={handleStock}>
          In Stock
        </button>
      ) : (
          <button onClick={handleStock}>Out of Stock</button>
        )}
      <button onClick={handleDelete}>Delete</button>
      <form onSubmit={handlePriceForm}>
        <input
          type="number"
          step="0.01"
          placeholder="New Price..."
          value={priceUpdate}
          onChange={(e) => setPriceUpdate(parseFloat(e.target.value))}
        />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
