"use client"

import { sdk } from "@lib/config"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { useEffect, useState } from "react"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"

type Category = {
  id: string
  handle: string
  name: string
  category_children?: Category[]
  parent_category?: any
}

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({
  regions,
  onClose,
}: {
  regions: HttpTypes.StoreRegion[] | null
  onClose?: () => void
}) => {
  const toggleState = useToggleState()
  const [categories, setCategories] = useState<Category[]>([])

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
      })
      .catch(() => setCategories([]))
  }, [])

  return (
    <div className="flex flex-col fixed w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 top-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6 animate-fade-in">
      <div className="flex justify-end" id="xmark">
        <button
          data-testid="close-menu-button"
          onClick={onClose}
          className="p-2 transition-colors rounded-full hover:bg-white/10"
        >
          <XMark className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Menu principal */}
        <ul className="flex flex-col items-start justify-start gap-6 mb-8">
          {Object.entries(SideMenuItems).map(([name, href]) => (
            <li key={name}>
              <LocalizedClientLink
                href={href as string}
                className="text-3xl leading-10 transition-colors duration-200 hover:text-ui-fg-disabled"
                onClick={onClose}
                data-testid={`${name.toLowerCase()}-link`}
              >
                {name}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>

        {/* Catégories */}
        {categories.length > 0 && (
          <div className="pt-6 border-t border-white/20">
            <h3 className="mb-4 text-lg font-medium text-white/80">
              Catégories
            </h3>
            <ul className="flex flex-col items-start justify-start gap-4">
              {categories.map((cat: Category) => (
                <li key={cat.id} className="w-full">
                  <LocalizedClientLink
                    href={`/categories/${cat.handle}`}
                    className="block text-xl leading-8 transition-colors duration-200 hover:text-ui-fg-disabled"
                    onClick={onClose}
                  >
                    {cat.name}
                  </LocalizedClientLink>

                  {/* Sous-catégories */}
                  {cat.category_children &&
                    cat.category_children.length > 0 && (
                      <ul className="mt-2 ml-4 space-y-2">
                        {cat.category_children.map((child) => (
                          <li key={child.id}>
                            <LocalizedClientLink
                              href={`/categories/${child.handle}`}
                              className="block text-base leading-6 transition-colors duration-200 hover:text-ui-fg-disabled text-white/70 hover:text-white/90"
                              onClick={onClose}
                            >
                              {child.name}
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col mt-6 gap-y-6">
        <div
          className="flex items-center justify-between p-2 transition-colors duration-200 rounded-lg hover:bg-white/10"
          onMouseEnter={toggleState.open}
          onMouseLeave={toggleState.close}
        >
          {regions && (
            <CountrySelect toggleState={toggleState} regions={regions} />
          )}
          <ArrowRightMini
            className={clx(
              "transition-transform duration-150",
              toggleState.state ? "-rotate-90" : ""
            )}
          />
        </div>
        <Text className="flex justify-between txt-compact-small">
          © {new Date().getFullYear()} Medusa Store. All rights reserved.
        </Text>
      </div>
    </div>
  )
}

export default SideMenu
