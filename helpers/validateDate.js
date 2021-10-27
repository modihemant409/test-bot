const Recognizers = require("@microsoft/recognizers-text-suite");

exports.validateDate = (input) => {
  try {
    const results = Recognizers.recognizeDateTime(
      input,
      Recognizers.Culture.English
    );
    const now = new Date();
    const earliest = now.getTime() + 60 * 60 * 1000;
    let output;
    results.forEach((result) => {
      result.resolution.values.forEach((resolution) => {
        const datevalue = resolution.value || resolution.start;
        const datetime =
          resolution.type === "time"
            ? new Date(`${now.toLocaleDateString()} ${datevalue}`)
            : new Date(datevalue);
        if (datetime && earliest < datetime.getTime()) {
          output = {
            success: true,
            message: `Your cab booked for Airport for ${datetime.toLocaleDateString()}`,
          };
          return;
        }
      });
    });
    return (
      output || {
        success: false,
        message: "I'm sorry, please enter a date at least an hour out.",
      }
    );
  } catch (error) {
    return {
      success: false,
      message:
        "I'm sorry, I could not interpret that as an appropriate date. Please enter a date at least an hour out.",
    };
  }
};
