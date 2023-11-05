import express from 'express'
import * as dotenv from 'dotenv'
import OpenAI from 'openai';

dotenv.config()

const router = express.Router()

// use the api key
const configuration = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// create an instance of openai
const openai = new OpenAI(configuration)

// demo route
router.route('/').get((req, res) =>
{
    res.send("Hello from dalleRoutes.js file!")
})

router.route('/').post(async (req, res) => 
{
    try 
    {
        // the prompt sent by the user from the frontend
        const { prompt } = req.body

        // generate an image with the following parameters
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })

        // get the image
        const image = aiResponse.data.data[0].b64_json;
        // console.log(aiResponse.data)

        // send the image
        res.status(200).json({ photo: image })
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).send(error)
    }
})


export default router