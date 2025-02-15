const express = require('express');
const  mongoose  = require('mongoose');
const productRoute = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const Product = require("./module/product.module.js");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();


app.use(express.json());
app.use(cors());

dotenv.config();

app.get('/', function (req, res) {
  res.send('HELLO EVAKEMS')
})
// routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoutes);



app.listen(process.env.PORT, () => {
    console.log('server is running in port 8500');
});



mongoose
.connect(
    process.env.MONGO_URL
)
.then(()  =>  {
    console.log("database connected");
})
.catch(() =>  {
    console.log("database not connected")
});