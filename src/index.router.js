import cors from 'cors';
import connectDB from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import categoryRouter from './modules/category/category.router.js';
import productsRouter from './modules/products/products.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import cartRouter from './modules/cart/cart.router.js';
const initApp = async (app,express)=>{
    app.use(express.json());
    app.use(cors());
    connectDB();

    app.get('/', (req,res)=>{
      return res.status(200).json({message:"welcome to QShop"});
    });

    app.use('/auth', authRouter );
    app.use('/categories', categoryRouter);
    app.use('/products', productsRouter);
    app.use('/coupons', couponRouter);
    app.use('/carts', cartRouter);
    
    app.get('*' , (req,res)=>{
        return res.status(404).json({message:"page not found"});
    });
}


export default initApp;