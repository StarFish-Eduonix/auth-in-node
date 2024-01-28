import mongoose from "mongoose"; 

mongoose.connect("mongodb+srv://auth:BTuo3iDyIEXSeCqz@eduonix-auth-node.sktyduh.mongodb.net/")
.then(()=>console.log("MongoDb Connected")) 
.catch((err)=>console.log("Connection issue", err))
