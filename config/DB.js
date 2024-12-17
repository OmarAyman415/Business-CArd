const mongoose = require('mongoose');

const DBConnection = async (app,PORT) => {
  try {
    const conn = await mongoose
      .connect(process.env.DATABASE_CONNECTION)
      .then((result) => {
        app.listen(process.env.PORT || PORT, (req, res) => {
          console.log(` app listening at http://localhost:${PORT}`);
        });
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = DBConnection;
