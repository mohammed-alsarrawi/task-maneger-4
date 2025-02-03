// import  "./CardsStyle.css" ;
import Cards from "./Cards";
const CardsDesign = () => {
  return (
    <section className="container mx-auto flex flex-col justify-between gap-2 py-20 mb-12">
      <div className="w-full px-10">
        <h1 className="text-4xl font-bold text-center mb-10">System Features Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Cards />
        </div>
      </div>
    </section>
  );
};

export default CardsDesign;