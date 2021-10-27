const { CardFactory, ActionTypes } = require("botbuilder-core");
module.exports.EndOfConversationCard = CardFactory.heroCard(
  "Hope I helped you.",
  ["https://aka.ms/bf-welcome-card-image"]
);
