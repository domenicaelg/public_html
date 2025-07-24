const BOARDS = [
    {
        cells: [
            ["E", "L", "W", "Y", "C"],
            ["Y", "L", "O", "A", "N"],
            ["U", "B", "L", "E", "E"],
            ["E", "L", "P", "M", "V"],
            ["P", "U", "R", "A", "U"]],
        words: ["CYAN", "YELLOW", "PURPLE", "MAUVE", "BLUE"]
    },
    {
        cells: [
            ["E", "K", "O", "A", "P"],
            ["A", "W", "L", "I", "R"],
            ["N", "S", "F", "A", "T"],
            ["L", "E", "E", "R", "A"],
            ["A", "G", "G", "U", "J"]],
        words: ["TAPIR", "EAGLE", "JAGUAR", "SNAKE", "WOLF"]
    },
    {
        cells: [
            ["H", "C", "N", "A", "N"],
            ["Y", "R", "A", "A", "A"],
            ["R", "E", "A", "Y", "B"],
            ["F", "P", "P", "E", "R"],
            ["I", "G", "A", "P", "A"]],
        words: ["CHERRY", "PAPAYA", "BANANA", "PEAR", "FIG"]
    },
]

let curBoard = 0
let points = 0

let gotWord = [false, false, false, false, false]

let curWords = BOARDS[curBoard].words

function make_cell_list() {
    let cells = Array.from(document.getElementById("cell-holder").children)
    let cell_board = [];
    for (let i = 0; i < 5; i++) {
        cell_board.push(cells.slice(i * 5, i * 5 + 5))
    }
    return cell_board;
}

const CELLS = make_cell_list();

function setup_game(board) {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            CELLS[y][x].innerHTML = board[y][x];
        }
    }
}

setup_game(BOARDS[0].cells);
setWords()
let selected_x = -1;
let selected_y = -1;

function select(x, y) {
    let cell = CELLS[y][x];
    if (cell.innerHTML.length > 0) {
        if (selected_x >= 0 && selected_y >= 0) {
            CELLS[selected_y][selected_x].classList.remove("selected");
        }
        selected_x = x;
        selected_y = y;
        cell.classList.add("selected");
    }
}

function unselect(x, y) {
    CELLS[y][x].classList.remove("selected");
    selected_x = -1;
    selected_y = -1;
}

function can_move(x, y) {
    let is_next_to = Math.abs(selected_x - x) + Math.abs(selected_y - y) == 1;

    return selected_x >= 0 && selected_y >= 0 && is_next_to && CELLS[y][x].innerHTML.length > 0;

}

function move(x, y) {
    CELLS[y][x].innerHTML = CELLS[selected_y][selected_x].innerHTML + CELLS[y][x].innerHTML;
    CELLS[selected_y][selected_x].innerHTML = "";
    select(x, y);
}

function on_click(x, y) {
    if (selected_x == x && selected_y == y) {
        unselect(x, y)
    } else if (can_move(x, y)) {
        move(x, y)
    } else {
        select(x, y)
    }
    if (CELLS[y][x].innerHTML == BOARDS[curBoard].words[0] && !gotWord[0]) {
        points += 50
        document.getElementById("pointCount").innerHTML = "Points: " + points
        gotWord[0] = true

        document.getElementById("word1").style.textDecoration = 'line-through'
        setWords()
    }
    if (CELLS[y][x].innerHTML == BOARDS[curBoard].words[1] && !gotWord[1]) {
        points += 50
        document.getElementById("pointCount").innerHTML = "Points: " + points
        gotWord[1] = true

        document.getElementById("word2").style.textDecoration = 'line-through'
        setWords()
    }
    if (CELLS[y][x].innerHTML == BOARDS[curBoard].words[2] && !gotWord[2]) {
        points += 50
        document.getElementById("pointCount").innerHTML = "Points: " + points
        gotWord[2] = true

        document.getElementById("word3").style.textDecoration = 'line-through'
        setWords()
    }
    if (CELLS[y][x].innerHTML == BOARDS[curBoard].words[3] && !gotWord[3]) {
        points += 50
        document.getElementById("pointCount").innerHTML = "Points: " + points
        gotWord[3] = true

        document.getElementById("word4").style.textDecoration = 'line-through'
        setWords()
    }
    if (CELLS[y][x].innerHTML == BOARDS[curBoard].words[4] && !gotWord[4]) {
        points += 50
        document.getElementById("pointCount").innerHTML = "Points: " + points
        gotWord[4] = true

        document.getElementById("word5").style.textDecoration = 'line-through'
        setWords()
    }
}

function changeBoard(newBoard) {

    setup_game(BOARDS[newBoard].cells)

    selected_x = -1;
    selected_y = -1;

    curBoard = newBoard

    points = 0
    document.getElementById("pointCount").innerHTML = "Points: " + points
    gotWord = [false, false, false, false, false]


    curWords = BOARDS[curBoard].words
    setWords()
    resetStrike()
}

function Restart() {

    setup_game(BOARDS[curBoard].cells);

    CELLS[selected_y][selected_x].classList.remove("selected");
    selected_x = -1;
    selected_y = -1;

    points = 0;
    document.getElementById("pointCount").innerHTML = "Points: " + points
    gotWord = [false, false, false, false, false]

    resetStrike()
}

function setWords() {
    document.getElementById("words").innerHTML = "Words to spell: "
    document.getElementById("word1").innerHTML = curWords[0]
    document.getElementById("word2").innerHTML = curWords[1]
    document.getElementById("word3").innerHTML = curWords[2]
    document.getElementById("word4").innerHTML = curWords[3]
    document.getElementById("word5").innerHTML = curWords[4]
}

function resetStrike() {
    document.getElementById("word1").style.textDecoration = 'none'
    document.getElementById("word2").style.textDecoration = 'none'
    document.getElementById("word3").style.textDecoration = 'none'
    document.getElementById("word4").style.textDecoration = 'none'
    document.getElementById("word5").style.textDecoration = 'none'
}


// Runs every frame

function onframe() {



    requestAnimationFrame(onframe)
}
onframe()
