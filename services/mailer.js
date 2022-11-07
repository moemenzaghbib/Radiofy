import nodemailer from 'nodemailer';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'moemen.zaghbib@esprit.tn',
    pass: 'tfcuzcczpgvycogu'
  }
});

var mailOptions = {
  from: 'zaghbib',
  to: 'developer.mediseo@gmail.com',
  subject: 'Sending Email using Node.js',
  text: `moemen ytesti`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

export function sendmail() {
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
