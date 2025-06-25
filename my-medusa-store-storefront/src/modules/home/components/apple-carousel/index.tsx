"use client"

import { Card, Carousel } from "../../../../components/ui/apple-cards-carousel"

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ))

  return (
    <div className="w-full h-full py-20">
      <h2 className="pl-4 mx-auto font-sans text-xl font-bold max-w-7xl md:text-5xl text-neutral-800 dark:text-neutral-200">
        Les avantages d'acheter vos produits Apple chez nous ?
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
    category: "Service client apres-vente",
    title: "Passez dans nos stores",
    isVideo: true,
    src: "/img/video3.mp4",
    content: null, // Désactivation du contenu
  },
  {
    category: "Produits certifiés ",
    title: "La photographie repensée.",
    src: "/img/video1.mp4",
    isVideo: true,
    content: null, // Désactivation du contenu
  },
  {
    category: "Facilités de paiement",
    title: "Payez en 3 ou 4 fois sans frais.",
    src: "/img/tranchepaiement.png",
    content: null, // Désactivation du contenu
  },
  {
    category: "Client satisfait",
    title: "Laissez nous vous rendre heureux.",
    isVideo: true,
    src: "/img/video4.mp4",
    content: null, // Désactivation du contenu
  },
  {
    category: "Pochettes et accessoires",
    title: "Découvrez nos pochettes.",
    isVideo: true,
    src: "/img/video2.mp4",
    content: null, // Désactivation du contenu
  },
  {
    category: "Store ouvert 7/7",
    title: "Ouvert meme le dimanche.",
    isVideo: true,
    src: "/img/video5.mp4",
    content: null, // Désactivation du contenu
  },
  {
    category: "Trocs disponibles",
    title: "Echanger vos anciens iphones.",
    src: "/img/troc.png",
    content: null, // Désactivation du contenu
  },
]
