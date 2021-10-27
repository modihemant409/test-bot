module.exports.checkForInput = async (input) => {
  if (input.includes("cab")) {
    return { success: true, data: "cab" };
  } else if (input.includes("product")) {
    return { success: true, data: "product" };
  } else if (input.includes("orders")) {
    return { success: true, data: "product" };
  } else if (input.includes("weather")) {
    return { success: true, data: "weather" };
  } else if (input.includes("cancel") || input.includes("exit")) {
    return { success: true, data: "exit" };
  } else {
    return { success: false };
  }
};
