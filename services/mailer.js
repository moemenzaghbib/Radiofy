import nodemailer from 'nodemailer';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'moemen.zaghbib@esprit.tn',
    pass: 'tfcuzcczpgvycogu'
  }
});



export function sendmail(email) {
  var link = `http://localhost:9090/user/verify/${email}` 
  var mailOptions = {
    from: 'zaghbib',
    to: 'developer.mediseo@gmail.com',
    subject: 'Sending Email using Node.js',
    text: `Welcome to RadioFy Application, in this mail you will find attached a link to verify your account,
    this link will exprise in 24 hours ${link} `
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
  };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
