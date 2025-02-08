const express = require('express');
const  mongoose  = require('mongoose');
const productRoute = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const Product = require("./module/product.module.js");
const cors = require("cors");
const app = express();


app.use(express.json());

app.get('/', function (req, res) {
  res.send('HELLO EVAKEMS')
})
// routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoutes);

app.use(cors());

app.listen(8500, () => {
    console.log('server is running in port 8500');
});



mongoose
.connect(
    "mongodb+srv://drevanskemka:S3QlGhtMKrcJrKHv@cluster0.l2tby.mongodb.net/"
)
.then(()  =>  {
    console.log("database connected");
})
.catch(() =>  {
    console.log("database not connected")
});