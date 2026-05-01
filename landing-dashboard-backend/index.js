const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./src/db/db");

dotenv.config();

const productRoute = require("./src/routes/product.routes");
const heroSliderRoute = require("./src/routes/hero.routes");
const videoRouter = require("./src/routes/video.routes");
const userAuthRouter = require("./src/routes/dashboard.user.routes");
const userFrontendRouter = require("./src/routes/frontend.route");

const app = express();
const PORT = process.env.PORT || 8000;

db.connect()
  .then(() => console.log("PG Connected"))
  .catch((err) => console.log("PG Error", err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/heroSlider", heroSliderRoute);
app.use("/api/products", productRoute);
app.use("/api/videos", videoRouter);
app.use("/api/auth", userAuthRouter);
app.use("/api/users", userFrontendRouter);

app.get("/", (req, res) => {
  res.send("Server is running properly");
});

app.listen(PORT, () => console.log("Server Started on PORT:", PORT));
