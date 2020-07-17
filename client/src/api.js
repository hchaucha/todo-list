import axios from "axios"

export default {
	tasks: {
		fetchAllTasks: () => axios.get('/api/tasks', (req, res) => res.data.tasks),
		createTask: (title) => axios.post('/api/tasks/create', (req, res) => res.data),
		deleteTask: (id) => axios.delete('/api/tasks/delete', (req, res) => res.data),
		updateTask: (id) => axios.put('/api/tasks/update', (req, res) => res.data)
	}
}