const connect  = require('./config/db.js');
const app=require('./index');

app.listen(5000, async()=>{
    await connect();
    console.log("listening on port :" + 5000)
})