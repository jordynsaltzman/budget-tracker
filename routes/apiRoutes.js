const db = require("../models");

const apiRoutes = app => {
  app.post("/api/budget/:type", (req, res) => {
    let newBudget = req.body;
    db.Budget.create(newBudget).then(data => {
      db.Budget.find({}).then(allTransactions => {
        res.json(allTransactions);
      });
      //   res.json(data);
    });
  });

  app.get("/api/budget", (req, res) => {
    db.Budget.find({})
      .sort({ date: 1 })
      .then(allTransactions => {
        res.json(allTransactions);
      });
  });
};
module.exports = apiRoutes;
