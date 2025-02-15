const bcryptjs = require("bcryptjs");
const User = require("../module/userModule.js");

//REGISTER USER
const registerUser = async (req, res) => {
    try {
        let { name, email, userName, password, phoneNumber, sex, maritalStatus} = req.body;
       
        //VALIDATE REQUIRED FIELDS
       if (
        !name ||
        !email ||
        !userName ||
        !password ||
        !phoneNumber ||
        !sex ||
        !maritalStatus 
       ) {
         return res 
          .status(400)
          .json({ message: "All Required Fields Must Be Provided" });
         }

         //HASH THE PASSWORD
         const salt = await bcryptjs.genSalt(10);
         const hashedPassword = await bcryptjs.hash(password, salt);

         //SAVE USER IN DATABASE
         const newUser = new User({
            name,
            email,
            userName,
            password: hashedPassword,
            phoneNumber,
            sex,
            maritalStatus,
         });

         //REGISTER USER IN DATABASE
         const registeredUser = await newUser.save();
         res.status(201).json(registeredUser);
         } catch (err) {
            console.error("registration Error", err);

            //HANDLE DUPLICATE KEY ERRORS
            if (err.code === 11000) {
                return res.status(400).json({
                 message: "user already exists",
                 field: Object.keys(err.keyvalue)   
                });
            }
            res
               .status(500)
               .json({ message: "Error registering user", err: err.message });
         }
};

//LOGIN USER

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res
            .status(400)
            .json({ message: "userName and password are required" });
    }

   //find the user by userName
   const user = await User.findOne({ userName });
   if (!user) {
    return res.status(404).json({ message: "Invalid userName" });
   }
   console.log(user);
   //COMPARE PASSWORD
   const isMatch = await bcryptjs.compare(password, user.password);
   if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
   }
   res.status(200).json(userResponse);

}  catch (error) {
    res.status(500).json({ message: "Error logging in", error });
}
};

//UPDATE USER
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        //FIND USER BY ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        //FIND USER FIELDS
        const updatedData = req.body;

        //ONLY HASH PASSWORD IF ITS BEING UPDATED
        if (updatedData.password) {
            const salt = await bcryptjs.genSalt(10);
            updatedData.password=await bcryptjs.hash(updatedData.password, salt);
        }

        //UPDATE USER IN THE DATABASE
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true, //return the updated document
            runValidators: true, //enforce validators rule
        });
        res
        .status(200)
        .json({ message: "User Updated Successfully", updatedUser });
     }  catch (err) {
        console.error("Error updating user ", err);
        res
        .status(500)
        .json({ message: "Error Updating User", err: err.message });
    }
    };

//get all users

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200). json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        
};

//get user by id
const getUserById = async ( req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
     } catch (error) {
        res.status(500).json({ message: error.message });
     } 
    };

    let deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            //check if user exists
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User Not Found" });
         }

           //DELETE THE USER
    await user.deleteOne();
    res.status(200).json({ message: "user deleted successfully" });
} catch (error) {
    console.error("Error deleting user", error);
    res
    .status(500)
    .json({ message: "Error deleting user", error: error. message });
}
    };

  

module.exports = {
    registerUser,
    loginUser,
    updateUser, 
    getAllUsers,
    getUserById,
    deleteUser,

}