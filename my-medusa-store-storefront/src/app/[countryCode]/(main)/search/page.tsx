import { sdk } from "@lib/config"
import { getRegion } from "@lib/data/regions"
import { StoreProduct } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { Metadata } from "next"

type Props = {
  searchParams: { q?: string }
  params: { countryCode: string }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = searchParams.q || ""

  return {
    title: query ? `Recherche: ${query}` : "Recherche",
    description: query
      ? `Résultats de recherche pour "${query}"`
      : "Recherchez vos produits préférés",
  }
}

export default async function SearchPage({ searchParams, params }: Props) {
  const query = searchParams.q || ""
  const region = await getRegion(params.countryCode)

  let products: StoreProduct[] = []
  let isLoading = false

  if (query.trim()) {
    try {
      const response = await sdk.client.fetch<{ products: StoreProduct[] }>(
        "/store/products",
        {
          query: {
            q: query,
            region_id: region.id,
            limit: 20,
            fields: "*variants.calculated_price",
          },
        }
      )
      products = response.products || []
    } catch (error) {
      console.error("Erreur lors de la recherche:", error)
    }
  }

  return (
    <div className="content-container py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {query ? `Résultats pour "${query}"` : "Recherche"}
        </h1>
        {query && (
          <p className="mt-2 text-gray-600">
            {products.length} produit{products.length !== 1 ? "s" : ""} trouvé
            {products.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {!query ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Rechercher des produits
          </h3>
          <p className="text-gray-600">
            Utilisez la barre de recherche pour trouver vos produits préférés
          </p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4 gap-x-6 gap-y-8">
          {products.map((product) => (
            <ProductPreview
              key={product.id}
              product={product}
              region={region}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.898-6.058-2.37m0 0L4 13m4.058-1.37A8.935 8.935 0 0112 9c-2.34 0-4.467.898-6.058 2.37m0 0L4 11m4.058 1.37c-.274-.165-.577-.27-.904-.27-.565 0-1.024.45-1.024 1.005s.459 1.004 1.024 1.004c.327 0 .63-.105.904-.27z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun résultat trouvé
          </h3>
          <p className="text-gray-600 mb-4">
            Nous n'avons trouvé aucun produit correspondant à "{query}"
          </p>
          <div className="text-sm text-gray-500">
            <p>Suggestions :</p>
            <ul className="mt-2 space-y-1">
              <li>• Vérifiez l'orthographe de votre recherche</li>
              <li>• Essayez des mots-clés plus généraux</li>
              <li>• Utilisez moins de mots</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
