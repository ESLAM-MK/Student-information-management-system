const express = require("express");
const router = express.Router();
const studentDetails = require("../../models/Students/StudentDetails");


router.post("/login", async (req, res) => {
  let { loginid, password } = req.body;
  try {
    // console.log(req.body);
    // console.log('user');
    let user = await studentDetails.student.findOne({enrollmentNo:loginid});
    // console.log(user);
    // console.log(password);
    // console.log(user.password);
    // console.log(user.password);3
    // console.log(user1);
    // console.log(user2);
    // console.log(loginid);
    // console.log('user');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials" });
    }
    if (password !== user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Old Password" });
    }
    const data = {
      success: true,
      message: "Login Successfull!",
      enrollmentNo: user.enrollmentNo,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  let { enrollmentNo, password } = req.body;
  try {
    let user = await studentDetails.student.findOne(req.body);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User With This enrollmentNo Already Exists",
      });
    }
    user = await studentDetails.student.create({
      enrollmentNo,
      password,
    });
    const data = {
      success: true,
      message: "Register Successfull!",
      enrollmentNo: user.enrollmentNo,
      id: user.id,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/update/:id", async (req, res) => {
  let { loginid, password } = req.body;
  try {
    // console.log(req.params.id);
    // console.log(req.body);
    // console.log(req.body.password);
    console.log(req.body);
    console.log("Reuire Body ++++++++++++++++++= ");
    console.log(loginid);

    let user = await studentDetails.student.findOneAndUpdate({enrollmentNo:loginid},{password:password});
    console.log(user);
    console.log("User");
    if (!user) {
      console.log("update");
      console.log(user);
      return res.status(400).json({
        success: false,
        message: "No User Exists!",
      });
    }
    
    const data = {
      success: true,
      message: "Updated Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error 24" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let user = await studentDetails.student.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User Exists!",
      });
    }
    const data = {
      success: true,
      message: "Deleted Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
