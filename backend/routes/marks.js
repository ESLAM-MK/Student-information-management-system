const express = require("express");
const router = express.Router();
const Marks = require("../models/Other/Marks");
const { mquery } = require("mongoose");

router.post("/getMarks", async (req, res) => {
  try {
    let Mark = await Marks.find(req.body);

    if (!Mark) {
      return res
        .status(400)
        .json({ success: false, message: "Marks Not Available" });
    }
    const data = {
      success: true,
      message: "All Marks Loaded!",
      Mark,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.get("/getAllMarks", async (req, res) => {
  try {
    let Mark = await Marks.find({});

    if (!Mark) {
      return res
        .status(400)
        .json({ success: false, message: "Marks Not Available" });
    }
    const data = {
      success: true,
      message: "All Marks Loaded!",
      Mark,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addMarks", async (req, res) => {
  let { enrollmentNo, external } = req.body;
  try {
    let mark = await Marks.findOne({ enrollmentNo });
    if (mark) {

      const newSubjectMark = external[0];
      const subject = Object.keys(newSubjectMark)[0];
      const value = newSubjectMark[subject];


      // Find index of the subject in the external array
      const existingSubjectIndex = mark.external.findIndex(e => e.has(subject));
      if (existingSubjectIndex > -1) {
        // Update existing subject
        mark.external.splice(existingSubjectIndex, 1);
        mark.external.push(new Map([[subject, value]]));
      } else {
        // Add new subject
        mark.external.push(new Map([[subject, value]]));
   
      }
      await mark.save();
      res.json({ success: true, message: "Marks Updated!" });
    } else {

      // If no mark exists, create a new one
      await Marks.create({ enrollmentNo, external: [new Map(Object.entries(external[0]))] });
      res.json({ success: true, message: "Marks Added!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});




router.post('/updateMarksBySubject', async (req, res) => {
  const { subject, additionalDegree } = req.body;
 
  try {
    // Step 1: Find documents with the specific subject in the external array
    const marksToUpdate = await Marks.find({ [`external.${subject}`]: { $exists: true } });
    
    // Step 2: Update each document
    const updatePromises = marksToUpdate.map(async (doc) => {
      const existingSubjectIndex = doc.external.findIndex(e => e.has(subject));
      // const currentValue = parseInt(doc.external[subject]);
      // Modify the specific subject's mark by adding additionalDegree to its existing value
       doc.external.map((subj) => {
        subj.forEach((value,key)=>{
          
          if (key === subject) {
            const currentValue = value; // Assuming the values are stored as strings
            const updatedValue = parseInt(currentValue) + parseInt(additionalDegree);
            console.log("معانا");
            if (existingSubjectIndex > -1) {
              // Update existing subject
              doc.external.splice(existingSubjectIndex, 1);
              doc.external.push(new Map([[subject, updatedValue]]));
            }
          }else{
              console.log("مش معانا");
              return subj;
          }
        }
        )
        
      });
      console.log("Finally");
      // console.log(x);
      console.log(existingSubjectIndex);
     
      // console.log(currentValue);
      // doc.external =

      // Save the updated document
      return doc.save();
    });
    console.log(updatePromises);
    // Wait for all updates to complete
    await Promise.all(updatePromises);

    res.json({ success: true, message: 'Marks updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});


// router.post("/addMarks", async (req, res) => {
//   let { enrollmentNo  , external } = req.body;
//   try {
//     let Mark = await Marks.findOne({ enrollmentNo });
//     if (Mark) {
//       // await Marks.findByIdAndUpdate(Mark._id, req.body);
//       if (Array.isArray(external)) {
//         mark.external = mark.external.concat(external); // Append new external marks
//       }
//       const data = {  
//         success: true,
//         message: "Marks Added!",
//       };
//       res.json(data);
//     } else {
//       await Marks.create(req.body);
//       const data = {
//         success: true,
//         message: "Marks Added!",
//       };
//       res.json(data);
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

router.delete("/deleteMarks/:id", async (req, res) => {
  try {
    let mark = await Marks.findByIdAndDelete(req.params.id);
    if (!mark) {
      return res
        .status(400)
        .json({ success: false, message: "No Marks Data Exists!" });
    }
    const data = {
      success: true,
      message: "Marks Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
