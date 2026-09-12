const multer = require('multer')

const storage = multer.memoryStorage();

const upload = multer({
    storage:storage,
    limits:{
        //size in bytes
        fileSize: 1024 * 1024 * 10 // 10MB (limit)
    }
})

module.exports = upload;