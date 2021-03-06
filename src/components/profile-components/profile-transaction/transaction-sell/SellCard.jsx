import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

function SellCard({ data, user, update }) {
  const handleAccept = async () => {
    const res = await fetch(
      `https://api.retropia-market.com/products/bid/${data.id}/delete`,
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
    } else {
      alert('parece que algo salio mal');
      const data = await res.json();
    }
  };

  return (
    <div className="sell-card">
      <h1 className="sell-card-name">{data.name}</h1>
      <h2 className="sell-card-price">{data.price}€</h2>
      <a href={`http://15.188.133.89:3000/catalogue/${data.id}`}>
        <FormattedMessage id="product.sell.lookpage" />
      </a>
    </div>
  );
}

export default SellCard;
