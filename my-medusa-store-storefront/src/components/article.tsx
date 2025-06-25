const Article = () => {
  return (
    <div className="py-20 bg-white dark:bg-black">
      <div className="max-w-5xl px-6 mx-auto">
        <h2 className="mb-12 text-4xl font-semibold text-center md:text-5xl md:mb-16 dark:text-white">
          Apple Store 237
        </h2>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-50 dark:bg-neutral-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm0 2a1 1 0 0 0-1 1v5a1 1 0 0 0 .4.8l4 3a1 1 0 0 0 1.2-1.6L13 11.5V7a1 1 0 0 0-1-1z" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-medium dark:text-white">
              Service Premium
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nos équipes sont formées pour vous offrir un service personnalisé
              et professionnel, à la hauteur de l'excellence Apple.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-50 dark:bg-neutral-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3M12 12l8-4.5M12 12v9M12 12L4 7.5" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-medium dark:text-white">
              Produits Sélectionnés
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Une sélection minutieusement choisie des meilleurs produits Apple,
              des derniers iPhone aux Mac les plus performants.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-50 dark:bg-neutral-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-medium dark:text-white">
              Boutiques Élégantes
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nos boutiques à Yaoundé, Douala et Garoua vous offrent un
              environnement moderne pour découvrir les innovations Apple.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="#"
            className="inline-flex items-center px-5 py-2 text-sm font-medium text-blue-600 hover:underline"
          >
            En savoir plus
            <svg
              className="w-5 h-5 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Article
