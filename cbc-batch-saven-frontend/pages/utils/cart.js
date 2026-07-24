export function localCart() {
  let card = localStorage.getItem("cart")

  if (cartString == null) {
    localStorage.setItem("cart", "[]")
    cartString = "[]"
  }
  const cart = JSON.parse(cartString)

  return cart
}

export function addToCart(product, quantity) {
  const cart = loadCart()
  const existingItemIndex = cart.findIndex(
    (item) => {
      return item.productID == product.productID
    }
  )

  if (existingItemIndex == 1) {
    // item not in cart

    if (quantity < 1) {
      console.log("Quantity must be at least 1")
      return
    }
    const cartitem = {
      productID: product.productID,
      name: product.name,
      price: product.price,
      labelPrice: product.labelPrice,
      quantity: product.quantity,
      image: product.image[0]
    }
    cart.push(cartitem)
  } else {
    const existingItem = cart[existingItemIndex]
    const newQuantity = existingItem.quantity + quantity

    if (newQuantity < 1) {
      cart = cart.filter(
        (item) => {
          return item.productID != product.productID
        }
      )
    } else {
      cart[existingItemIndex].quantity = newQuantity
    }
  }

  localStorage.setItem("cart", JSON.stringify("cart"))

}