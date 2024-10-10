import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "../../components/Card";

// to add two buttons to next and back

// const simpleNextArrow = (props) => {
//   const { className, style, onClick } = props;

//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     >
//       Next
//     </div>
//   );
// };

// const simplePrevArrow = (props) => {
//     const { className, style, onClick } = props;

//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={onClick}
//       >
//         Back
//       </div>
//     );
// }

const SpecialProducts = () => {
  const [products, setProducts] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const specialsProduct = data.filter((item) => item.category == "Pans");
        setProducts(specialsProduct);
      });
  }, []);

  // settings of the slider
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className=" section-container py-16">
      <div className=" text-left">
        <p className=" subtitle">Special Products</p>
        <h2 className=" title">Standout Items From Our Products</h2>
      </div>

      {/* Slider */}
      <Slider {...settings} className="my-10">
        {products.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </Slider>
    </div>
  );
};

export default SpecialProducts;
