const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const createTask = async (req, res) => {
    try {
        const { task_name, description, user_id } = req.body
        const createTask = await prisma.task.create({
            data: {
                task_name,
                description,
                statuses: {
                    create: {
                        status: 'TO_DO'
                    }
                }
            }
        })
        res.json(createTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany()
        res.json(tasks)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

const updateTask = async (req, res) => {
    try {
        const { task_name, description, user_id } = req.body
        const update = await prisma.task.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                task_name,
                description,
                user_id
            }
        })
        res.status(200).send('Task updated successfully!');
        res.json(update);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

const deleteTask = async (req, res) => {
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

const addTaskToUser = async (req, res) => {
    try {
        const { userId, taskId } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                id: userId

            },
        });

        const task = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!user || !task) {
            return res.status(404).json('User or task not found');
        }

        await prisma.task.update({
            where: { id: taskId },
            data: { user: { connect: { id: userId } } },
        });

        res.status(200).json('Task assigned to user successfully');
    } catch (error) {
        console.error('Error assigning task:', error);
        res.status(500).json('Internal server error');
    }
};


module.exports = { createTask, getTasks, updateTask, deleteTask, addTaskToUser };