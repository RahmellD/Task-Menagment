const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


const getUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
};

const createUser = async (req, res) => {
    try {
        const { name, role } = req.body;
        const users = await prisma.user.create({
            data: {
                name,
                role
            },
        });

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        })

        res.status(200).send('User deleted Successfully');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, role } = req.body;
        const user = await prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name,
                role
            },
        });

        res.status(200).send('User is updated!');
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
};

module.exports = { getUser, getAllUsers, createUser, deleteUser, updateUser };