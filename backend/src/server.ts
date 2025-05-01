import app from "./app";


const dotenv = require('dotenv');
dotenv.config();

app.listen(5000, () => {
    console.log('started');
    
})