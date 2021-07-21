import { useState, useEffect } from 'react';

function useImage(imageURL) {
  const serverURL = 'http://15.188.133.89:8080/';
  const defaultImg = 'https://i.imgur.com/CevZ3gf.jpg';
  const [image, setImage] = useState(defaultImg);

  useEffect(() => {
    imageURL
      ? imageURL?.includes('google')
        ? setImage(imageURL)
        : setImage(serverURL + imageURL.slice(11))
      : setImage(defaultImg);
  }, [serverURL, imageURL]);

  return image;
}

export default useImage;
