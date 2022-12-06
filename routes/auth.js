const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  if (newUser) {
    res.json({ done: true })
  } else {
    res.json({ done: false })
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return console.log("wrong")

    //  !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/loginn", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });
    var hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    var newPass = hashedPassword.toString(CryptoJS.enc.Utf8)
    console.log(newPass)
    if (!user) {
      res.json("User Does Not Exists")
    }

    else {
      if (req.body.password == newPass) {
        res.json({user1: user})
      }
      else {
        res.json("Incorrect Password")
      }
    }
  } catch (err) {
    res.json("User Does Not Exists")
  }
});

module.exports = router;
