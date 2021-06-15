import { PLAYERS } from "./configs/gameConfig";
import { shuffle } from "./utils";
import { generateLogs } from "./modules/generateLogs";
import Player from "./modules/Player";
import { onFormSubmit } from "./modules/form";
import { createPlayer } from "./modules/createPlayer";

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const randomPlayers = shuffle(PLAYERS).slice(0, 2);
const player1 = new Player(randomPlayers[0], 1);
const player2 = new Player(randomPlayers[1], 2);

$formFight.addEventListener('submit', (e) => {
    onFormSubmit(e, player1, player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);
