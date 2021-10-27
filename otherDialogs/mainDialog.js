const {
  ComponentDialog,
  DialogSet,
  WaterfallDialog,
  DialogTurnStatus,
  TextPrompt,
} = require("botbuilder-dialogs");
const { getProfileDialog } = require("./getProfileDialog");
const { BookCab } = require("./bookCab");
const { getWeather } = require("./getWeather");
const BuyProduct = require("./BuyProduct");
const { checkForInput } = require("../helpers/checkForInput");
const { EndOfConversationCard } = require("../resources/EndConverstaionCard");

class mainDialog extends ComponentDialog {
  constructor(userState) {
    super("mainDialog");
    this.userState = userState;

    this.userProfileAccessor = this.userState.createProperty(
      "USER_PROFILE_ACCESSOR"
    );
    this.addDialog(new BookCab(this.userState));
    this.addDialog(new getWeather());
    this.addDialog(new BuyProduct(this.userState));

    this.addDialog(new getProfileDialog());
    this.addDialog(new TextPrompt("END_CONVERSATION"));
    this.addDialog(new TextPrompt("SELECT_SERVICE"));

    this.addDialog(
      new WaterfallDialog("WATERFALL_DIALOG", [
        this.startService.bind(this),
        this.endConversation.bind(this),
      ])
    );

    this.initialDialogId = "WATERFALL_DIALOG";
  }

  // async getProfile(step) {
  //   const checkForRestart = step._info.options;
  //   if (checkForRestart?.restart) {
  //     return await step.next(checkForRestart);
  //   }
  //   userProfile = await this.userProfileAccessor.get(
  //     step.context,
  //     new UserProfile()
  //   );
  //   if (userProfile?.isProfileCompleted) {
  //     return await step.next(null);
  //   }
  //   return await step.beginDialog("getProfileDialog");
  // }

  // async setProfile(step) {
  //   const checkForRestart = step.result;
  //   if (checkForRestart?.restart) {
  //     return await step.next(checkForRestart);
  //   }
  //   if (step.result == null) {
  //     let msg = `I have your name as ${userProfile.name}`;
  //     if (userProfile.age !== null) {
  //       msg += `, age as ${userProfile.age}`;
  //     }
  //     msg += `and your email as ${userProfile.email}`;
  //     msg += ".";
  //     await step.context.sendActivity(msg);
  //   } else {
  //     await this.userProfileAccessor.set(step.context, step.result);
  //   }
  //   return await step.next();
  // }

  // async selectService(step) {
  //   const checkForRestart = step.result;
  //   if (checkForRestart?.restart) {
  //     return await step.next(checkForRestart.data);
  //   }
  //   const card = getProductCard;
  //   await step.context.sendActivity({ attachments: [card] });
  //   return await step.prompt("SELECT_SERVICE");
  // }

  async startService(step) {
    let result = step.context.activity.text.toLowerCase();
    const checkForService = await checkForInput(result);
    if (checkForService.success) {
      result = checkForService.data;
    } else {
      await step.context.sendActivity(
        "Sorry!! I am still learning about that."
      );
      return await step.endDialog();
      // return await step.replaceDialog("WATERFALL_DIALOG");
    }
    switch (result) {
      case "cab":
        await step.context.sendActivity("Welcome to bot cab service");
        return await step.beginDialog("BookCab");
      case "product":
        await step.context.sendActivity("Welcome to bot Store");
        return await step.beginDialog("BuyProduct");
      case "weather":
        await step.context.sendActivity("Welcome to bot weather hub");
        return await step.beginDialog("getWeather");
      case "cancel":
        await step.context.sendActivity("Good Bye.Have a great day.");
        return await step.endDialog();
      default:
        await step.context.sendActivity("Good Bye.Have a great day.");
        return await step.endDialog();
    }
  }

  async endConversation(step) {
    const result = step.result;
    if (result?.restart) {
      return await step.replaceDialog("WATERFALL_DIALOG", result);
    }
    const card = EndOfConversationCard;
    await step.context.sendActivity({ attachments: [card] });
    return await step.endDialog();
    // return await step.prompt("SELECT_SERVICE");
  }

  // async final(step) {
  //   const result = step.result.toLowerCase();
  //   console.log(result);
  //   const checkingService = await checkForInput(result);
  //   if (checkingService.success) {
  //     console.log(checkingService);
  //     return await step.replaceDialog("WATERFALL_DIALOG", {
  //       restart: true,
  //       data: checkingService.data,
  //     });
  //   }
  //   switch (result) {
  //     case "restart":
  //       return await step.replaceDialog("mainDialog");
  //     default:
  //       await step.context.sendActivity("Good Bye.Have a great day.");
  //       return await step.endDialog();
  //   }
  // }

  async run(context, state) {
    const dialogSet = new DialogSet(state);
    dialogSet.add(this);
    const dialogContext = await dialogSet.createContext(context);
    const result = await dialogContext.continueDialog();
    // console.log("dialog COntext result", result);
    if (result.status == DialogTurnStatus.empty) {
      await dialogContext.beginDialog(this.id);
      console.log("stating dialog ", this.id);
    }
  }
}

module.exports.mainDialog = mainDialog;
