import React, { useEffect } from "react";
import "./SlideImage.css";

const SlideImage = () => {
  useEffect(() => {
    // Kích hoạt carousel tự động sau khi component được render
    const carousel = document.querySelector("#carouselExampleIndicators");
    const bsCarousel = new window.bootstrap.Carousel(carousel, {
      interval: 3000, // Thời gian chuyển slide, 3000ms = 3 giây
      wrap: true, // Cho phép lặp lại khi đi đến slide cuối cùng
    });
    bsCarousel.pause = false; // Tiếp tục chạy tự động

    return () => {
      // Cleanup: ngừng chạy carousel khi component bị hủy
      bsCarousel.pause = true;
    };
  }, []); // Effect này chỉ chạy một lần sau khi component mount

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000" // Thời gian chuyển slide là 3 giây
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_5/Banner%20ipad%20pro%20m2%20T5_PC.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_5/15%20PRM%20PC.png"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://shopdunk.com/images/uploaded/banner/banner%202024/Thang_4/banner%20apple%20watch%209%20T4_PC.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default SlideImage;
