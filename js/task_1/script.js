const input = document.getElementById("inp");
const btn = document.getElementById("btn");
const list = document.getElementById("list");

var tasks = [
    { text: "task 1", completed: false },
    { text: "task 2", completed: false }
];

function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const node = document.createElement('li');

        node.innerHTML = `
            <div>
                <span 
                    class="${task.completed ? 'completed' : ''}" 
                    onclick="toggleTask(${index})">
                    ${task.text}
                </span>
                <button onclick="deleteTask(${index})">delete</button>
        
            </div>`;
        list.append(node);
    });
}

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    input.value = "";
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

btn.addEventListener('click', addTask);

renderTasks();