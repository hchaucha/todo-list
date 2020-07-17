import express from "express"
import path from "path"
import fs from "fs"
import shortid from "shortid"

const router = express.Router()
const filePath = "../../data.json"

function readDataFile() {
	const file = fs.readFileSync(path.join(__dirname, filePath)) // Read file
	const data  = JSON.parse(file) // Formating data
	
	return (data)
}

// Fetch all tasks from JSON file
router.get('/', (req, res) => {
	const data = readDataFile() // Read file and return formated data
	return (res.status(200).json(data))
})

// Create a new task and store it in JSON file
router.post('/create', (req, res) => {
	const { title } = req.body // Get title for the new task from request body

	const json = readDataFile() // Read file and return formated data

	const id = shortid.generate() // Generate a new id
	const data = { id, title, isDone: false } // Create the new task with generated id and given title
	json.tasks.push(data) // Push the new task into the existing array

	const updatedFile = fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(json)) // Write file with new data

	return (res.status(200).json({ success: true, data }))
})

// Delete an existing task from the JSON file
router.delete('/delete', (req, res) => {
	const { id } = req.body // Get id of the targeted task from request body

	const data = readDataFile() // Read file and return formated data

	let deletedTask = null
	const index = data.tasks.findIndex((task) => {
		deletedTask = task // Store the current task
		return (task.id === id) // End of function if task.id is equal to the given id
	})

	data.tasks.splice(index, 1) // Remove targeted task from tasks array

	const updatedFile = fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(data)) // Write file with new data

	return (res.status(200).json({ success: true, data: deletedTask }))
})

// Update the status of the targeted task inside the JSON file
router.put('/update', (req, res) => {
	const { id } = req.body // Get id of the targeted task  from request body
	
	const data = readDataFile() // Read file and return formated data
	
	const index = data.tasks.findIndex((task) => task.id === id) // Get the index of the targeted task in tasks array
	data.tasks[index].isDone = !data.tasks[index].isDone

	const updatedFile = fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(data)) // Write file with new data

	return (res.status(200).json({ success: true, data: data.tasks[index] }))
})

export default router