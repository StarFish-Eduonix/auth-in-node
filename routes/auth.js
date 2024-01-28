import express from 'express';  
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import checkLogin from '../middlewear/checkLogin.js';
import bcrypt from 'bcrypt';


const authRouter = express.Router(); 


// signup: 
// 1) name, email and password 
// 2) basic conditons 
// 3) email is already not registered  
// 4) save user in database

authRouter.post("/signup", (req,res)=>{
    // const name = req.body.name
    // const email = req.body.email
    // const password = req.body.password 
    // destructuring: 
      const {name, email, password} = req.body

      // basic conditions: 
      // condition 1
      if(!name || !email || !password){
          return res.json({error: "Please fill all the fields"})
      }
        // condition 2
        // if valid email 

        // condition 3
        // if password is strong password or not
    
    // check if email is already registered:
     User.findOne({email:email})
     .then(foundUser => {
            console.log(foundUser)
            if(foundUser){
                return res.json({error: "Email is already registered"})
            }
            else{
                 // hash password:

                 bcrypt.hash(password, 12).
                 then(hasedPassword => {
                     if(!hasedPassword){
                         return res.json({error: "Server error"})
                     }
                const newUser = new User({
                    name: name,
                    email: email,
                    password: hasedPassword
                })
            
                newUser.save()  // save user in database
                .then((response)=>{
                    const token = uuidv4();
                    console.log(token)
                    response.token = token
                    response.save() // async
                    .then(updatedResponse => {
                        res.json({message: "User saved successfully", data: updatedResponse})
                    })
                    .catch(
                        err => console.log(err)
                    )
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
              })
            .catch(err => console.log(err))
            }
            
     }) 

     .catch(err => console.log(err))

    // save user in database:

    

})

// login:
// 1) email and password
// 2) basic conditions
// 3) email is registered or not
// 4) password is correct or not

authRouter.post("/login", async (req,res)=>{

     const {email, password} = req.body 

        // basic conditions:
        if(!email || !password){
            return res.json({error: "Please fill all the fields"})
        }

        // check if email is registered or not:
        try{
            const response = await User.findOne({email:email})
            console.log(response)

            if(!response){
                return res.json({error: "Email is not registered"})
            }
            else{
               const matchResult  = await bcrypt.compare(password, response.password)
               if(matchResult){
                   // token :
                     const token = uuidv4();
                     console.log(token)
                     response.token = token
                    const updatedResponse =  await response.save()

                     return res.json({message: "Login successfull", data: updatedResponse})
               }
                else{
                     return res.json({error: "Password is incorrect"})
                }
            }
        }
       

        catch(err){
            console.log(err)
        }


})


authRouter.get("/secret",checkLogin, async(req,res)=>{
    const userDetails = req.user
    res.json({message:`Welcome ${userDetails.name} , to the Portal of Raw agent`})
})

// authRouter.get("/secret2", async(req,res)=>{
//     const token = req.headers.token
//     // let see if token is valid or not:
//     if(!token){
//         return res.json({error: "Please login first"})
//     }
//     try{
//      const response = await User.findOne({token:token}) 
//      console.log(response)
//      if(!response){
//          return res.json({error: "Please login first"})
//      }
//      else{
//         res.json({message: "Welcome to the Portal of Mushad agent"})
//      }
//     } 
//     catch(err){
//         console.log(err)
//     }
    
// })










export default authRouter;





// Eg of encrypt and decrypt: 

// 123 => "dwqefrgtynewwe"
// "dwqefrgtynewwe" => 123

// // hashing: 
// 123 => "asdbkvewariuvbai" 
// ""asdbkvewariuvbai"  => 123 (not possible)
