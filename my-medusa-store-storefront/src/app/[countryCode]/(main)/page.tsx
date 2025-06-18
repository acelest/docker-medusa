import { Metadata } from "next"

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HeroGrid from "@modules/home/components/hero-grid"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })
  if (!collections || !region) {
    return null
  }

  // Données d'exemple pour la grille hero
  const heroGridItems = [
    {
      title: "iPhone 15 Pro",
      subtitle: "Titane. Si solide. Si léger. Si Pro.",
      image: "/hero/mca3.jpg",
      imageAlt: "iPhone 15 Pro",
      darkMode: true,
      learnMoreHref: "/products/iphone-15-pro",
      buyHref: "/products/iphone-15-pro",
      buyText: "Acheter l’iPhone",
      size: "large" as const,
    },
    {
      title: "iPad Air",
      subtitle: "Léger. Lumineux. Puissant.",
      image: "/hero/ipadair.jpg",
      imageAlt: "iPad Air",
      darkMode: false,
      learnMoreHref: "/products/ipad-air",
      buyHref: "/products/ipad-air",
      buyText: "Acheter l’iPad",
    },
    {
      title: "MacBook Pro",
      subtitle: "Époustouflant. Remarquable.",
      image: "/hero/mac2.jpg",
      imageAlt: "MacBook Pro",
      darkMode: true,
      learnMoreHref: "/products/macbook-pro",
      buyHref: "/products/macbook-pro",
      buyText: "Acheter le MacBook",
    },
    {
      title: "Apple Watch",
      subtitle: "Un grand pas pour votre santé.",
      image: "/hero/apple-watch.jpg",
      imageAlt: "Apple Watch",
      darkMode: false,
      learnMoreHref: "/products/apple-watch",
      buyHref: "/products/apple-watch",
      buyText: "Acheter la Watch",
    },
    {
      title: "AirPods Pro",
      subtitle: "Audio adaptatif. Maintenant à l’écoute.",
      image: "/hero/airpod.jpg",
      imageAlt: "AirPods Pro",
      darkMode: true,
      learnMoreHref: "/products/airpods-pro",
      buyHref: "/products/airpods-pro",
      buyText: "Acheter les AirPods",
    },
  ]

  return (
    <>
      <Hero />
      <HeroGrid items={heroGridItems} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
