const express = require("express");
const router = express.Router();
const Exams = require("../models/Other/Exams");

//  all
router.get("/getExams", async (req, res) => {
  try {
    let exam = await Exams.find({});
    const data = {
      success: true,
      message: "All Examses Loaded!",
      exam,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message:error.message });
  }
});
//  Prep
router.get("/getExams0", async (req, res) => {
  try {
    let exam = await Exams.find({});
    let examFilter = exam.filter((e)=>e.semester==="0")
    const data = {
      success: true,
      message: "All Examses Loaded!",
      examFilter,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message:error.message });
  }
});

//  First
router.get("/getExams1", async (req, res) => {
  try {
    let exam = await Exams.find({});
    let examFilter = exam.filter((e)=>e.semester==="1")
    const data = {
      success: true,
      message: "All Examses Loaded!",
      examFilter,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message:error.message });
  }
});

//  Second
router.get("/getExams2", async (req, res) => {
  try {
    let exam = await Exams.find({});
    let examFilter = exam.filter((e)=>e.semester==="2")
    const data = {
      success: true,
      message: "All Examses Loaded!",
      examFilter,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message:error.message });
  }
});

//  Third
router.get("/getExams3", async (req, res) => {
  try {
    let exam = await Exams.find({});
    let examFilter = exam.filter((e)=>e.semester==="3")
    const data = {
      success: true,
      message: "All Examses Loaded!",
      examFilter,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message:error.message });
  }
});

//  Fourth
router.get("/getExams4", async (req, res) => {
  try {
    let exam = await Exams.find({});
    let examFilter = exam.filter((e)=>e.semester==="4")
    const data = {
      success: true,
      message: "All Examses Loaded!",
      examFilter,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message:error.message });
  }
});


router.post("/addExams", async (req, res) => {
  try {
      await Exams.create(req.body);
      const data = {
        success: true,
        message: "Exams Added!",
      };
      res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});


router.delete("/deleteExams/:id", async (req, res) => {
  try {
    let mark = await Exams.findByIdAndDelete(req.params.id);
    if (!mark) {
      return res
        .status(400)
        .json({ success: false, message: "No Exams Data Exists!" });
    }
    const data = {
      success: true,
      message: "Exams Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;
