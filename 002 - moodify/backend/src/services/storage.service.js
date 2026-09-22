const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});


const uploadFile = async ({ buffer, filename, folder = "" }) => {

    const file = await client.files.upload({
        file: await toFile(Buffer.from(buffer), 'file'),
        fileName: filename,
        folder
    });

    return file
}

// async function uploadFile({buffer, filename, folder=""}){

//     const file = await client.files.upload({
//         file: await ImageKit.toFile(Buffer.from(buffer)),
//         fileName: filename,
//         folder
//     });

//     return file
// }

module.exports = {uploadFile}; 