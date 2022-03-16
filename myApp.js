import axios from 'axios';
import { joinImages } from 'join-images';
// declaring params object
let params = {
    greeting: 'Hello',
    who: 'You',
    width: 400,
    height: 500,
    color: 'Pink',
    size: 100,
};
const url1 = `https://cataas.com/cat/says/${params.greeting}?width=${params.width}&height=${params.height}&color${params.color}&s=${params.size}`;
const url2 = `https://cataas.com/cat/says/${params.who}?width=${params.width}&height=${params.height}&color${params.color}&s=${params.size}`;
/**
 * params : will take url paths of the images need to combine
 * return : function will return combined image
*/
async function combinedImageGen(url1, url2) {
    try {
        async function imageBufferGen(url) {
            const response = await axios(url, { responseType: 'arraybuffer' })
            const buffer = Buffer.from(response.data, 'binary')
            return buffer
        }
        const bufferImageOne = await imageBufferGen(url1);
        const bufferImageTwo = await imageBufferGen(url2);


        joinImages([bufferImageOne, bufferImageTwo], { direction: "horizontal" }).then((image) => {
            // Save combined image as file
            image.toFile('combined.png');
            console.log("The file was saved!");
        }).catch((error) => {
            console(`Join image processing unsuccessful`, error);
        });
    } catch (error) {
        console.log(`combinedImageGen main function failed`, error);
    }
}

combinedImageGen(url1, url2);

/***
 * -------------------------------------------------------------------
 * key partices followed
 * 
 * 1. Used ES6 practices for importing packages
 * 2. Used ES6 template literals when defining urls
 * 3. Used async/await to make calls asnchronously 
 * 4. Used axios make code more cleaner, high performance and more secure 
 * 5. Used joinImages library make lesser and cleaner code.
 * 6. Also handle exception using try/catch
 * 7. make the code reusable by supporing parameters to imageBufferGen and combinedImageGen functions
 */