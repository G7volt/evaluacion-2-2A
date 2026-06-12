import express, { Router } from "express";
import logOutController from "../controller/logOutController.js"

const logOutRoute = express.Router();

logOutRoute.route("/")
.post(logOutController.logOut);