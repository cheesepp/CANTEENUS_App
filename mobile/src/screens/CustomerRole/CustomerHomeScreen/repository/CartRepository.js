// CartRepository.js
class CartRepository {
    constructor() {
      this.cartItems = [];
    }

    getLength() {
      return this.cartItems.length
    }
  
    getCartItems() {
      return this.cartItems;
    }
  
    addToCart(item) {
      const existingItemIndex = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update quantity
        this.cartItems[existingItemIndex].quantity += item.quantity;
      } else {
        // Item doesn't exist in the cart, add it
        this.cartItems.push({ ...item, quantity: item.quantity });
      }
    }
  
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    }
  
    clearCart() {
      this.cartItems = [];
    }
  }
  
  const cartRepository = new CartRepository();
  
  export default cartRepository;
  