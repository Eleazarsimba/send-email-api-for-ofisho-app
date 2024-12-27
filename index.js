const express = require('express');
const app = express();
require('dotenv').config()
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// define transport for email
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: '',
      pass: ''
    }
  });

app.get('/', (req, res) => {
   res.send('Welcome')
});
app.post('/', (req, res) => {
    var mail = {
        to: req.body.email,
        subject: 'Account creation with Ofishoo Tips',
        html: 'Your account with Ofishoo Tips as an admin was created successfully. Use default password "OfishoTip". You can reset your password using the forgot password option on the Login page.'
      }

      transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err)
          res.json({
            msg: 'fail'
          })
        } else {
          res.json({
            msg: 'success'
          })
        }
      })
})
app.listen(process.env.PORT || 3002, () => {
    console.log(`The app is running in port ${process.env.PORT}`);
})
