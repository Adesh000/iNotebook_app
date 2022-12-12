const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
    "/createuser",
    [
        body("name", "Name should be more than 3 characters").isLength({
            min: 3,
        }),
        body("email", "Email should be valid").isEmail(),
        body("password", "more than 5 characters").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
            });
        }

        let user = await User.findOne({
            email: req.body.email,
        });
        if (user) {
            return res
                .status(400)
                .json({ error: "Sorry with this email user already exists" });
        }

        // bcrypt hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        // jwt authentication

        const JWT_SECRET = "Rahulisacheater";
        const data = {
            user: {
                id: user.id,
            },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ authtoken });
    }
);

// Authenticate a user using: "/api/auth/login" . No login required
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        // if there are errors return a bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({
                        error: "Please try to login with correct credentials",
                    });
            }

            //comparing password

            const passwordCompare = await bcrypt.compare(
                password,
                user.password
            );
            if (!passwordCompare) {
                return res
                    .status(400)
                    .json({
                        error: "Please try to login with correct credentials",
                    });
            }

            const JWT_SECRET = "Rahulisacheater";

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);

// Route 3: Get user login details: POST '/api/auth/getuser'. Login required

router.post("/getuser", async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        req.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
module.exports = router;
