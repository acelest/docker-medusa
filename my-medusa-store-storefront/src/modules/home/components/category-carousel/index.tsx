"use client"
import Link from "next/link"
import { useRef } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

const categories = [
  {
    name: "Mac",
    image: "/hero/macbook.png",
    href: "/categories/mac",
  },
  {
    name: "iPhone",
    image: "/hero/iphone.png",
    href: "/categories/iphone",
  },
  {
    name: "iPad",
    image: "/hero/ipad.png",
    href: "/categories/ipad",
  },
  {
    name: "Apple Watch",
    image: "/hero/iwatch.png",
    href: "/categories/apple-watch",
  },
  {
    name: "AirPods",
    image: "/hero/airpods.png",
    href: "/categories/airpods",
  },
  {
    name: "Airtags",
    image: "/hero/airtag.png",
    href: "/categories/airtags",
  },
  {
    name: "Apple TV 4K",
    image: "/hero/appletv.png",
    href: "/categories/apple-tv",
  },
  {
    name: "HomePod",
    image: "/hero/homepod.png",
    href: "/categories/homepod",
  },
  {
    name: "Accessoires",
    image: "/hero/accessories.png",
    href: "/categories/accessories",
  },
]

export default function CategoryCarousel() {
  const sliderRef = useRef<Slider>(null)
  const settings = {
    infinite: true,
    slidesToShow: 5,
    centerMode: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    centerPadding: "100px",
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, centerMode: true, centerPadding: "80px" },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, centerMode: true, centerPadding: "60px" },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "40px" },
      },
    ],
  }

  return (
    <div className="relative w-full py-10 mt-6 bg-white">
      <button
        aria-label="Précédent"
        className="absolute left-0 z-20 hidden p-2 -translate-y-1/2 rounded-full shadow bg-white/80 top-1/2 hover:bg-gray-200 sm:block"
        onClick={() => sliderRef.current?.slickPrev()}
        style={{ left: 0 }}
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        aria-label="Suivant"
        className="absolute right-0 z-20 hidden p-2 -translate-y-1/2 rounded-full shadow bg-white/80 top-1/2 hover:bg-gray-200 sm:block"
        onClick={() => sliderRef.current?.slickNext()}
        style={{ right: 0 }}
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <Slider ref={sliderRef} {...settings}>
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center gap-3">
            <Link href={cat.href} className="flex flex-col items-center">
              <img
                className="object-contain w-36 h-36"
                src={cat.image}
                alt={cat.name}
              />
              <span className="pt-3 font-medium text-center cursor-pointer hover:underline">
                {cat.name}
              </span>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}
