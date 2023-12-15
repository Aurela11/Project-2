const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

       
        const existingTask = await prisma.task.findUnique({
            where: {
                id: parseInt(taskId),
            },
        });

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: parseInt(taskId),
            },
            data: {
                status: status,
            },
        });

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


const getTasksByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: status.toUpperCase(), 
      },
      include: {
        assignedTo: true, 
      },
    });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
}

module.exports = {
    updateTaskStatus,
    getTasksByStatus,
};
