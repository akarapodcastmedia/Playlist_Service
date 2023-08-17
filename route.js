const express = require("express");
const router  = express.Router();
const db = require("./db/mongoConfig");
const { createPlaylist, deletePlaylist, addPodcastToPlaylist, deletePodcastFromPlaylist, getAllPlaylistByUser, getAllPodcastAllPlaylistByuser ,getAllpodcast} = require("./util/playlistLogic");
db();
// =================================
// initializaton of Playlist section 
//==================================

//==============================
// -> create Playlist route
//=============================== 
router.post('/create/playlist',async(req,res)=>{
    const playlistName = req.body.playlistName;
    const credent = req.email;
    try{
        const data = await createPlaylist(credent,playlistName);
        return res.json({
            error : false,
            message : "success",
            data
        });
    }catch(e){
        return res.send(e.message);
    }
   
})
//==============================
// -> delete playlist
//===============================
router.post('/delete/playlist',async(req,res)=>{
   const credent = req.email;
   const playlist_id = req.body.playlist_id;
   const data = await deletePlaylist(credent,playlist_id);
   return res.json({
        error : false,
        message : "success",
        data
   });
})

//=======================================
// add podcast to a particular playlist
//========================================
router.post('/add/podcast/playlist',async(req,res)=>{
    const credent = req.email;
    const podcast_id = req.body.podcast_id ;
    const playlist_id = req.body.playlist_id;
    const data = await addPodcastToPlaylist(credent,podcast_id,playlist_id);
    return res.json({
        error : false,
        message : "success",
        data
    });
})

//=============================================
// delete podcast from a particular playlist
//=============================================
router.post('/delete/podcast/playlist',async(req,res)=>{
    const credent = req.email;
    const podcast_id = req.body.podcast_id ;
    const data = await deletePodcastFromPlaylist(credent,podcast_id);
    return res.json({
        error:false,
        message : "success",
        data
    });
});
//============================================
// get all playlist
//============================================
 router.get('/get/all/playlist',async(req,res)=>{
    const credent = req.email;
    const data = await getAllPlaylistByUser(credent);
    return res.json({
        error : false,
        message : "success",
        data 
    }) ;
 })
//=====================================================
// get all podcast of a particular paylist
//=====================================================
 router.get('/get/all/playlist/podcast',async(req,res)=>{
    const credent = req.email;
    const playlist_id = req.body.playlist_id;
    const data = await getAllPodcastAllPlaylistByuser(credent,playlist_id);
    return res.json({
        error : false,
        message : "Get success",
        data
    });
 });

 //===============================================
 // get all podcaste related to a particular user
 //===============================================
 router.get('/get/podcast/all',async(req,res)=>{
    const credent = req.email;
    const data = await getAllpodcast(credent);
    return res.json({
        error : false,
        message : "success",
        data
    })
 })
//====================================
// completion of playlistPodcast section
//====================================


module.exports= router;