"use client"

import { Card, Carousel } from "../../../../components/ui/apple-cards-carousel"

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ))

  return (
    <div className="w-full h-full py-20">
      <h2 className="pl-4 mx-auto font-sans text-xl font-bold max-w-7xl md:text-5xl text-neutral-800 dark:text-neutral-200">
        Découvrez votre prochain appareil Apple.
      </h2>
      <Carousel items={cards} />
    </div>
  )
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="max-w-3xl mx-auto font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Des produits conçus pour vous faciliter le quotidien.
              </span>{" "}
              Prenez des notes rapidement, créez une liste de courses, ou
              capturez vos idées en un instant. Vous voulez convertir ces notes
              en texte ? Aucun problème. Nos appareils sont prêts à capturer
              chaque pensée.
            </p>
            <img
              src="/hero/macbook.png"
              alt="Macbook mockup"
              height="500"
              width="500"
              className="object-contain w-full h-full mx-auto md:w-1/2 md:h-1/2"
            />
          </div>
        )
      })}
    </>
  )
}

const data = [
  {
    category: "Intelligence Artificielle",
    title: "Faites-en plus avec l'IA.",
    src: "/hero/mac1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Productivité",
    title: "Améliorez votre productivité.",
    src: "/hero/mca3.jpg",
    content: <DummyContent />,
  },
  {
    category: "Produit",
    title: "Découvrez l'Apple Vision Pro.",
    src: "/hero/airpod.jpg",
    content: <DummyContent />,
  },
  {
    category: "Produit",
    title: "iPhone 15 Pro Max.",
    src: "/hero/ipadair.jpg",
    content: <DummyContent />,
  },
  {
    category: "iOS",
    title: "La photographie repensée.",
    src: "/hero/mac2.jpg",
    content: <DummyContent />,
  },
  {
    category: "Nouveautés",
    title: "Découvrez nos dernières innovations",
    src: "/hero/apple-watch.jpg",
    content: <DummyContent />,
  },
]
