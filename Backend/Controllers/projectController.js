const Project = require('../Models/Project');
const Task = require('../Models/Task');
const User = require('../Models/User');

const createProject = async (req, res) => {
    try{
    const {title} = req.body;
    if(!title) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const newProject=new Project({
       title,
       owner: req.user._id,
       tasks: []
    });
    await newProject.save();
    return res.status(201).json({ message: 'Project created successfully', project: newProject });
}
catch(err)
{
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
}
}




const addTaskToProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

     
      const project=await Project.findOne({_id:projectId,owner:req.user._id});
      if(!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

const newTask = new Task({
            title,
            description,
            project: projectId,
        });

        await newTask.save();

        project.tasks.push(newTask._id);
        await project.save();

        return res.status(201).json({ message: 'Task added successfully', task: newTask });


    }catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user._id }).populate('tasks');
        return res.status(200).json({ projects });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createProject,
    getProjects,addTaskToProject
};