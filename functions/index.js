const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.pushNotification = functions.https.onRequest((request, response) => {
  if (request.method == "POST") {
    var orderStatus = request.body.orderStatus;
    var orderId = request.body.orderId;
    var token = request.body.token;
    console.log("request.body -> " + request.body);
    console.log("request.orderStaus -> " + request.body.orderStatus);
    console.log("request.orderId -> " + request.body.orderId);
    console.log("request.token -> " + request.body.token);
    var message;
    switch (orderStatus) {
      case "confirmed": {
        message =
          "Your order with Order ID " +
          orderId +
          "is confirmed. We will dispatch the order soon";
        break;
      }
      case "dispatched": {
        message =
          "Your order with Order ID " +
          orderId +
          "is dispatched. The order will reach you soon";
        break;
      }
      case "delivered": {
        message =
          "Your order with Order ID " +
          orderId +
          "is has been delivered. Thanks for using Daily Kitchen";
        break;
      }
    }
    const payload = {
      notification: {
        title: "Order " + orderStatus,
        body: message,
        sound: "default",
      },
      data: {
        "click_action": "FLUTTER_NOTIFICATION_CLICK",
        page: "order",
      },
    };

    //"e2etpW2aOzM:APA91bELh_euHssLFq5XwqRh_3tRyKMHQX76m_7VHIMTIUPuzddxEp0xY2_Gx3LBgRvFxzHvzo81tU7SaiDcOiekD1DiHKs9QVBGKrK0YlDg-LQO863nuGuup72KlKNn6u_JuOOCAtwA";
    admin.messaging().sendToDevice(token, payload);
    response.status(200).end();
  }
});
