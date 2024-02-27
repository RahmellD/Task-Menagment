const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getTaskByUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userTask = await prisma.task.findMany({
            where: {
                user_id: userId
            },
        });

        if (!userTask || userTask.length === 0) {
            return res.status(404).json('No tasks found for the specified user');
        }

        res.json(userTask);

    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const { status } = req.body;

        const existingTask = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!existingTask) {
            return res.status(404).json('Task not found');
        }

        await prisma.satus.update({
            where: { id: taskId },
            data: {
                status
            },
        });

        res.status(200).json('Task status updated successfully');
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTasksByStatus = async (req, res) => {
    try {
        const status = req.params.status.toUpperCase();
        const tasksWithStatus = await prisma.task.findMany({
            where: {
                statuses: {
                    some: {
                        status: status,
                    },
                },
            },
            include: {
                user: {
                    select: {
                        name: true
                    }

                }
            }
        });

        if (!tasksWithStatus || tasksWithStatus.length === 0) {
            return res.status(404).json('No tasks found for the specified status');
        }

        res.status(200).json({ tasks: tasksWithStatus });
    } catch (error) {
        console.error('Error fetching tasks by status:', error);
        res.status(500).json('Internal server error');
    }
};


module.exports = { updateTaskStatus, getTaskByUser, getTasksByStatus }