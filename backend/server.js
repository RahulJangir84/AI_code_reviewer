require("dotenv").config();
const app=require("./src/app.js");

const port=process.env.PORT || 3002;


app.listen(port,()=>{
    console.log("Server is running on port 3002");
})
console.log("Gemini Key:", process.env.GOOGLE_GEMINI_KEY);

