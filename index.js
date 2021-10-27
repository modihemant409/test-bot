// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const restify = require("restify");

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const {
  BotFrameworkAdapter,
  MemoryStorage,
  UserState,
  ConversationState,
} = require("botbuilder");

// This bot's main dialog.
const { bot } = require("./maiBot/bot");
const { mainDialog } = require("./otherDialogs/mainDialog");
const connection = require("./database/config");

// Create HTTP server
const server = restify.createServer();
connection
  .sync()
  .then((res) => {
    server.listen(process.env.port || process.env.PORT || 3978, () => {
      console.log(`\n${server.name} listening to ${server.url}`);
    });
  })
  .catch((error) => {
    console.log("error in database");
  });

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about .bot file its use and bot configuration.
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
});

// Catch-all for errors.
adapter.onTurnError = async (context, error) => {
  // This check writes out errors to console log .vs. app insights.
  // NOTE: In production environment, you should consider logging this to Azure
  //       application insights.
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  // Send a trace activity, which will be displayed in Bot Framework Emulator
  await context.sendTraceActivity(
    "OnTurnError Trace",
    `${error}`,
    "https://www.botframework.com/schemas/error",
    "TurnError"
  );

  // Send a message to the user
  await context.sendActivity("The bot encountered an error or bug.");
  await context.sendActivity(
    "To continue to run this bot, please fix the bot source code."
  );
};

//state initialization
const memory_storage = new MemoryStorage();
const user_state = new UserState(memory_storage);
const conversational_state = new ConversationState(memory_storage);

// Create the main dialog.
const main_dialog = new mainDialog(user_state);
const Bot = new bot(user_state, conversational_state, main_dialog);

// Listen for incoming requests.
server.post("/api/messages", (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    // Route to main dialog.
    await Bot.run(context);
  });
});
