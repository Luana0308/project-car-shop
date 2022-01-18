const saveCartItems = (value) => {
  localStorage.setItem('cartItems', value);
};
saveCartItems();

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
