const {user_validation} = require("../../utils/validations/user_validation");
const User = require("../../models/user_model");
const signup_user = async (req, res) => {
    try {
        const { error } = await user_validation(req.body);

        if (error) {
            return res.status(404).json({
                code: 404,
                message: error.message.replace(/\"/g, " "),
            });
        }
        let login_type = req.body.login_type;
        let user;

        if (login_type === "cnic") {
            user = await User.findOne({ cnic: req.body.cnic });
            if (user) {
                return res.status(404).json({
                    code: 404,
                    message: "User already exists with this cnic",
                });
            }

            user = new User({
                cnic: req.body.cnic,
                login_type: req.body.login_type,
                password: req.body.password,
            });

            await user.save();
        } else if (login_type === "email") {
            user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(404).json({
                    code: 404,
                    message: "User already exists with this email",
                });
            }

            user = new User({
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                contact_number: req.body.contact_number,
                password: req.body.password,
                login_type: req.body.login_type,
            });

            await user.save();
        }

        return res.status(200).json({
            code: 200,
            message: "User created successfully",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
module.exports = signup_user;