require("dotenv").config();
const app=require("./src/app.js");


app.listen(3002,()=>{
    console.log("Server is running on port 3002");
})
console.log("Gemini Key:", process.env.GOOGLE_GEMINI_KEY);

