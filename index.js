const express = require("express");
const PORT = 8000;
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//to parse form data
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  return res.render("homepage");
});
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("profileImg"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, () => console.log("server connected"));
