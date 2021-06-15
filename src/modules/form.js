import { createElement, getRandom } from "../utils";
import { generateLogs } from "./generateLogs";
import { ATTACK, HIT } from "../configs/gameConfig";

const $arenas = document.querySelector('.arenas');

const playerWins = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name ? `${name} wins!` : 'Draw';

    return $winTitle;
};

const getPlayerAttack = (form) => {
    const attack = {};

    for (let item of form) {
        const { checked, name, value } = item;

        if (checked && name === 'hit') {
            attack.value = getRandom(HIT[value]);
            attack.hit = value;
        }

        if (checked && name === 'defence') {
            attack.defence = value;
        }

        item.checked = false;
    }

    return attack;
}

const getEnemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
};

const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');

    $button.innerHTML = 'Restart';
    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);

    $button.addEventListener('click', function(){
        window.location.reload();
    });
};

const showResult = (player1, player2) => {
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
        generateLogs('draw', player1, player2);
    }
};

export const onFormSubmit = (e, player1, player2) => {
    e.preventDefault();
    const enemy = getEnemyAttack();
    const player = getPlayerAttack(e.target);
    const $randomButton = document.querySelector('.button');

    if (player.defence !== enemy.hit) {
        player1.damage = enemy.value;
        player1.changeHP((enemy.value));
        player1.renderHP();
        generateLogs('hit', player2, player1);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (enemy.defence !== player.hit) {
        player2.damage = player.value;
        player2.changeHP((player.value));
        player2.renderHP();
        generateLogs('hit', player1, player2);
    } else {
        generateLogs('defence', player1, player2);
    }

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    showResult(player1, player2);
}
