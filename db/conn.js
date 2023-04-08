const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/dance_web", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log(`connection succesfull`);
}).catch((err) =>{
    console.log(`no connection`, err);
})