"use client"
import { Component } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

export default class Carousel extends Component {
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      centerMode: true,
      centerPadding: "0",
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000, // Plus rapide pour un défilement automatique
      arrows: false, // Désactivation des flèches
      swipe: true,
      dots: true,
      pauseOnHover: false, // Ne s'arrête pas au survol
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: "40px",
          },
        },
      ],
    }
    return (
      <div className="relative w-full px-4 mx-auto my-8 max-w-7xl">
        {/* Conteneur stylisé */}
        <div className="overflow-hidden shadow-xl rounded-2xl">
          <Slider {...settings} className="carousel-slider">
            <div className="w-full aspect-[16/9]">
              <img
                className="object-cover w-full h-full"
                src="/img/c2.png"
                alt="Produit Apple"
              />
            </div>
            <div className="w-full aspect-[16/9]">
              <img
                className="object-cover w-full h-full"
                src="/img/c1.jpeg"
                alt="Produit Apple"
              />
            </div>
            <div className="w-full aspect-[16/9]">
              <img
                className="object-cover w-full h-full"
                src="/img/c3.png"
                alt="Produit Apple"
              />
            </div>
          </Slider>
        </div>

        {/* Style personnalisé pour les points de navigation */}
        <style jsx global>{`
          .carousel-slider .slick-dots {
            bottom: 16px;
          }
          .carousel-slider .slick-dots li button:before {
            font-size: 12px;
            color: white;
            opacity: 0.5;
          }
          .carousel-slider .slick-dots li.slick-active button:before {
            opacity: 1;
            color: white;
          }
        `}</style>
      </div>
    )
  }
}
