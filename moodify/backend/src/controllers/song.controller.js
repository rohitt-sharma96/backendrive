const storageService = require('../services/storage.service')
const songsModel = require('../models/songs.model')
const id3 = require('node-id3')



const uploadSong = async (req, res) => {

    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(songBuffer)

    /* not optimal -> pehle ek upload ho raha h (songFile)
    //              -> then dusra upload ho rha ha (posterFile)
    
    const songFile = await storageService.uploadFile({
         buffer: songBuffer,
         filename: tags.title + ".mp3",
         folder:"/demo-4/moodify/songs"
     })
     const posterFile = await storageService.uploadFile({
         buffer: tags.image.imageBuffer,
         filename: tags.title + ".jpeg",
         folder:"demo-4/moodify/posters"
     })
    */

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/demo-4/moodify/songs"
        }),

        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/demo-4/moodify/posters"
        })
    ])

    const song = await songsModel.create({
        url: songFile.url,           //play song
        posterUrl: posterFile.url,  // post image
        title: tags.title,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })
}

const getSong = async (req, res) => {
    const { mood } = req.query

    const song = await songsModel.findOne({ mood }, )


    res.status(200).json({
        message:"song fetched successfully",
        song
    })
}

module.exports = { uploadSong, getSong}