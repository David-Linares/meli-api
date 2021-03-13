module.exports = {
  getBaseUrl: () => {
    return "https://api.mercadolibre.com";
  },
  formatJSONResponse: (dataJson) => {
    const resItems = dataJson.results.slice(0, 4);
    return {
      author: getAuthor(),
      categories: dataJson.filters.filter((item) => item.id == "category")[0]
        .values[0].path_from_root,
      items: resItems.map((item) => formatItem(item)),
    };
  },
  formatJSONItemResponse: (dataJson) => {
    return {
      author: getAuthor(),
      item: {
        ...formatItem(dataJson),
        sold_quantity: dataJson.sold_quantity,
        description: "",
      },
    };
  },
};

formatItem = (item) => {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.prices.presentation.display_currency,
      amount: item.price,
      decimals: 0,
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    address: item.address.state_name,
  };
};

getAuthor = () => {
  return {
    name: "David",
    lastname: "Linares",
  };
};
