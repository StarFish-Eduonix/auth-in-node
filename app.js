import express from "express"
const app = express() 
const PORT = 5000

// database: 
import "./db/db.js"

// models: 
import User from "./models/User.js"

// routes:
import authRouter from "./routes/auth.js"


app.use(express.json()) // middlewear 

app.use(authRouter)





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})







// const customMiddlewear =(req,res,next)=>{
//     console.log("middlewear", req.body.num1)
//     next()
// }

// app.use(customMiddlewear)

// app.get("/hi", (req, res) => {
//     res.send("Hello World")
// })

// app.post("/hello",customMiddlewear, (req, res) => {
//     const num1 = req.body.num1
//     res.send({ num1: num1*num1})
// })