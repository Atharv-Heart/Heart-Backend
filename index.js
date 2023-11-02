const express = require("express");
const mongoose = require("mongoose");


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());




app.get("/hello", (req,res)=>{
    res.return()
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
