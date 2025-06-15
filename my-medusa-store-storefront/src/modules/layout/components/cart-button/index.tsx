import { retrieveCart } from "@lib/data/cart"
import { useEffect, useState } from "react"
import CartDropdown from "../cart-dropdown"

export default function CartButton() {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    retrieveCart()
      .then(setCart)
      .catch(() => setCart(null))
  }, [])

  return <CartDropdown cart={cart} />
}
