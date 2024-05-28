
import React, { useEffect, useState } from "react";



//create your first component
const TodoApi = () => {
	const [inputValue, setInputvalue] = useState("");
	const [todos, setTodos] = useState([]);
	const [newName, setNewName] = useState("");
	const [hidden, setHidden] = useState(true);

	const creaUsuario = async () => {
		try {
			const respuesta = await fetch(`https://playground.4geeks.com/todo/users/${newName}`, {
				method: "POST"
			})
			if (respuesta.status == 400) {
				const { detail } = await respuesta.json()
				if (detail == "User already exists.") {
					console.log(detail);
					getTareas();

				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const postTareas = async (inputValue) => {
		try {
			if (newName != "") {
				const response = await fetch(`https://playground.4geeks.com/todo/todos/${newName}`, {
					method: "POST",
					body: JSON.stringify({
						"label": inputValue,
						"is_done": false
					}),

					headers: {
						"Content-Type": "application/json"
					}
				})
			}
		}
		catch (error) {
			console.log(error)
		}
	}

	const deleteTareas = async (itemId) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${itemId}`, {
				method: "DELETE",
			})
			getTareas();
		}
		catch (error) {
			console.log(error)
		}
	}

	const getTareas = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${newName}`)
			console.log("ESTA ES REPONSE", response.ok)
			if (response.ok === false) {
				console.log("un error en la solicitud");
				return
			}
			const data = await response.json()
			console.log("ESTO DEVUELVE DATA: ", data.id);
			setTodos(data.todos);
			console.log("ESTO DEVUELVE TODOS: ", todos);
		} catch (error) {
			console.log("error");
		}

	}

	async function handlePost() {
		await postTareas(inputValue);
		getTareas();
		setInputvalue("");
	}
	async function handleDelete(id) {
		await deleteTareas(id);
		getTareas();
	}

	useEffect(() => {
		if (newName != "") {
			getTareas()
		}
	}, []
	)

	return (
		<div className="container">
			<div className="nombre">
				<li id="newname">
					<input type="text"

						onChange={e => setNewName(e.target.value.trim())}
						value={newName}
						onKeyDown={
							(e) => {
								if (newName != "") {
									if (e.key == "Enter") {
										creaUsuario();
									}
								}
							}
						}
						placeholder="Digite su Nombre aquí..."
					/>

				</li>


			</div>
			<h1>Lista de actividades por hacer</h1>
			<ul>

				<li>
					<input type="text"
						onChange={(e) => setInputvalue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {

							if ((inputValue != "")) {
								if (e.key == "Enter") {
									handlePost();
								}
							}
						}

						}
						placeholder="Que necesitas hacer?" />
				</li>


				{todos.map((item, index) => (
					<li key={index} onMouseEnter={() => setHidden(false)} onMouseLeave={() => setHidden(true)}>

						{item.label}
						{hidden ? null :
							<i className="fas fa-trash-alt"
								onClick={() => {
									handleDelete(item.id)
								}
								}
							>
							</i>
						}
					</li>
				))}


			</ul>
			<div id="cantidad">{todos.length}   {todos.length === 0 ? "Lista vacia, agrega una tarea" : "Tareas"}</div>

			<button id="boton" className="btn btn-success btn-lg" onClick={() => todos.map((item, index) => (
				deleteTareas(item.id)
			))
			}
			>
				Eliminar todo
			</button>
		</div >
	);
};

export default TodoApi;
