import {useState, useEffect} from 'react';

function useImage(serverURL, imageURL){
  const defaultImg = 'https://i.imgur.com/CevZ3gf.jpg'
  const [image, setImage] = useState(defaultImg);

  useEffect(() => {
    imageURL ? setImage(serverURL + imageURL.slice(6))
    : setImage(defaultImg)
  }, [serverURL, imageURL])

  return image
}

export default useImage;