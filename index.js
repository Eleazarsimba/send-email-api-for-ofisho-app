const express = require('express');
const app = express();

const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser')

const port = 4000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// define transport for email
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: 'eleazarsimba3000@gmail.com',
      pass: 'ecqipljofwnplrim'
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
app.listen(port, () => {
    console.log(`The app is running in port ${port}`);
})
