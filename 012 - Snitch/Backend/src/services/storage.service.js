import ImageKit, { toFile } from '@imagekit/nodejs';
import { config } from '../config/config.js';

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});


export const uploadFile = async ({ buffer, fileName, folder = 'snitch' }) => {

    const result = await client.files.upload({
        file: await toFile(Buffer.from(buffer), 'file'),
        fileName,
        folder
    });


    return result;
}
