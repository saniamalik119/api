const { response } = require("express");
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
//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
const { Configuration, OpenAIApi } =require( "openai");
const configuration = new Configuration({
    organization: "org-FxyBKHPOV4nGalm4HMOSb8GS",
    apiKey: "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",

});
app.use(express.json())

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) =>{
    res.json({
        message: "sania"
    })
})
app.post("/chat", (req, res)=>{
    const question = req.body.question
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 100,
        temperature: 0,
      }).then((response) =>{
        return(response.data.choices[0].text)
      }).then((answer) =>{
        res.json({
            answer: answer,
            prop: question
        })
        console.log(question)
      });
    


})

app.listen(3000, () => console.log("everything is ok"))