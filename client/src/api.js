import axios from "axios"

export default {
	tasks: {
		fetchAllTasks: () => axios.get('/api/tasks', (req, res) => res.data),
		createTask: (title) => axios.post('/api/tasks/create', { title },(req, res) => res.data),
		deleteTask: (id) => axios.delete('/api/tasks/delete', { data: { id } },(req, res) => res.data),
		updateTask: (id) => axios.put('/api/tasks/update', { id },(req, res) => res.data)
	}
}