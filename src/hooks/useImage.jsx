import {useState, useEffect} from 'react';

function useImage(imageURL){
  const serverURL = 'http://localhost:8080/'
  const defaultImg = 'https://i.imgur.com/CevZ3gf.jpg'
  const [image, setImage] = useState(defaultImg);

  if(imageURL.includes('google')){
    imageURL = 'src/static/users-img/' + imageURL
  }

  useEffect(() => {
    imageURL ? setImage(serverURL + imageURL.slice(11))
    : setImage(defaultImg)
  }, [serverURL, imageURL])

  return image
}

export default useImage;