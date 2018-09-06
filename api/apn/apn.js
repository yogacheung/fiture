var apn  = require("apn")

var options = {
cert: '/srv/www/app.fiture.net/apn/apn-cert.pem', 
key: '/srv/www/app.fiture.net/apn/apn-key.pem', 
gateway: 'gateway.push.apple.com',
// gateway: 'gateway.sandbox.push.apple.com',
// port: 2195,
passphrase:'pass',
errorCallback: errorHappened
}; 

function errorHappened(err, notification){
  console.log("err " + err);
}

var token = "be50211d81c5b71f8de6cdd95dbc81e24ecffbc4d3c6820c6c09ffae6f0c81e9";
var myDevice = new apn.Device(token);
var apnConnection = new apn.Connection(options);

var note = new apn.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 1;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 Get Your Promo Code FitureTest!";
note.payload = {'messageFrom': 'Fiture'};
note.device = myDevice;

apnConnection.sendNotification(note);
apnConnection.shutdown();