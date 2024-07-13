const express = require("express");
const router = express.Router();
const ExamsAns = require("../models/Other/ExamsAns")
//  all
router.get("/getExamsAns", async (req, res) => {
  try {
    let exam = await ExamsAns.find({});
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
router.get("/getExamsAns0", async (req, res) => {
  try {
    let exam = await ExamsAns.find({});
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
router.get("/getExamsAns1", async (req, res) => {
  try {
    let exam = await ExamsAns.find({});
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
router.get("/getExamsAns2", async (req, res) => {
  try {
    let exam = await ExamsAns.find({});
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
router.get("/getExamsAns3", async (req, res) => {
  try {
    let exam = await ExamsAns.find({});
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
router.get("/getExamsAns4", async (req, res) => {
  try {
    let exam = await ExamsAns.find({});
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




// id 
//  Prep
router.post("/getExamsAnsId0", async (req, res) => {
  try {
    let {userId} = req.body
    let exam = await ExamsAns.find({userId});
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
router.post("/getExamsAnsId1", async (req, res) => {
  try {
    let {userId} = req.body
    let exam = await ExamsAns.find({userId});
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
router.post("/getExamsAnsId2", async (req, res) => {
  try {
    let {userId} = req.body
    let exam = await ExamsAns.find({userId});
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
router.post("/getExamsAnsId3", async (req, res) => {
  try {
    let {userId} = req.body
    let exam = await ExamsAns.find({userId});
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
router.post("/getExamsAnsId4", async (req, res) => {
  try {
    let {userId} = req.body
    let exam = await ExamsAns.find({userId});
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


router.post("/addExamsAns", async (req, res) => {
  try {
      await ExamsAns.create(req.body);
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


router.delete("/deleteExamsAns/:id", async (req, res) => {
  try {
    let mark = await ExamsAns.findByIdAndDelete(req.params.id);
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
