"use client"

import { sdk } from "@lib/config"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SearchBar from "@modules/layout/components/search-bar"
import SideMenu from "@modules/layout/components/side-menu"
import { Suspense, useEffect, useState } from "react"

type Category = {
  id: string
  handle: string
  name: string
  category_children?: Category[]
  parent_category?: any
}

// Skeleton de chargement pour les catégories
function CategoriesSkeleton() {
  return (
    <div className="items-center hidden space-x-8 md:flex">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-16 h-4 rounded bg-gray-200/50 animate-pulse"
        ></div>
      ))}
    </div>
  )
}

// Composant pour afficher les catégories
function CategoriesNav() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sdk.client
      .fetch<{ product_categories: Category[] }>("/store/product-categories", {
        query: {
          fields: "*category_children, *parent_category",
          limit: 100,
        },
      })
      .then(({ product_categories }) => {
        setCategories(
          product_categories.filter((c: Category) => !c.parent_category)
        )
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <CategoriesSkeleton />

  return (
    <div className="items-center hidden space-x-8 md:flex">
      {categories.map((cat: Category) => (
        <div key={cat.id} className="relative group">
          <LocalizedClientLink
            href={`/categories/${cat.handle}`}
            className="px-1 py-2 text-sm font-normal text-gray-800 transition-all duration-200 hover:text-gray-600 group-hover:scale-105 group-hover:shadow-lg group-hover:bg-gray-50/80"
          >
            {cat.name}
          </LocalizedClientLink>

          {/* Dropdown pour les sous-catégories */}
          {cat.category_children && cat.category_children.length > 0 && (
            <div className="absolute hidden pt-2 transition-all duration-200 ease-in-out transform -translate-x-1/2 left-1/2 top-full group-hover:block">
              <div className="bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-xl py-2 min-w-[200px] transform scale-95 group-hover:scale-100 transition-all duration-200">
                {cat.category_children.map((child) => (
                  <LocalizedClientLink
                    key={child.id}
                    href={`/categories/${child.handle}`}
                    className="block px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-blue-50/80 hover:text-blue-700 hover:translate-x-2"
                  >
                    {child.name}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Nav() {
  const [regions, setRegions] = useState<StoreRegion[]>([])
  // Ajout d'un état pour l'overlay de recherche
  const [showSearch, setShowSearch] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)

  useEffect(() => {
    listRegions().then((regions: StoreRegion[]) => setRegions(regions))
  }, [])

  return (
    <div className="sticky inset-x-0 top-0 z-50">
      <header className="border-b bg-white/80 backdrop-blur-md border-gray-200/30">
        <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Section gauche : Menu mobile + Logo */}
            <div className="flex items-center space-x-4">
              {/* Menu mobile avec icône hamburger - visible uniquement sur mobile */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="p-2 text-gray-600 transition-transform duration-200 hover:text-gray-900 focus:outline-none active:scale-90"
                  aria-label="Menu"
                  onClick={() => setShowSideMenu(true)}
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                {showSideMenu && (
                  <SideMenu
                    regions={regions}
                    onClose={() => setShowSideMenu(false)}
                  />
                )}
              </div>

              {/* Logo */}
              <LocalizedClientLink
                href="/"
                className="flex-shrink-0 transition-opacity hover:opacity-70"
                data-testid="nav-store-link"
              >
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 14 18"
                  className="text-gray-800"
                >
                  <path
                    d="M4.02,16.23c-.25-.16-.51-.39-.77-.71-.18-.21-.4-.51-.66-.9-.45-.65-.82-1.4-1.1-2.25-.31-.93-.46-1.82-.46-2.69,0-.97,.21-1.82,.62-2.53,.32-.57,.75-1.02,1.3-1.35,.55-.34,1.13-.51,1.76-.52,.22,0,.45,.03,.7,.09,.18,.05,.4,.13,.66,.23,.34,.13,.53,.21,.59,.23,.2,.07,.37,.1,.5,.1,.1,0,.24-.03,.4-.08,.09-.03,.26-.09,.5-.19,.24-.09,.43-.16,.58-.22,.23-.07,.45-.13,.65-.16,.24-.04,.48-.05,.71-.03,.44,.03,.84,.12,1.2,.26,.63,.25,1.14,.65,1.52,1.21-.16,.1-.31,.21-.45,.34-.31,.28-.57,.59-.76,.93-.27,.48-.4,1.01-.4,1.56,.01,.67,.18,1.26,.52,1.77,.24,.37,.56,.69,.95,.95,.19,.13,.36,.22,.52,.28-.08,.26-.17,.49-.25,.68-.22,.52-.48,.99-.77,1.43-.27,.39-.48,.68-.64,.87-.25,.3-.49,.52-.73,.68-.28,.18-.58,.27-.9,.27-.22,.01-.43-.02-.64-.08-.12-.04-.3-.1-.53-.2-.23-.1-.42-.17-.56-.21-.23-.06-.47-.09-.72-.09s-.49,.03-.72,.09c-.16,.04-.34,.11-.56,.2-.26,.11-.43,.18-.53,.21-.2,.06-.41,.1-.61,.11-.32,0-.62-.09-.92-.28ZM8.26,4.81c-.42,.21-.82,.3-1.22,.27-.06-.4,0-.81,.17-1.26,.15-.38,.35-.73,.62-1.04,.27-.31,.6-.57,1.01-.78,.41-.21,.8-.32,1.17-.34,.05,.42,0,.84-.15,1.28-.14,.4-.35,.76-.62,1.09-.27,.33-.6,.59-.98,.78Z"
                    fill="currentColor"
                  />
                </svg>
              </LocalizedClientLink>
            </div>

            {/* Section centrale : Navigation des catégories */}
            <div className="flex items-center justify-center flex-1">
              <Suspense fallback={<CategoriesSkeleton />}>
                <CategoriesNav />
              </Suspense>
            </div>

            {/* Section droite : Recherche + Account + Panier */}
            <div className="flex items-center space-x-4">
              {/* Icône de recherche (desktop) */}
              <div className="hidden md:block">
                <button
                  type="button"
                  aria-label="Rechercher"
                  className="p-2 text-gray-600 transition-transform duration-200 hover:text-gray-900 focus:outline-none active:scale-90"
                  onClick={() => setShowSearch(true)}
                >
                  <svg
                    className="w-6 h-6"
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
                </button>
              </div>

              {/* Lien Account (masqué sur mobile) */}
              <div className="hidden md:block">
                <LocalizedClientLink
                  className="text-sm font-normal text-gray-800 transition-colors duration-200 hover:text-gray-600"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>
              </div>

              {/* Bouton Panier */}
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex items-center space-x-1 text-sm font-normal text-gray-800 transition-colors duration-200 hover:text-gray-600"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span className="hidden sm:inline">(0)</span>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>

          {/* Overlay SearchBar (desktop) */}
          {showSearch && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm">
              <div className="relative w-full max-w-lg mt-24">
                <button
                  className="absolute z-10 p-3 right-3 top-3 bg-white rounded-full shadow-xl text-gray-900 hover:bg-gray-50 hover:text-black transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 animate-fadeIn"
                  aria-label="Fermer la recherche"
                  onClick={() => setShowSearch(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <SearchBar />
              </div>
            </div>
          )}

          {/* Barre de recherche mobile */}
          <div className="px-0 pb-3 md:hidden">
            <SearchBar />
          </div>
        </nav>
      </header>
    </div>
  )
}
