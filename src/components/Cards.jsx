//data base 
import React, { useState, useEffect } from "react";
import { db } from "../firebase";; 
import { ref, get } from "firebase/database";

const Cards = () => {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
  
    const fetchData = async () => {
      const dbRef = ref(db, 'cards'); 
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => ({
            id: key,
            title: data[key].title,
            description: data[key].description,
            imageUrl: data[key].imageUrl,
          }));
          setCardList(formattedData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {cardList.map((card) => (
      <div
  key={card.id}
  className="group relative flex flex-col cursor-pointer bg-white justify-center py-6 px-10 text-center items-center mt-12 
    rounded-tl-[35px] rounded-br-[35px] shadow-2xl md:min-h-[340px] w-full max-w-screen-md min-h-[260px] 
    transition-all duration-300 hover:scale-105 overflow-hidden"
>


  <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
    <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
    <img
      src={card.imageUrl} 
      alt={card.title}
      className="w-full h-full object-cover"
    />
   
    <div className="absolute inset-0 bg-black/50" />
  </div>

 
  <div className="relative z-10 flex flex-col justify-center items-center h-full group-hover:text-white transition-colors duration-300">
    <p className="text-[24px] font-bold uppercase mb-7 text-white ">
      {card.title}
    </p>
  </div>
</div>

  <div className="relative z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
    <p className="text-[24px] font-bold uppercase mb-7">
      {card.title}
    </p>
    <p className="text-[15px] font-medium leading-4 w-full">
      {card.description}
    </p>
  </div>
</div>
      ))}
    </>
  );
};

export default Cards;