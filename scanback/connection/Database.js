const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://pranavunnikrishnan56:pranav@cluster0.7wznpbl.mongodb.net/Scanning?retryWrites=true&w=majority")
.then(()=>{console.log("Db connected")})
.catch(err=>console.log(err));


