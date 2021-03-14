module.exports = {
  getBaseUrl: () => {
    return "https://api.mercadolibre.com";
  },
  formatJSONResponse: (dataJson) => {
    const resItems = dataJson.results.slice(0, 4);
    const categoriesAvalaibleArray = dataJson.available_filters.filter(
      (item) => item.id == "category"
    );
    const categoriesAvalaibleArraySorted =
      categoriesAvalaibleArray.length > 0
        ? categoriesAvalaibleArray[0].values.sort((a, b) =>
            a.results > b.results ? -1 : b.results > a.results ? 1 : 0
          )
        : [];
    return {
      author: getAuthor(),
      categories:
        categoriesAvalaibleArraySorted.length > 0
          ? categoriesAvalaibleArraySorted
          : [],
      items: resItems.map((item) => formatItem(item)),
    };
  },
  formatJSONItemResponse: (dataJson) => {
    return {
      author: getAuthor(),
      item: {
        ...formatItem(dataJson),
        sold_quantity: dataJson.sold_quantity,
        description:
          dataJson.plain_text && dataJson.plain_text != ""
            ? dataJson.plain_text
            : dataJson.text && dataJson.text != ""
            ? dataJson.text
            : "",
      },
    };
  },
};

formatItem = (item) => {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.prices
        ? item.prices.presentation.display_currency
        : item.currency_id,
      amount: item.price,
      decimals: 0,
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    address: item.address ? item.address.state_name : "",
  };
};

getAuthor = () => {
  return {
    name: "David",
    lastname: "Linares",
  };
};
