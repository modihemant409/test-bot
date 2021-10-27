const { CardFactory, ActionTypes } = require("botbuilder-core");
module.exports = (categories) => {
  const array = [];
  categories.forEach((category) => {
    array.push({
      type: ActionTypes.ImBack,
      title: `${category}`,
      value: `${category}`,
    });
  });
  const card = CardFactory.heroCard(
    "Select Category TO see Product List",
    ["https://aka.ms/bf-welcome-card-image"],
    array
  );
  return card;
};
