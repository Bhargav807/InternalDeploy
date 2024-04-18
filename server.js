import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from "cors";
import CategoryRoutes from "./routes/CategoryRoutes.js"
import CommodityRoutes from "./routes/CommodityRoutes.js"
import UserRoutes from "./routes/UserRoutes.js"
import EquipmentRoutes from "./routes/EquipmentRoutes.js"
import RequirementRoutes from "./routes/RequirementRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import coldroutes from "./routes/coldroutes.js"
import path from 'path';
import { fileURLToPath } from 'url';

//configure environment
dotenv.config();

//database configs
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middlewaresf
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/build')))


//routes all
app.use("/api/v1/auth", authRoutes);


//category routes
app.use("/api/v1/category", CategoryRoutes)


//for products
app.use("/api/v1/products", CommodityRoutes)


//for equipment
app.use("/api/v1/equipment",EquipmentRoutes)

//for requirements posting and chat conversational
app.use("/api/v1/requirements",RequirementRoutes)

//for posting in chats
app.use("/api/v1/chats",chatRoutes)

//to get userdata
app.use("/api/v1/users", UserRoutes)

////to get userdata
app.use("/api/v1/cold", coldroutes)

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>world</h1>");
// });
app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});



//const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT} `.bgCyan.white);
});



