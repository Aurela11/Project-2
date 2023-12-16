const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

   const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await prisma.user.create({
            data: {
                username,
                email,
            },
        });
        res.json(`User with name  ${user.username} is created successfully`);
    } catch (error) {
           if (error.code === 'P2002') {
            if (error.meta?.target === 'User_username_key') {
               
                return res.status(400).json({ error: 'Username is already taken.' });
            } else if (error.meta?.target === 'User_email_key') {

                return res.status(400).json({ error: 'Email is already in use.' });
            }
        }
        console.error(error);
        res.status(500).send('Internal server error');
    }
};



 const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email } = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: {
                username, 
                email,
            },
        });
        res.json(`User updated successfully` );
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

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
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: parseInt(userId)
            }
        });

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
 const assignTaskToUser = async (req, res) => {
    const { taskId, userId } = req.params;

    try {
      const task = await prisma.task.update({
        where: { id: parseInt(taskId) },
        data: {
          assignedTo: { connect: { id: parseInt(userId) } }
        }
      });
  
      res.json({ message: 'Task assigned successfully', task });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign task', message: error.message });
    }
  }


const viewUserTasks = async (req, res) => {
    const { userId } = req.params;

    try {
    const userTasks = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { tasks: true }
    });

    if (!userTasks) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ tasks: userTasks.tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user tasks', message: error.message });
  }
};

module.exports = {
createUser,
updateUser,
getUser,
deleteUser,
assignTaskToUser,
viewUserTasks,
};