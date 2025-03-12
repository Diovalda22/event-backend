import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";
import db from "./utils/database";

async function init() {
  try {
    // cek koneksi ke database
    const result = await db();
    console.log("database status", result);

    // inisialisasi express dan port
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Welcome to my Event API",
      });
    });

    // middleware untuk membaca body dari request
    app.use(bodyParser.json());
    // routing
    app.use("/api", router);
    // jalankan server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
