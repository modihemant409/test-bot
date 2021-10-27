const {
  ComponentDialog,
  WaterfallDialog,
  TextPrompt,
  Dialog,
} = require("botbuilder-dialogs");

const { UserProfile } = require("../userProfile");
const product = require("../helpers/product");
const CategoriesCard = require("../resources/CategoriesCard");
const { checkForInput } = require("../helpers/checkForInput");
let userProfile;
class BuyProduct extends ComponentDialog {
  constructor(userState) {
    super("BuyProduct");
    this.userProfileAccessor = userState.createProperty(
      "USER_PROFILE_ACCESSOR"
    );
    this.addDialog(new TextPrompt("SELECT_CATEGORY"));
    this.addDialog(
      new WaterfallDialog("WATERFALL_DIALOG", [
        this.welcomeUser.bind(this),
        this.getProducts.bind(this),
        this.seeDetail.bind(this),
        this.confirmOrder.bind(this),
      ])
    );
    this.initialDialogId = "WATERFALL_DIALOG";
  }

  async welcomeUser(step) {
    userProfile = await this.userProfileAccessor.get(
      step.context,
      new UserProfile()
    );
    const categories = await product.getCategories();
    const card = CategoriesCard(categories.categories);
    await step.context.sendActivity({ attachments: [card] });
    return await step.prompt("SELECT_CATEGORY");
  }

  async getProducts(step) {
    const result = step.result;
    const checkingService = await checkForInput(result);
    if (checkingService.success) {
      return await step.endDialog({
        restart: true,
        data: checkingService.data,
      });
    }
    const products = await product.getProducts(result);
    await step.context.sendActivity({
      text: "Select Any product to see detail:",
      attachments: products.products,
    });
    return Dialog.EndOfTurn;
  }

  async seeDetail(step) {
    const result = step.context.activity.text;
    if (result) {
      const checkingService = await checkForInput(result);
      if (checkingService.success) {
        return await step.endDialog({
          restart: true,
          data: checkingService.data,
        });
      }
    }
    const id = step.context.activity.value.action;
    const confirm = await product.confirmOrder(id);
    await step.context.sendActivity({
      text: "Select Any product to see detail:",
      attachments: confirm.product,
    });
    return Dialog.EndOfTurn;
  }

  async confirmOrder(step) {
    const result = step.context.activity.text;
    if (result) {
      const checkingService = await checkForInput(result);
      if (checkingService.success) {
        return await step.endDialog({
          restart: true,
          data: checkingService.data,
        });
      }
    }
    const action = step.context.activity.value.action;
    if (action == "cancel") {
      return await step.endDialog();
    }
    const order = await product.addOrder(step.context.activity.from.id, action);
    if (order.success) {
      await step.context.sendActivity({
        attachments: [order.card],
      });
    } else {
      await step.context.sendActivity({
        attachments: [order.card],
      });
    }
    return step.endDialog();
  }
}

module.exports = BuyProduct;
