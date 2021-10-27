// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require("botbuilder");
const getProductCard = require("../resources/getProductCard");

class bot extends ActivityHandler {
  constructor(userState, conversational_state, mainDialog) {
    super();
    this.userState = userState;
    this.mainDialog = mainDialog;
    this.conversational_state = conversational_state;

    const dialogState =
      this.conversational_state.createProperty("DIALOG_STATE");

    this.onMessage(async (context, next) => {
      await this.mainDialog.run(context, dialogState);
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          const card = getProductCard;
          await context.sendActivity({ attachments: [card] });
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }

  async run(context) {
    await super.run(context);
    // Save any state changes. The load happened during the execution of the Dialog.
    await this.conversational_state.saveChanges(context, false);
    await this.userState.saveChanges(context, false);
  }
}

module.exports.bot = bot;
