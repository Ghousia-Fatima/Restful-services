//1. requiring module 

const mongoose = require('mongoose')

// 2. Creating a connection with database

mongoose
.connect("mongodb://localhost:27017/User")
.then(()=>console.log("Connection Successful...!!!"))
.catch(()=>console.log("Error, not connected"))

// 3. Create a Schema

const UserSchema = new mongoose.Schema(
    {
        name:{type:string, required:true},
        email:{type:string, required:true},
        password:{type:string}

    }
)

// 4. Creating a Model used as a collection 

const UserModel = new mongoose.model("MyUsers", UserSchema)


//5. Static data that you should send into database 
const data = UserModel({
    name:"zeba",
    email:"zeba@gmail.com",
    password:"Password"
})

//6. Store teh static data into Database
// data
// .save()
// .then(()=>console.log("Data Inserted into DB"))
// .catch((err)=>console.err(err))

//7. Retrieve the static data from database

UserModel.find()
       .then((data)=>console.log(data))
       .catch(err=>console.log(err))

