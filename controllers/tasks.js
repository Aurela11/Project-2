const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = await prisma.task.create({
            data: {
                title: title,
                description: description,
                status: 'TO_DO', 
            },
        });

        res.json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


const updateTaskDetails = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description } = req.body;
        const updatedTask = await prisma.task.update({
            where: {
                id: parseInt(taskId),
            },
            data: {
                title,
                description,
            },
        });
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await prisma.task.delete({
            where: {
                id: parseInt(taskId),
            },
        });
        res.json('Task deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    createTask,
    updateTaskDetails,
    deleteTask,
    getTasks,
};
