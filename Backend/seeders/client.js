import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

let password = "123";

export const clientSeeds = [
    {
        name: "Ricardo",
        lastname: "Urvina",
        nid: "123456789",
        email: "ricky@correo.com",
        point: 42,
        status: 0
    },
    {
        name: "Juan",
        lastname: "Perez",
        nid: "207845337",
        email: "juan@correo.com",
        point: 30,
        status: 1
    },
    {
        name: "Vale",
        lastname: "Hormazabal",
        nid: "209408775",
        email: "vale@correo.com",
        point: 35,
        status: 1
    }
];