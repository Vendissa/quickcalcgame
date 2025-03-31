import React, { useState, useEffect } from "react";
import "../styles/slideshow.css"; // Add styling here

const Slideshow = () => {
  // List of images and captions
  const slides = [
    { src: "/selectdifficultly.png", caption: "Step 1: Select Difficulty." },
    { src: "/clickstart(cropped).png", caption: "Step 2: Start the Game." },
    { src: "/howtoplay.png", caption: "Step 3: How to play." },
    { src: "/timerunout.png", caption: "Step 4: What to do if the timer runs out ?!" },
    { src: "/Solvethepuzzle.png", caption: "Step 5: Complete the bonus challenge to claim more time." },
  ];

  //frontend\public\clickstart(cropped).png

  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  

  // Move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slideshow-container">
      <button className="prev" onClick={prevSlide}>&#10094;</button>

      <div className="slide">
        <img src={slides[currentSlide].src} alt={`Slide ${currentSlide + 1}`} className="slide-image" />
        <p className="caption">{slides[currentSlide].caption}</p>
      </div>

      <button className="next" onClick={nextSlide}>&#10095;</button>

      {}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
