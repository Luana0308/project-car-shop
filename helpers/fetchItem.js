const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  try {
    const responsefetch = await fetch(url);
    const itemJson = await responsefetch.json();
    return itemJson;
  } catch (error) {
     return error;
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
