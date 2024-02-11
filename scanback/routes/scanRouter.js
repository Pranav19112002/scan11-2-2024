const express = require("express");
const router = express.Router();
const multer = require("multer");
const Scan = require("../model/scan");
const storage = multer.memoryStorage(); // Store files as buffers in memory
const upload = multer({ storage: storage });

// Route to handle adding a new book
router.post("/addscan", upload.fields([
  { name: "scanImageURL", maxCount: 1 },
  { name: "scanviewUrl", maxCount: 1 },
]), async (req, res) => {
  try {
    const { sid, sname, stype, sdescription, samount,display} = req.body;
    const imageFiles = req.files;

    const newScan = new Scan({
      sid,
      sname,
      stype,
      sdescription,
      samount,
      display,
      scanImageURL: {
        data: imageFiles["scanImageURL"][0].buffer,
        contentType: imageFiles["scanImageURL"][0].mimetype,
      },
      scanviewUrl: {
        data: imageFiles["scanviewUrl"][0].buffer,
        contentType: imageFiles["scanviewUrl"][0].mimetype,
      },
    });

    const savedScan = await newScan.save();
    res.status(201).json(savedScan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getscanbyid/:id", async (req, res) => {
  const scanId = req.params.id;
  try {
    const scan = await Scan.findById(scanId);
    if (scan) {
      res.status(200).json(scan);
    } else {
      res.status(404).json({ error: "Scan not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Other routes for getting all scans, updating, and deleting



router.get('/getallscans', async (req, res) => {
  try {
    const allScans = await Scan.find();
    res.status(200).json(allScans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updatescan/:id', upload.fields([
  { name: 'scanImage', maxCount: 1 },
  { name: 'scanview', maxCount: 1 },
]), async (req, res) => {
  const scanId = req.params.id;
  const updatedScanDetails = req.body;
  const imageFiles = req.files;

  try {
    if (imageFiles) {
      if (imageFiles['scanImage']?.length > 0) {
        updatedScanDetails.scanImage = {
          data: imageFiles['scanImage'][0].buffer,
          contentType: imageFiles['scanImage'][0].mimetype,
        };
      }
      
      if (imageFiles['scanview']?.length > 0) {
        updatedScanDetails.scanview = {
          data: imageFiles['scanview'][0].buffer,
          contentType: imageFiles['scanview'][0].mimetype,
        };
      }
      
    }

    if (Object.keys(updatedScanDetails).length > 0) {
      await Scan.updateOne({ _id: scanId }, { $set: updatedScanDetails });
      res.send('Scan updated successfully');
    } else {
      res.send('No files uploaded. Scan details remain unchanged.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete("/deletescan/:id", async (req, res) => {
  const scanId = req.params.id;
  try {
    const deletedScan = await Scan.findOneAndDelete({ _id: scanId });
    if (deletedScan) {
      res.send("Scan deleted successfully");
    } else {
      res.status(404).send("Scan not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.put('/activate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedScan = await Scan.findByIdAndUpdate(id, { display: true }, { new: true });
    res.status(200).json(updatedScan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to deactivate a scan

router.put('/deactivate/:id', async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }
    scan.display = false; // Assuming 'display' is the property to control scan activation
    await scan.save();
    res.json(scan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;

// http://localhost:3500/scans/addscan