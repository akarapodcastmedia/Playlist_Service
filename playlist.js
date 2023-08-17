require("dotenv").config();
// express
const express = require("express");
const cors = require("cors");
const playlist = express();
playlist.use(express.json());
playlist.use(express.urlencoded({extended : true}));
const router = require("./route");
const { middlewarer } = require("./util/middleware");
playlist.use(cors());

playlist.use('/playlist',middlewarer,router);
playlist.listen(process.env.PORT,()=>console.log(`Playlist service is being listened at PORT ${process.env.PORT} `));
