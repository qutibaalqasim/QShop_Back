import userModel from "../../../DB/models/user.model.js"



export const getUsers = async (req, res, next) =>{
    const users = await userModel.find({});
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ message: "Users retrieved successfully", users });
}

export const getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User retrieved successfully", user });
}