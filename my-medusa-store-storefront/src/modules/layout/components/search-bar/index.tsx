"use client"

import { sdk } from "@lib/config"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type Product = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Recherche avec debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsLoading(true)
        try {
          const { products } = await sdk.client.fetch<{ products: Product[] }>(
            "/store/products",
            {
              query: {
                q: query,
                limit: 5,
                fields: "id,title,handle,thumbnail",
              },
            }
          )
          setResults(products || [])
          setShowResults(true)
        } catch (error) {
          console.error("Erreur de recherche:", error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Fermer les résultats quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowResults(false)
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full py-2 pl-10 pr-4 text-sm transition-all duration-200 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Icône de recherche */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="w-4 h-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </form>

      {/* Résultats de recherche */}
      {showResults && (
        <div className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg top-full max-h-96">
          {results.length > 0 ? (
            <>
              {results.map((product) => (
                <LocalizedClientLink
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="flex items-center p-3 transition-colors hover:bg-gray-50"
                  onClick={() => setShowResults(false)}
                >
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="flex-shrink-0 object-cover w-10 h-10 mr-3 rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </p>
                  </div>
                </LocalizedClientLink>
              ))}

              {/* Voir tous les résultats */}
              <div className="border-t border-gray-100">
                <button
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
                    setShowResults(false)
                  }}
                  className="w-full p-3 text-sm text-center text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Voir tous les résultats pour "{query}"
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-sm text-center text-gray-500">
              Aucun produit trouvé pour "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
