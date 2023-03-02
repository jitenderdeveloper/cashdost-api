const express = require("express");
const router = express.Router();
const UserData = require("../modules/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "4715aed3c946f7b0f74f472fdd9j9j7h7h7jy804700770d572af3dce43625dd";
const VerifyMalier = require('nodemailer')


const sendVerifyMail = async (username, email, userId) =>{
  try {
    const transporter = VerifyMalier.createTransport({
      host:'smtp.gmail.com',
      port:25,
      secure:false,
      requireTLS:false,
      auth:{
        user:'davidstark0741@gmail.com',
        pass:'chrpimqkxgocegkg'
      }
    })
    const mailOption = {
      from:'davidstark0741@gmail.com',
      to:email,
      subject:'For Verify E-mail',
      html:'<p>Hii '+ username +', please click here to <a href=" http://localhost:3000/EmailVerify?id='+userId+' "> Verify </a> your mail</p>'
    }
    // console.log("mail data -->",mailOption);

    transporter.sendMail(mailOption, function(error, info){
      if (error) {
        console.log('send mailer error ---->',error);
      } else {
        console.log("email is send", info.response);
      }
    })
  } catch (error) {
    res.status(400).json({
      message: "nodemailer not working...",
      register_data: result,
    });
  }
}


router.get("/register", (req, res) => {
  try {
    UserData.find().then((result) => {
      res.status(200).json({
        message: "Register is working...",
        register_data: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "user error",
    });
  }
});

router.post("/register", (req, res) => {
  const { username, email, phone, password, role, isVerify } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      UserData.create({
        username: username,
        email: email,
        phone: phone,
        password: hash,
        role: role,
        isVerify: isVerify
      })
        .then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.status(201).json({
            message: "User successfully created. Please verify your mail.",
            user: {
              username: username,
              role: role,
              token: token,
            },
          });
          
          sendVerifyMail(req.body.username, req.body.email, user._id)
        })
        .catch((error) => {
          res.status(400).json({
            message: "User are already exits please login",
            error: error.message,
          });
        });
    });
  } catch (err) {
    res.status(401).json({
      message: "User not successful created Please try again.",
      error: err.mesage,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not Present",
    });
  }
  try {
    const user = await UserData.findOne({ username });
    if (!user) {
      res.status(400).json({
        message: "User not Exits",
        error: "User not found",
      });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.status(200).json({
            message: "User successfully Logged in",
            username: username,
            token: token,
          });
        } else {
          res.status(400).json({ message: "User not found" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.put("/update", async (req, res) => {
  const { role, id } = req.body;
  // First - Verifying if role and id is presnt
  if (role && id) {
    // Second - Verifying if the value of role is admin
    if (role === "admin") {
      // Finds the user with the id
      await UserData.findById(id)
        .then((user) => {
          // Third - Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
  }
});

router.delete("/update", async (req, res) => {
  const { id } = req.body;
  await UserData.findById(id)
    .then((user) => user.remove())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
});


router.get('/EmailVerify', async (req, res) =>{
  try {
    const verify_data = await UserData.updateOne({_id:req.query.id}, { $set:{ isVerify: true}});
    console.log("your email verify data --->",req.query.id);

    res.render('/EmailVerify')

  } catch (error) {
    res.status(400).json({
      message: "Verify is wrong...",
      error: error.message,
    });
  }
})

module.exports = router;
