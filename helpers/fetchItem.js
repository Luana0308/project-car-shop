const fetchItem = async (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
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
