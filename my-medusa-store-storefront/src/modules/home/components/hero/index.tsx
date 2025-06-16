const Hero = () => {
  return (
    <div className="h-[65vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      {/* Image desktop */}
      <img
        src="/hero/herolargetall.jpg"
        alt="Apple rentrée desktop"
        className="absolute inset-0 z-0 hidden object-cover w-full h-full sm:block"
      />
      {/* Image mobile */}
      <img
        src="/hero/hero1.jpg"
        alt="Apple rentrée mobile"
        className="absolute inset-0 z-0 block object-cover w-full h-full sm:hidden"
      />

      {/* Contenu positionné manuellement */}
      <div className="absolute inset-0 z-10 flex flex-col items-center gap-6 text-center">
        {/* Positionnement responsive du bouton : plus bas en desktop */}
        <div className="mt-[50vh] sm:mt-[50vh]">
          <a href="/collections/apple">
            <button className="px-8 py-3 text-lg font-semibold text-black transition-all duration-200 border rounded-full shadow-lg bg-white/90 hover:bg-white border-white/80 backdrop-blur-md">
              Voir la collection
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
