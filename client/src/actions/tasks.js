import api from "api"

export const fetchAllTasks = () =>
	api.tasks
		.fetchAllTasks()
		.then((res) => res)

export const createTask = (value) =>
	api.tasks
		.createTask(value)
		.then((res) => res)

export const deleteTask = (value) =>
	api.tasks
		.deleteTask(value)
		.then((res) => res)

export const updateTask = (value) =>
	api.tasks
		.updateTask(value)
		.then((res) => res)