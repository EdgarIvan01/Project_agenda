const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
    ? 'http://localhost:5000/tasks' 
    : '/tasks';

document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('deleteBtn').addEventListener('click', deleteTask);
document.getElementById('viewBtn').addEventListener('click', fetchTasks);

async function addTask() {
    const taskText = document.getElementById("taskInput").value;
    if (!taskText) return alert("¡Escribe una tarea!");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: taskText }),
        });
        
        if (!response.ok) throw new Error(await response.text());
        
        alert("Tarea agregada!");
        document.getElementById("taskInput").value = "";
        fetchTasks();
    } catch (error) {
        console.error("Error detallado:", error);
        alert(`Error al agregar tarea: ${error.message}`);
    }
}

async function deleteTask() {
    const taskId = prompt("ID de la tarea a eliminar:");
    if (!taskId) return;

    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "DELETE",
        });
        
        if (!response.ok) throw new Error(await response.text());
        
        alert("Tarea eliminada!");
        fetchTasks();
    } catch (error) {
        console.error("Error detallado:", error);
        alert(`Error al eliminar tarea: ${error.message}`);
    }
}

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(await response.text());
        
        const tasks = await response.json();
        const tasksList = document.getElementById("tasksList");
        tasksList.innerHTML = tasks.map(task => `
            <div class="task">
                <span class="task-id">ID: ${task.id}</span>
                <span class="task-text">${task.text}</span>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error detallado:", error);
        alert(`Error al cargar tareas: ${error.message}`);
    }
}
