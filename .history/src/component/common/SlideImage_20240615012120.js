import React, { useEffect } from "react";
import "./SlideImage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const SlideImage = () => {
  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleIndicators");
    if (carousel) {
      const bsCarousel = new window.bootstrap.Carousel(carousel, {
        interval: 3000,
        wrap: true,
      });
      bsCarousel.pause = false;
      return () => {
        bsCarousel.pause = true;
      };
    }
  }, []);

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        {/* Các phần tử trong Carousel */}
      </div>
    </div>
  );
};

export default SlideImage;
