const fetchProducts = async (produto) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.results;
  } catch (error) {
     return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
