import userModel from "../../../DB/models/user.model.js"



export const getUsers = async (req, res, next) =>{
    const users = await userModel.find({});
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ message: "Users retrieved successfully", users });
}