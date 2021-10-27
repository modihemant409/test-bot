exports.allProduct = (product) => {
  var length = product.length;

  let card = {
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.3",
    body: [
      {
        type: "Container",
        items: [],
        verticalContentAlignment: "Center",
        style: "emphasis",
      },
    ],
    verticalContentAlignment: "Center",
  };
  let i = 0;
  for (i = 0; i < length; i++) {
    card["body"][0].items.push({
      type: "ColumnSet",
      columns: [
        {
          type: "Column",
          width: "stretch",
          items: [
            {
              type: "Image",
              url: product[i].image,
              width: "86px",
              height: "106px",
            },
          ],
        },
        {
          type: "Column",
          width: "stretch",
          items: [
            {
              type: "TextBlock",
              text: product[i].title,
              wrap: true,
              horizontalAlignment: "Left",
              size: "Default",
              weight: "Bolder",
              maxLines: 3,
            },
          ],
        },
        {
          type: "Column",
          width: "stretch",
          items: [
            {
              type: "ActionSet",
              actions: [
                {
                  type: "Action.Submit",
                  title: "Buy Now",
                  iconUrl:
                    "https://media.istockphoto.com/vectors/shopping-cart-vector-icon-on-transparent-background-shopping-cart-vector-id1013542576",
                  data: {
                    action: product[i].id,
                  },
                },
              ],
            },
          ],
        },
      ],
      horizontalAlignment: "Center",
    });
  }
  return card;
};

exports.confirmOrder = (product) => {
  return {
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.3",
    body: [
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            wrap: true,
            text: "Product Name- " + product.title,
            horizontalAlignment: "Center",
            fontType: "Default",
            size: "Large",
            weight: "Bolder",
            color: "Warning",
            isSubtle: false,
          },
          {
            type: "ColumnSet",
            columns: [
              {
                type: "Column",
                width: "stretch",
                items: [
                  {
                    type: "Image",
                    size: "Stretch",
                    height: "131px",
                    url: product.image,
                  },
                ],
              },
              {
                type: "Column",
                width: "stretch",
                items: [
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: "Confirm Order",
                            fontType: "Default",
                            size: "Medium",
                            weight: "Bolder",
                            color: "Light",
                            horizontalAlignment: "Center",
                            wrap: true,
                          },
                        ],
                        style: "accent",
                      },
                    ],
                  },
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "ActionSet",
                            actions: [
                              {
                                type: "Action.Submit",
                                style: "positive",
                                title: "Buy",
                                data: {
                                  action: product.id,
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "ActionSet",
                            actions: [
                              {
                                type: "Action.Submit",
                                title: "Cancel",
                                style: "destructive",
                                id: "cancel",
                                data: {
                                  action: "cancel",
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: "Price:",
                            wrap: true,
                            size: "Large",
                            height: "stretch",
                            horizontalAlignment: "Left",
                            spacing: "None",
                            fontType: "Monospace",
                            weight: "Lighter",
                            color: "Dark",
                          },
                        ],
                      },
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: product.price + "$",
                            size: "Large",
                            fontType: "Default",
                            weight: "Default",
                            color: "Dark",
                            isSubtle: true,
                            wrap: true,
                            horizontalAlignment: "Center",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        style: "emphasis",
        bleed: true,
      },
    ],
  };
};

exports.orderSuccessful = (product) => {
  return {
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.3",
    body: [
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            wrap: true,
            horizontalAlignment: "Center",
            fontType: "Default",
            size: "Large",
            weight: "Bolder",
            color: "Good",
            isSubtle: false,
            text: "Congratulations..!!",
          },
          {
            type: "ColumnSet",
            columns: [
              {
                type: "Column",
                width: "stretch",
                items: [
                  {
                    type: "Image",
                    size: "Stretch",
                    height: "131px",
                    url: product.image,
                    width: "-15px",
                  },
                ],
              },
              {
                type: "Column",
                width: "stretch",
                items: [
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: "Order Successful",
                            fontType: "Default",
                            size: "Medium",
                            weight: "Bolder",
                            color: "Light",
                            horizontalAlignment: "Center",
                            wrap: true,
                          },
                        ],
                        style: "attention",
                      },
                    ],
                  },
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            wrap: true,
                            text: "Price:",
                          },
                        ],
                      },
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: product.price,
                            wrap: true,
                            color: "Dark",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: "Purchased On:",
                            wrap: true,
                          },
                        ],
                      },
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text:
                              new Date().getDate() +
                              "-" +
                              new Date().getMonth() +
                              "-" +
                              new Date().getFullYear(),
                            wrap: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: "Status:",
                            wrap: true,
                          },
                        ],
                      },
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            wrap: true,
                            text: "In process",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        style: "good",
        bleed: true,
      },
    ],
  };
};

exports.orderUnsuccessful = () => {
  return {
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.3",
    body: [
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            wrap: true,
            horizontalAlignment: "Center",
            fontType: "Default",
            size: "Large",
            weight: "Bolder",
            color: "Attention",
            isSubtle: false,
            text: "Sorry..!!",
          },
          {
            type: "ColumnSet",
            columns: [
              {
                type: "Column",
                width: "stretch",
                items: [
                  {
                    type: "Image",
                    size: "Stretch",
                    height: "131px",
                    url: product.image,
                    width: "-15px",
                  },
                ],
              },
              {
                type: "Column",
                width: "stretch",
                items: [
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: "Order Unsuccessful",
                            fontType: "Default",
                            size: "Medium",
                            weight: "Bolder",
                            color: "Light",
                            horizontalAlignment: "Center",
                            wrap: true,
                          },
                        ],
                        style: "attention",
                      },
                    ],
                  },
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            wrap: true,
                            text: "Price:",
                          },
                        ],
                      },
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: product.price,
                            wrap: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: "Date:",
                            wrap: true,
                          },
                        ],
                      },
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text:
                              new Date().getDate() +
                              "-" +
                              new Date().getMonth() +
                              "-" +
                              new Date().getFullYear(),
                            wrap: true,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "ColumnSet",
                    columns: [
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            text: "Issue:",
                            wrap: true,
                          },
                        ],
                      },
                      {
                        type: "Column",
                        width: "stretch",
                        items: [
                          {
                            type: "TextBlock",
                            wrap: true,
                            text: "Technical Issue",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        style: "attention",
        bleed: true,
      },
    ],
  };
};
