const axios = require("axios");
const { CardFactory } = require("botbuilder");
const {
  ComponentDialog,
  TextPrompt,
  WaterfallDialog,
} = require("botbuilder-dialogs");
const { checkForInput } = require("../helpers/checkForInput");
const weatherCard = require("../resources/weatherCard");

class getWeather extends ComponentDialog {
  constructor() {
    super("getWeather");
    this.addDialog(new TextPrompt("CITY_PROMPT"));

    this.addDialog(
      new WaterfallDialog("WATERFALL_DIALOG", [
        this.getCity.bind(this),
        this.weather.bind(this),
      ])
    );
    this.initialDialogId = "WATERFALL_DIALOG";
  }

  async getCity(step) {
    return await step.prompt("CITY_PROMPT", "Enter your city name.");
  }

  async weather(step) {
    const city = step.result;
    const checkingService = await checkForInput(city);
    if (checkingService.success) {
      return await step.endDialog({
        restart: true,
        data: checkingService.data,
      });
    }
    let result;
    try {
      let weather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c4de946ca4693332d9ce41eb6461501`
      );
      weather = weather.data;
      const result = weatherCard(weather);
      await step.context.sendActivity({
        text: "Select Any product to see detail:",
        attachments: [CardFactory.adaptiveCard(result)],
      });
    } catch (error) {
      result = `unable to get for ${city}`;
    }
    await step.context.sendActivity(result);
    return await step.endDialog();
  }
}

module.exports.getWeather = getWeather;
