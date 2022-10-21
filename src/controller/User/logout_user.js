const logout_user = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        code: 200,
        message: "User logged out successfully",
    });
};

module.exports = logout_user;