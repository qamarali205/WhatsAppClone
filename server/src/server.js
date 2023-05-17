const connect  = require('./config/db.js');
const app=require('./index');

app.listen(5001, async()=>{
    await connect();
    console.log("listening on port :" + 5001)
})