module.exports = (weather) => {
  return {
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    type: "AdaptiveCard",
    version: "1.3",
    speak:
      "<s>The forecast for Seattle ${formatEpoch(dt, 'MMMM d')} is mostly clear with a High of ${formatNumber((main.temp_max - 273) * 9 / 5 + 32, 0)} degrees and Low of ${formatNumber((main.temp_min - 273) * 9 / 5 + 32, 0)} degrees</s>",
    body: [
      {
        type: "TextBlock",
        text: weather.name,
        size: "Large",
        isSubtle: true,
        wrap: true,
      },
      {
        type: "TextBlock",
        text: new Date().toString(),
        spacing: "None",
        wrap: true,
      },
      {
        type: "ColumnSet",
        columns: [
          {
            type: "Column",
            width: "auto",
            items: [
              {
                type: "Image",
                url: "https://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png",
                size: "Small",
              },
            ],
          },
          {
            type: "Column",
            width: "auto",
            items: [
              {
                type: "TextBlock",
                text:
                  "" + (((weather.main.temp - 273) * 9) / 5 + 32).toFixed(1),
                size: "ExtraLarge",
                spacing: "None",
                wrap: true,
              },
            ],
          },
          {
            type: "Column",
            width: "stretch",
            items: [
              {
                type: "TextBlock",
                text: "°F",
                weight: "Bolder",
                spacing: "Small",
                wrap: true,
              },
            ],
          },
          {
            type: "Column",
            width: "stretch",
            items: [
              {
                type: "TextBlock",
                text:
                  "Hi " +
                  (((weather.main.temp_max - 273) * 9) / 5 + 32).toFixed(1),
                horizontalAlignment: "Left",
                wrap: true,
              },
              {
                type: "TextBlock",
                text:
                  "Lo " +
                  (((weather.main.temp_min - 273) * 9) / 5 + 32).toFixed(1),
                horizontalAlignment: "Left",
                spacing: "None",
                wrap: true,
              },
            ],
          },
        ],
      },
    ],
  };
};
