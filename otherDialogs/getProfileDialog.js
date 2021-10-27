const {
  ChoicePrompt,
  ComponentDialog,
  ConfirmPrompt,
  NumberPrompt,
  TextPrompt,
  WaterfallDialog,
} = require("botbuilder-dialogs");

const { UserProfile } = require("../userProfile");
const mailHelper = require("../helpers/mailHelper");
class getProfileDialog extends ComponentDialog {
  constructor() {
    super("getProfileDialog");

    this.addDialog(new TextPrompt("NAME_PROMPT"));
    this.addDialog(new ChoicePrompt("CHOICE_PROMPT"));
    this.addDialog(new ConfirmPrompt("CONFIRM_PROMPT"));
    this.addDialog(new NumberPrompt("NUMBER_PROMPT", this.agePromptValidator));
    this.addDialog(new TextPrompt("EMAIL_PROMPT"));

    this.addDialog(
      new WaterfallDialog("WATERFALL_DIALOG", [
        this.nameStep.bind(this),
        this.nameConfirmStep.bind(this),
        this.ageStep.bind(this),
        this.emailStep.bind(this),
        this.confirmEmailStep.bind(this),
        this.summaryStep.bind(this),
      ])
    );
    this.initialDialogId = "WATERFALL_DIALOG";
  }

  async nameStep(step) {
    step.values.userProfile = new UserProfile();
    await step.context.sendActivity("Please help me to introduce yourself");
    return await step.prompt("NAME_PROMPT", "Enter your name.");
  }

  async nameConfirmStep(step) {
    step.values.userProfile.name = step.result;
    await step.context.sendActivity(`Thanks ${step.result}.`);
    return await step.prompt(
      "CONFIRM_PROMPT",
      "Do you want to give your age?",
      ["yes", "no"]
    );
  }

  async ageStep(step) {
    if (step.result) {
      const promptOptions = {
        prompt: "Please enter your age.",
        retryPrompt:
          "The value entered must be greater than 0 and less than 150.",
      };
      return await step.prompt("NUMBER_PROMPT", promptOptions);
    } else {
      return await step.next(-1);
    }
  }

  async emailStep(step) {
    let age = step.result;
    const msg = age === -1 ? "No age given." : `I have your age as ${age}.`;
    step.values.userProfile.age = age == -1 ? null : age;
    await step.context.sendActivity(msg);
    return await step.prompt("EMAIL_PROMPT", {
      prompt: "Enter your mail address",
    });
  }

  async confirmEmailStep(step) {
    step.values.userProfile.email = step.result;
    return await step.next(true);
  }

  async summaryStep(step) {
    let userprofile = step.values.userProfile;
    let msg = `I have your name as ${userprofile.name}`;
    if (userprofile.age != null) {
      msg += `, age as ${userprofile.age} `;
    }
    msg += `and your email as ${userprofile.email}`;
    msg += ".";
    userprofile.isProfileCompleted = true;
    await mailHelper.sendEmail(
      userprofile.email,
      "welcome",
      "Bot will remember your profile from now "
    );
    await step.context.sendActivity(msg);
    return await step.endDialog(userprofile);
  }

  async agePromptValidator(promptContext) {
    // This condition is our validation rule. You can also change the value at this point.
    return (
      promptContext.recognized.succeeded &&
      promptContext.recognized.value > 0 &&
      promptContext.recognized.value < 150
    );
  }
}

module.exports.getProfileDialog = getProfileDialog;
