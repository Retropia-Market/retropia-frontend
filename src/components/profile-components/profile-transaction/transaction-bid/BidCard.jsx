import React from 'react';

function BidCard({ data, user, update }) {
  const handleDelete = async () => {
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

  return (
    <div className="bid-card">
      <h1>{data.bid_message}</h1>
      <h1>{data.bid_price}</h1>
      <h1>{data.bid_status}</h1>
      <button onClick={handleDelete}>Cancela Oferta</button>
    </div>
  );
}

export default BidCard;
