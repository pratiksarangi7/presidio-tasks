const list = document.getElementById('draggable-list');
let draggedItem = null;

list.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.innerText);
});

list.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.list-item').forEach(item => {
        item.classList.remove('drag-over');
    });
});

list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const target = e.target.closest('.list-item');

    if (target && target !== draggedItem) {
        target.classList.add('drag-over');
    }
});

list.addEventListener('dragleave', (e) => {
    const target = e.target.closest('.list-item');
    if (target) {
        target.classList.remove('drag-over');
    }
});

list.addEventListener('drop', (e) => {
    e.preventDefault();
    const target = e.target.closest('.list-item');

    if (target && target !== draggedItem) {
        target.classList.remove('drag-over');

        const rect = target.getBoundingClientRect();
        const midpoint = (e.clientY - rect.top) / (rect.bottom - rect.top);

        if (midpoint > 0.5) {
            target.after(draggedItem);
        } else {
            target.before(draggedItem);
        }
    }
});