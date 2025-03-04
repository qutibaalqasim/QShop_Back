import cors from 'cors';
import connectDB from '../DB/connection.js';

const initApp = async (app,express)=>{
    app.use(express.json());
    app.use(cors());
    connectDB();

    app.get('/', (req,res)=>{
      return res.status(200).json({message:"welcome to QShop"});
    })

    app.get('*' , (req,res)=>{
        return res.status(404).json({message:"page not found"});
    })
}


export default initApp;