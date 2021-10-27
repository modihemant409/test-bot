const { CardFactory, ActionTypes } = require("botbuilder-core");
module.exports = ProductCard = CardFactory.heroCard(
  "Welcome to Bot Framework!",
  "Welcome to Welcome Users bot sample! This Introduction card is a great way to introduce your Bot to the user and suggest some things to get them started. We use this opportunity to recommend a few next steps for learning more creating and deploying bots.",
  ["https://aka.ms/bf-welcome-card-image"],
  [
    {
      type: ActionTypes.ImBack,
      title: "Get Weather",
      value: "Get weather",
    },
    {
      type: ActionTypes.ImBack,
      title: "Buy Product",
      value: "Buy product",
    },
    {
      type: ActionTypes.ImBack,
      title: "Book Cab For flight",
      value: "Book cab",
    },
  ]
);
