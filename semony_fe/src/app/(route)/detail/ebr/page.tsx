'use client'
import { DataContext } from '../DataContext';
import { useContext } from 'react';

const DetailPage: React.FC = () => {
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    return null;
  }

  const { mainImages, IPUImages } = dataContext;
  const data = IPUImages[0][0].images[3].data;

  // Log to check the Base64 data
  console.log("Image data length:", data?.length);

  const imageSrc = `data:image/png;base64,${data}`;

  return (
    <div className="rounded-3xl shadow-lg w-[100%] flex items-center justify-center overflow-hidden h-[80vh]">
      {data ? (
        <img
          src={imageSrc}
          alt="ebr"
          style={{ width: "50%", height: "auto" }}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
   
  );
};

export default DetailPage;
