import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

let password = "Jaqamain3pals";

const salt = await bcrypt.genSalt();
const passwordHash = await bcrypt.hash(password,salt);

export const adminSeeds = [
    {
        user: "Ochietto",
        password: passwordHash,
    },
];