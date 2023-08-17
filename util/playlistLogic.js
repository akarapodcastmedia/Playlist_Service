const { signupModel, playlistModel, playlistPodcastsModel, podcastModel, favoriteModel } = require("../db/schema");
// create playlist

async function createPlaylist(email,playlistName){
    const user = await signupModel.findOne({email : email});
    const isExistPlaylist = await playlistModel.findOne({playlistName:playlistName});
    if(user){
        if(isExistPlaylist){
            return "already exist this playlist"
        }else{
             //insert to database
            const inserter = new playlistModel({
                playlistName : playlistName,
                userId : user._id
            });
            // save to database
            await inserter.save();
            return "success";
        }    
    }else{
        return "No data";
    }
}
//  delete podcast from playlist
async function deletePodcastFromPlaylist(email,podcast_id){
    const user = await signupModel.findOne({email : email});
    if(user){
        // delte podcast from playlist 
        const deleter = await playlistPodcastsModel.deleteOne({userId : user._id, podcastId : podcast_id});
        return "delete from playlist success";
    }else{
        return "No data";
    }
}
// get playlist by user 
let podcastID = [];
async function getAllPodcastAllPlaylistByuser(email,playlist_id){
    const user = await signupModel.findOne({email : email});
    if(user){
        // get podcast from playlist 
        const geter = await playlistPodcastsModel.find({userId : user._id,playlistId : playlist_id}).select("podcastId");
        const favourite = await favoriteModel.find({userId : user._id});
        podcastID=[];
        for(let id of geter){
            podcastID.push(id.podcastId);
        }
        const data = await  podcastModel.find({_id : {$in : podcastID}});
        if(favourite){
            console.log("welcome")
            for(let podcast of data){
                for(let favour of favourite){
                    if(podcast._id == favour.podcastId){
                        podcast.favourite= true;
                    }
                }
            }
        } 
        return data;
    }else{
        return "No data";
    }
}
async function getAllpodcast(email){
    const user = await signupModel.findOne({email : email});
    if(user){
        const geter = await playlistPodcastsModel.find({userId : user._id});
        const favourite = await favoriteModel.find({userId : user._id});
        podcastID=[];
        for(let id of geter){
            podcastID.push(id.podcastId);
        }
        const data = await podcastModel.find({_id : {$in : podcastID}});
        if(favourite){
            console.log("welcome")
            for(let podcast of data){
                for(let favour of favourite){
                    if(podcast._id == favour.podcastId){
                        podcast.favourite= true;
                    }
                }
            }
        } 
        return data;
    }else{
        return "No data";
    }
}
async function getAllPlaylistByUser(email){
    // find the user is really exist in database
    const user = await signupModel.findOne({email: email});
    if(user){
        // find all the playlist that this user created
        const playlists = await playlistModel.find({userId : user._id});
        
        if(playlists){
            return playlists;
        }else{
            return "No playlist";
        }
    }else{
        return "No data";
    }
}
// add podcast to playlist
async function addPodcastToPlaylist(email,podcast_id,playlist_id){
    const user = await signupModel.findOne({email : email});
    if(user){
        const adder = new playlistPodcastsModel({
            playlistId : playlist_id,
            podcastId : podcast_id,
            userId : user._id
        })
        // save to the database
        await adder.save();
        return "add to playlist success";
    }else{
        return "No data";
    }
}
// delete playlist
async function deletePlaylist(email,playlistId){
    const user = await signupModel.findOne({email : email});
    if(user){
        const playlist = await playlistModel.findOne({_id : playlistId, userId : user._id});
        if(playlist){
            // delete all the podcasts related to this podcast
            const deletePodcast = await playlistPodcastsModel.deleteMany({podcastId : playlist._id});
            const deletePlaylist = await playlistModel.deleteOne({_id : playlist._id});
            return "delete playlist success";
        }else{
            return "no playlist";
        }
    
    }else{
        return "No data";
    }
}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getAllPlaylistByUser,
    getAllPodcastAllPlaylistByuser,
    addPodcastToPlaylist,
    deletePodcastFromPlaylist,
    getAllpodcast
}
