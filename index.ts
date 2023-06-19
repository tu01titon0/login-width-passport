import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoutes from "./src/router/authRouter";
import passport from "./src/middleware/passport";
import session from "express-session";

const PORT = 3000;
const app = express();

const DB_URL = 'mongodb://localhost:27017/';
mongoose.connect(DB_URL)
 .then(() => console.log('DB Connected!'))
 .catch(error => console.log('DB connection error:', error.message));

app.set("view engine", "ejs");
app.set('views', './src/views');
app.use(bodyParser.json());

app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));
   
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
 console.log("App running on port: " + PORT)
})
