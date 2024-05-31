let mongoose = require("mongoose");
let nodemon = require("nodemon");
let express = require("express");
let cors = require("cors");

let app = express();

app.use(cors());

app.get("/countriesList", async (req, res) => {
  let countriesList = await Employee.find().distinct("country");
  res.json(countriesList);
});
app.get("/departmentList", async (req, res) => {
  let departmentList = await Employee.find().distinct("department");
  res.json(departmentList);
});
app.get("/genderList", async (req, res) => {
  let genderList = await Employee.find().distinct("gender");
  res.json(genderList);
});

app.get("/employees", async (req, res) => {
  console.log(req.query);
  let employees = await Employee.find().and([
    { country: req.query.country },
    { department: req.query.department },
    { gender: req.query.gender },
  ]);
  res.json(employees);
});

// app.get(
//   "/employees/:countryName/:genderName/:departmentName",
//   async (req, res) => {
//     console.log(req.params);
//     let employees = await Employee.find()
//       .and([
//         { country: req.params.countryName },
//         { department: req.params.departmentName },
//         { gender: req.params.genderName },
//       ])
//       .sort(req.params.order == "desc" ? "-id" : "id");
//     res.json(employees);
//   }
// );
app.listen(4444, () => {
  console.log("Listening to port 4444");
});

let employeeSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  age: Number,
  profilepicture: String,
  country: String,
  salary: Number,
});

let Employee = new mongoose.model("employee", employeeSchema);

let connectToMongoDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://jeevanrdy:jeevanrdy@skynet.ycaxxus.mongodb.net/FakeOffice?retryWrites=true&w=majority&appName=SkyNet"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB");
  }
};

connectToMongoDB();
