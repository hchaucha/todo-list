import express from "express"
import path from "path"
import bodyParser from "body-parser"

import tasks from "./routes/tasks"

const APP = express() // Initiate express
const PORT = 8080 // Initiate port for express server

APP.use(bodyParser.json()) // Allow to use body in http request

APP.use('/api/tasks', tasks)

// Render the html file for all get request
APP.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

// Run application on the given port
APP.listen(PORT, () => console.log("API running on http://localhost:" + PORT))