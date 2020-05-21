const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  if (request.method == "POST") {
    const payload = {
      notification: {
        title: "Order Placed",
        body: "Your order is confirmed",
        sound: "default",
        data: {},
      },
    };
    var token =
      "e2etpW2aOzM:APA91bELh_euHssLFq5XwqRh_3tRyKMHQX76m_7VHIMTIUPuzddxEp0xY2_Gx3LBgRvFxzHvzo81tU7SaiDcOiekD1DiHKs9QVBGKrK0YlDg-LQO863nuGuup72KlKNn6u_JuOOCAtwA";
    admin.messaging().sendToDevice(token, payload);
  }
});
