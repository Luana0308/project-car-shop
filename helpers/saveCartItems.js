const saveCartItems = (tranformandoStringObjeto) => {
  localStorage.setItem('cartItems', tranformandoStringObjeto);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
