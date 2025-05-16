import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || "mongodb+srv://sonrodrey13:!VghuS_KZZB-Q8y@biblecluster.mj8h94t.mongodb.net/"

mongoose.connect(mongoUrl, { 
  dbName: 'bible' 
})
.then(() => console.log("MongoDB connected to 'bible' database"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

const UserSchema = new mongoose.Schema({email: String, password: String});

const User = mongoose.model('User', UserSchema);


app.get('/users', async(req,res) =>{
    const users = await User.find();
    res.json(users);
});


app.post('/users' , async (req,res)=>{
    const newUser = await User.create(req.body);
    res.json(newUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Account Management is running"))