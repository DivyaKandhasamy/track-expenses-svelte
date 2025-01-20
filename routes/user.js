const { Router } = require('express')
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = Router();

router.post('/register', async (req, res) => {
   
    try {
        const { email, name, password } = req.body

        if(!email || !password || !name){
            return  res.status(400).json({message:'Not all fields are filled', result:'failed'});
        }
        const user = await User.findOne({ email });
        
        if (user) {
            return res.status(404).json({ message: 'User already exists', result: 'failed' });
        }else{
           const hashedPassword = await bcrypt.hash(password,1);
           const newUser = new User({ email, name, password:hashedPassword });
           await newUser.save().then(()=>{
            res.status(200).send({message:'Registration Successfull', result:'success', user: newUser});
           }).catch((e)=>{ 
            res.status(500).json({ message:'Error creating account', result: 'failed' , detail: e.message});
        })
           
        }
    } catch (error) {
        res.status(500).json({ message:'Something went wrong', result: 'failed' , detail: error.message});
    }
})


router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        if(!email || !password){
         return  res.status(400).json({message:'User or Password is Empty', result:'failed'});
        }
       
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found', result: 'failed' });
        }

        const hashedPassword = user.password;
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if(isPasswordValid){
         return res.status(200).json({message:'Login Success', result:'success', user:user });
        }else{
        return res.status(400).json({message:"E-mail and Password don't match", result:'failed' });
        }

    } catch (error) {
        res.status(500).json({ message:'Something went wrong', result: 'failed' , detail: error.message});
    }
})




module.exports = router