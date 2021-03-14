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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas dui quis eros maximus, a porttitor quam porttitor. Praesent ipsum metus, accumsan sit amet mollis eget, iaculis eget massa. Aliquam at purus sed enim condimentum pulvinar. Nulla mollis non est id mollis. In bibendum porttitor massa, eget rutrum eros iaculis sed. In sed nisi quis tortor iaculis cursus at et turpis. Cras sagittis purus vitae volutpat imperdiet. Morbi suscipit libero quis tellus aliquet vehicula. Sed auctor, sem tincidunt iaculis convallis, mauris nunc facilisis sapien, quis venenatis massa sapien id elit. Sed posuere mi vel dolor tincidunt efficitur. Nunc dictum risus leo. Maecenas ullamcorper purus ac felis tincidunt, et aliquet erat eleifend.",
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
