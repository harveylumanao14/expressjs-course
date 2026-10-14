import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
        where: { email: email },
    });

    if (userExists) {
        return res
            .status(400)
            .json({ error: "User already exists with this email." });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            },
            token
        }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if the email exists in the table or database
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        res.status(401).json({
            error: "The email or password is invalid."
        });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({
            error: "The email or password is invalid."
        });
    }

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email
            },
            token
        }
    });
};

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expiresIn: new Date(0)
    });
    
    res.status(200).json({
        status: "sucess",
        message: "Logged out successfully"
    });
}

export { register, login, logout }