import express from 'express';
import 'dotenv/config';
import initApp from './src/index.router.js';
const app = express();
const PORT = process.env.PORT || 6000;

initApp(app,express);
app.listen(PORT , ()=>{

    console.log(`Server is running on ${PORT}...`);
});