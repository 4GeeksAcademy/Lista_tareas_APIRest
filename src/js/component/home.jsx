
import React, { useState } from "react";



//create your first component
const Home = () => {
	const [inputValue, setInputvalue] = useState("");
	const [todos, setTodos] = useState([]);
	const [operacion, setOperacion] = useState('');


	return (
		<div className="container">
			<h1>Lista de actividades por hacer</h1>
			<ul>
				<li>
					<input type="text"
					onChange={(e) => setInputvalue(e.target.value)}
						value={inputValue}
						
							onKeyDown={(e) => {
								if ((inputValue != "")){
									if (e.key == "Enter"){
										setTodos(todos.concat([inputValue]));
										setInputvalue("");
									}
								}
							}

						}
					placeholder="Que necesitas hacer?"/>
				</li>

				{todos.map((item, index) =>(
					<li>
						{item} <i class="fas fa-trash-alt" onClick={() =>
														 setTodos(
															todos.filter(
																(t, currentIndex) => index != currentIndex 
																)
														 )
														}></i>
					</li>
				))}
					
			</ul>
			<div>{todos.length} taks </div>
		</div>
	);
};

export default Home;
