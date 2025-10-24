const AdminDetails = require("../models/details/admin-details.model");
const ApiResponse = require("../utils/ApiResponse");

const adminOnly = async (req, res, next) => {
  try {
    // Check if user is admin
    const admin = await AdminDetails.findById(req.userId);
    
    if (!admin) {
      return ApiResponse.forbidden("Access denied. Admin only.").send(res);
    }
    
    next();
  } catch (error) {
    console.error("Admin Check Error:", error);
    return ApiResponse.internalServerError().send(res);
  }
};

module.exports = adminOnly;
