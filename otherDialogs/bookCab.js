const {
  ComponentDialog,
  WaterfallDialog,
  TextPrompt,
} = require("botbuilder-dialogs");

const { validateDate } = require("../helpers/validateDate");
let userProfile = undefined;
const { checkForInput } = require("../helpers/checkForInput");

class BookCab extends ComponentDialog {
  constructor(userState) {
    super("BookCab");
    this.userProfileAccessor = userState.createProperty(
      "USER_PROFILE_ACCESSOR"
    );
    this.addDialog(new TextPrompt("TIME_PROMPT"));
    this.addDialog(
      new WaterfallDialog("WATERFALL_DIALOG", [
        this.getTime.bind(this),
        this.bookCab.bind(this),
      ])
    );
    this.initialDialogId = "WATERFALL_DIALOG";
  }

  async getTime(step) {
    userProfile = await this.userProfileAccessor.get(step.context, {});
    return await step.prompt(
      "TIME_PROMPT",
      "Please enter the time to book the Cab."
    );
  }

  async bookCab(step) {
    const input = step.result;
    const checkingService = await checkForInput(input);
    if (checkingService.success) {
      return await step.endDialog({
        restart: true,
        data: checkingService.data,
      });
    }
    const result = validateDate(input);
    if (result.success) {
      console.log(result);
      await step.context.sendActivity(result.message);
    } else {
      console.log(result);
      await step.context.sendActivity(result.message);
    }
    return await step.endDialog();
  }
}

module.exports.BookCab = BookCab;
