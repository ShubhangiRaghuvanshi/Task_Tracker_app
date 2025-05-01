
const Task = require('../Models/Task');
const Project = require('../Models/Project');

const createTask = async (req, res) => {
    try {
        const { projectId, title, description,status } = req.body;

        if (!title || !description || !projectId|| !status) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const project = await Project.findById(projectId);
        if (!project || project.owner.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Project not found or unauthorized' });
        }

        const newTask = new Task({
            title,
            description,
            project: projectId,
            owner: req.user._id,
            status
        });
console.log(newTask);
        await newTask.save();

        project.tasks.push(newTask._id);
        await project.save();

        return res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getTasks=async (req, res) => {
    try{
const task=await Task.findById(req.params.taskId)
if(!task) {
    return res.status(404).json({ message: 'Task not found' });
}
return res.status(200).json({ message: 'Task fetched successfully', task });




    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateTask=async (req, res) => {
    try{
const { title, description,status } = req.body;
const task=await Task.findById(req.params.taskId);
if(!task) {
    return res.status(404).json({ message: 'Task not found' });
}
if (title) task.title = title;
if (description) task.description = description;
if (status) task.status = status;
if(task.status==="Completed")
task.completedAt = new Date();
else
task.completedAt = null;
await task.save();
return res.status(200).json({ message: 'Task updated successfully', task });


    }
    catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const deleteTask=async (req, res) => {
    try{
const task=await Task.findById(req.params.taskId);
console.log(task.owner);
console.log(req.user._id);
if (!task.owner || task.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized to delete this task' });
}
await task.deleteOne();
const project = await Project.findById(task.project);
project.tasks = project.tasks.filter(t => t.toString() !== task._id.toString());
await project.save();
return res.status(200).json({ message: 'Task deleted successfully' });

    }

    catch(err)
    {
    
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};


