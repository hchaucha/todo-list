import React, { useState, useEffect } from 'react'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import {
	fetchAllTasks,
	createTask,
	deleteTask,
	updateTask
} from "actions/tasks"

function Todo() {
	const [ tasks, setTasks ] = useState([]); // Initiate state for tasks list
	const [ inputValue, setInputValue ] = useState(null) // Store the input value
	const [ isInputAvailable, setIsInputAvailable ] = useState(false) // Store the task creation status (available || not available)
	const [ errorMessage, setErrorMessage ] = useState(null) // Store the error message for the input

	const todoTasks = tasks.filter((task) => task.isDone === false) // Get all tasks to do
	const doneTasks = tasks.filter((task) => task.isDone === true) // Get all tasks done

  // Fatch all the tasks when component did mount or update and store them in state
	useEffect(() => {
		fetchAllTasks().then((res) => setTasks(res))
	}, [])

	// Handle all actions for tasks managment
	function handleTaskActions(action, value) {
		// Define the action to perform
		let actionFunction = null;
		if (action === 'create') {
			actionFunction = createTask;
		} else if (action === 'delete') {
			actionFunction = deleteTask;
		} else if (action === 'update') {
			actionFunction = updateTask;
		}

		// Perform the action
		actionFunction(value).then((res) => {
			fetchAll().then((res) => setTasks(res)); // Then fetch new data (Use that way if there is not a lot of data)
		});
	}

	function resetInputValues() {
		setInputValue(null) // Reset the value of the input
		setErrorMessage(null) // Reset the error message
		setIsInputAvailable(false) // Hide the input
	}

	// Handle some key for the input
	function handleKeyUp(key) {
		if (key === "Enter") { // If the 'Enter' have been detected
			handleAddTaskButton() // Handle input submition
		} else if (key === "Escape") { // If the 'Escape' key have been detected
			resetInputValues(); // Reset input value, error message and input status
		}
	}

	// Handle the add task button
	function handleAddTaskButton() {
		if (isInputAvailable) { // If the input is available (button have been clicked once)
			if (inputValue === null) { // If the new task have been validate without text
				setErrorMessage("Each task should have a title") // Set the new message error
			} else { // If the input have been correctly filled
				handleTaskActions('create', inputValue) // Create the task
			}
		} else {
			setIsInputAvailable(true)
		}
	}

	return (
		<div className="container">
			<div className="uncomplete-task">
				<h2>Not completed</h2>
				<TransitionGroup className="todo-list">
					{	todoTasks &&
						todoTasks.map((task) => {
							<CSSTransition
								key={task.id}
								classNames="item"
								timeout={ 400 }
								appear={ true }
							>
								<div className="task todo">
									<div>{ task.title }</div>
									<div className="actions">
										<i className="fas fa-check icon left" onClick={ () => handleTaskActions('update', task.id) } />
										<i className="fas fa-trash icon" onClick={ () => handleTaskActions('delete', task.id) } />
									</div>
								</div>
							</CSSTransition>
						})
					}
				</TransitionGroup>

				{/* Render the button or the input for task creation */}
				<div className="add-task">
					{ isInputAvailable && // If the button have been clicked then show the input field
						<input
							className={ "add-input" + (errorMessage !== null ? " error" : "") }
							type="text"
							placeholder={ errorMessage ? errorMessage : "Write the task title ..." }
							autoFocus
							onChange={ (e) => setInputValue(e.target.value) }
							onKeyUp={ (e) => handleKeyUp(e.key) }
						/>
					}
					<div
						className="add-button"
						onClick={ handleAddTaskButton }
					>
						+
					</div>
				</div>

				<div className="complete">
					<h2>Completed</h2>
					<TransitionGroup> {/* Create a simple css animation */}
						{/* Render all completed tasks */}
						{ doneTasks &&
							doneTasks.map((task) => (
								<CSSTransition // Configure the css animation
									key={task.id}
									timeout={ 400 }
									classNames="item"
									appear={ true }
								>
									<div
										key={ task.id }
										className="task done"
									>
										<div>{ task.title }</div>
										<div className="actions">
											<i className="fas fa-check icon left" onClick={ () => handleTaskActions('update', task.id) } />
											<i className="fas fa-trash icon" onClick={ () => handleTaskActions('delete', task.id) } />
										</div>
									</div>
								</CSSTransition>
							))
						}
					</TransitionGroup>
				</div>
			</div>
		</div>
	);
}

export default Todo;
