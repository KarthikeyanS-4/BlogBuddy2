const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", require("./route/route"));

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
