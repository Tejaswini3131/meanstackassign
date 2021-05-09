require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const session = require('express-session');

require('./config/passportConfig');
require('./config/config');

const index = require("./routes/routes")
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api', index);


app.listen(port, () =>{
    console.log(`Server start on port ${port}`)
})