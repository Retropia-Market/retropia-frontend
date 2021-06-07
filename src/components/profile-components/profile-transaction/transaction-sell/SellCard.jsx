import React, { useEffect } from 'react';

function SellCard({ data, user, update }) {
  const handleAccept = async () => {
    const res = await fetch(
      `http://localhost:8080/products/bid/${data.id}/delete`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + user.token,
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      update();
      console.log(data);
    } else {
      alert('parece que algo salio mal');
      const data = await res.json();
      console.log(data);
    }
  };

  useEffect(() => {
    console.log(data);
    return () => {};
  }, []);

  return (
    <div className="sell-card">
      <h1 className="sell-card-name">{data.name}</h1>
      <h2 className="sell-card-price">{data.price}€</h2>
      <a href={`http://localhost:3000/catalogue/${data.id}`}>
        Ver página del producto
      </a>
    </div>
  );
}

export default SellCard;
