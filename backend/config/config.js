const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/assignment", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection successfully done`)
}).catch((e) =>{
    console.log(e)
})