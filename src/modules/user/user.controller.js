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

export const updateUser = async (req, res, next) => {
      const { id } = req.params;
      if(id != req.id){
        return res.status(403).json({ message: "You are not authorized to update this user" });
      }
      const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User updated successfully", user });
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    if(id != req.id && req.role != 'admin'){
        return res.status(403).json({ message: "You are not authorized to delete this user" });
    }
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
}
