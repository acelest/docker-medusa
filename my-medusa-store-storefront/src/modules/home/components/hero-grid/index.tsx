interface HeroGridItemProps {
  title: string
  subtitle: string
  learnMoreText?: string
  buyText?: string
  image: string
  imageAlt: string
  darkMode?: boolean
  learnMoreHref?: string
  buyHref?: string
  size?: "large" | "small"
  hasGridBackground?: boolean
}

interface HeroGridProps {
  items: HeroGridItemProps[]
  backgroundImage?: string
}

const HeroGridItem = ({
  title,
  subtitle,
  learnMoreText = "Learn more",
  buyText = "Buy",
  image,
  imageAlt,
  darkMode = false,
  learnMoreHref = "#",
  buyHref = "#",
  size = "small",
  hasGridBackground = false,
}: HeroGridItemProps) => {
  const textColor = darkMode ? "text-white" : "text-black"
  const bgColor = darkMode ? "bg-black" : "bg-gray-50"
  const buttonBgDark = darkMode
    ? "bg-white text-black hover:bg-gray-200"
    : "bg-blue-600 text-white hover:bg-blue-700"
  const buttonBgLight = darkMode
    ? "border-white text-white hover:bg-white hover:text-black"
    : "border-black text-black hover:bg-black hover:text-white"

  return (
    <div
      className={`${hasGridBackground ? "bg-transparent" : bgColor} ${
        size === "large" ? "lg:col-span-2" : ""
      } relative overflow-hidden min-h-[400px] sm:min-h-[500px] flex flex-col justify-center items-center text-center p-6 sm:p-8`}
    >
      {" "}
      {/* Image en arrière-plan (toujours affichée) */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={imageAlt}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Overlay pour améliorer la lisibilité */}
      <div
        className={`absolute inset-0 z-10 ${
          darkMode ? "bg-black/20" : "bg-white/10"
        }`}
      />
      {/* Contenu */}
      <div className="relative z-20 max-w-sm sm:max-w-md">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold ${textColor} mb-2`}
        >
          {title}
        </h2>
        <p
          className={`text-lg sm:text-xl lg:text-2xl ${textColor} mb-6 sm:mb-8 font-light`}
        >
          {subtitle}
        </p>

        {/* Boutons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={learnMoreHref}
            className={`${buttonBgDark} px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 text-sm w-full sm:w-auto text-center`}
          >
            {learnMoreText}
          </a>
          <a
            href={buyHref}
            className={`border-2 ${buttonBgLight} px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 text-sm w-full sm:w-auto text-center`}
          >
            {buyText}
          </a>
        </div>
      </div>
    </div>
  )
}

interface HeroGridProps {
  items: HeroGridItemProps[]
  backgroundImage?: string
}

const HeroGrid = ({ items, backgroundImage }: HeroGridProps) => {
  return (
    <section className="relative w-full">
      {/* Image de fond pour toute la grille */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImage}
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Overlay pour l'arrière-plan */}
          <div className="absolute inset-0 z-10 bg-black/10" />
        </>
      )}

      <div className="relative z-20 grid grid-cols-1 gap-2 lg:grid-cols-2 sm:gap-4">
        {items.map((item, index) => (
          <HeroGridItem
            key={index}
            {...item}
            hasGridBackground={!!backgroundImage}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroGrid
export { HeroGridItem }
