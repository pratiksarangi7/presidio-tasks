
const display = document.getElementById('display')

function appendToExp(inp) {
    if (display.innerText === '0') display.innerText = ''
    display.innerText += inp
}

function compute() {
    try {
        const res = eval(display.innerText)
        if (res == 'Infinity') throw Error();
        display.innerText = res
    }
    catch (e) {
        display.innerText = 'ERROR!'
    }
}
function clearLastItem() {
    if (display.innerText === '0') return;
    if (display.innerText === 'ERROR!') display.innerText = '0';
    display.innerText = display.innerText.slice(0, -1)
}