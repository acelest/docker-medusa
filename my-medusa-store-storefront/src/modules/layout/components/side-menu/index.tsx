"use client"

import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"

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
      <ul className="flex flex-col items-start justify-start gap-6">
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
      <div className="flex flex-col gap-y-6">
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
