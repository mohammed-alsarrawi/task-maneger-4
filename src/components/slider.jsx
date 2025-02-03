
import Carousel from "./carousel";

function Slider() {
  let slides = [
    {
      image: "/images/photo1.jpg", 
      alt: "Task Management",
      text: "Stay organized, stay productive. Your success starts here!",
    },
    {
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
      text: "Teamwork fuels progress. Manage tasks effortlessly together!",
    },
    {
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      text: "Plan your day, own your time. Achieve greatness one task at a time.",
    },
    {
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e", 
      text: "Efficiency in your hands. Organize, prioritize, succeed!",
    },
  ];


  return (
    <div className="w-[100%] m-auto pb-11">
      <Carousel slides={slides} />
    </div>
  );
}

export default Slider;
