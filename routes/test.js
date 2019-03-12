const express = require("express");
const router = express.Router();
const client = require("smartsheet");

const smartsheet = client.createClient({
  accessToken: "aksaq5q2t2l3vtbc478h5cntmm"
});

router.get("/", (req, res) => res.json({ msg: "api test" }));

router.get("/current-user", (req, res) => {
  smartsheet.users
    .getCurrentUser()
    .then(function(userProfile) {
      res.json(userProfile);
    })
    .catch(function(error) {
      console.log(error);
    });
});

router.get("/list-sheets", (req, res) => {
  var options = {
    queryParameters: {
      include: "attachments",
      include: "source",
      includeAll: true
    }
  };

  smartsheet.sheets
    .listSheets(options)
    .then(function(response) {
      res.json(response);
    })
    .catch(function(error) {
      console.log(error);
    });
});

router.get("/get-sheet/:id", (req, res) => {
  var options = {
    id: req.params.id // Id of Sheet
  };

  // Get sheet
  smartsheet.sheets
    .getSheet(options)
    .then(function(sheetInfo) {
      res.json(sheetInfo);
    })
    .catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
