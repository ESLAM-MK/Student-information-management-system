const express = require("express");
const router = express.Router();
let studentDetails = require("../../models/Students/StudentDetails");
const { count } = require("../../models/Other/Subject");

router.post("/getDetails", async (req, res) => {
  try {
    let user = await studentDetails.student.find(req.body);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Student Found" });
    }
    const data = {
      success: true,
      message: "Student Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error 1" });
  }
});

router.post("/addDetails", async (req, res) => {
  try {
    let count1;
    if(req.body.semester === "0"){
      console.log("prep");
       count1 = "2024" +  (await studentDetails.prep.countDocuments() + 1).toString().padStart(3,"0");
       req.body.enrollmentNo = Number(count1)
      user = await studentDetails.prep.create(req.body);
    }
    else if(req.body.semester === "1"){
      console.log("prep1");
      count1 = "2023" + (await studentDetails.first.countDocuments() + 1).toString().padStart(3,"0");
      console.log(count1);
      req.body.enrollmentNo = Number(count1)
      user = await studentDetails.first.create(req.body);
    }
    else if(req.body.semester === "2"){
      console.log("prep2");
      count1 = "2022" +(await studentDetails.second.countDocuments() + 1).toString().padStart(3,"0");
      console.log(Number(count1));
      req.body.enrollmentNo = Number(count1)
      user = await studentDetails.second.create(req.body);
    }
    else if(req.body.semester === "3"){
      console.log("prep3");
      count1 = "2021" + (await studentDetails.third.countDocuments() + 1).toString().padStart(3,"0");
      console.log(Number(count1));
      req.body.enrollmentNo = count1
      user = await studentDetails.third.create(req.body);
    }
    else if(req.body.semester === "4"){
      console.log("prep4");
      count1 ="2020"  + (await studentDetails.forth.countDocuments() + 1).toString().padStart(3,"0");
      req.body.enrollmentNo = Number(count1)
      user = await studentDetails.forth.create(req.body);
    }
    await studentDetails.student.create(req.body)
    // console.log(count.toString().padStart(3, '0'));
    const data = {
      success: true,
      message: `Student Details Added! ID => ${count1}  default password => 112233`,
      user,
    };
    res.json(data);
 
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message:error.message });
  }
});


router.get("/getallStudents", async (req, res) => {
  try {
    let user = await studentDetails.student.find();

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Student Found" });
    }
    const data = {
      success: true,
      message: "Student Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error 1" });
  }
});


router.post("/updateDetails/:id", async (req, res) => {
  try {
    let user = await studentDetails.student.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Student Found",
      });
    }
    const data = {
      success: true,
      message: "Updated Successfull!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error 3" });
  }
});

router.delete("/deleteDetails/:id", async (req, res) => {
  let { id } = req.body;
  try {
    let user = await studentDetails.student.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Student Found",
      });
    }
    const data = {
      success: true,
      message: "Deleted Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error 4" });
  }
});

router.get("/count", async (req, res) => {
  try {
    let user = await studentDetails.student.count(req.body);
    const data = {
      success: true,
      message: "Count Successfull!",
      user,
    };
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error 5", error });
  }
});

module.exports = router;
