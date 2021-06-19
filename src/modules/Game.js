import Player from "./Player";
import Service from "./Service";
import {
    createElement,
    getRandom,
    getTextReplaced,
    getTime,
    shuffle
} from "../utils";
import { ATTACK, HIT, PLAYERS } from "../configs/gameConfig";
import { logsConfig } from "../configs/logsConfig";


import 'core-js/stable';
import 'regenerator-runtime/runtime';

export default class Game {
    arenas = document.querySelector('.arenas');
    form = document.querySelector('.control');
    randomButton = document.querySelector('.button');
    randomPlayers = shuffle(PLAYERS).slice(0, 2);

    player1 = new Player({
        name: this.randomPlayers[0],
        hp: 100,
        player: 1,
        rootSelector: 'arenas',
    });

    player2 = new Player({
        name: this.randomPlayers[1],
        hp: 100,
        player: 2,
        rootSelector: 'arenas',
    });

    generateLogs = (type, playerObj1 = {}, playerObj2 = {}) => {
        const $chat = document.querySelector('.chat');

        const logType = logsConfig[type];
        const time = getTime();
        let text = '';
        let params = []

        switch (type) {
            case 'start':
                params = [
                    {'[time]': time},
                    {'[player1]': playerObj1.name},
                    {'[player2]': playerObj2.name},
                ];

                text = getTextReplaced(logType, params);
                break;
            case 'hit':
                params = [
                    {'[playerKick]': playerObj1.name},
                    {'[playerDefence]': playerObj2.name}
                ];

                text = `${time} - ${getTextReplaced(logType[getRandom(logType.length) - 1], params)}
             -${playerObj2.damage} [${playerObj2.hp}/100]`;
                break;
            case 'defence':
                params = [
                    {'[playerKick]': playerObj1.name},
                    {'[playerDefence]': playerObj2.name}
                ];

                text = `${time} - ${getTextReplaced(logType[getRandom(logType.length) - 1], params)}
             [${playerObj2.hp}/100]`;
                break;
            case 'end':
                params = [
                    {'[playerWins]': playerObj1.name},
                    {'[playerLose]': playerObj2.name},
                ]
                text = getTextReplaced(logType[getRandom(logType.length) - 1], params);
                break;
            case 'draw':
                text = logType;
                break;
            default:
                text = logType;
                break;
        }
        const el = `<p>${text}</p>`;

        $chat.insertAdjacentHTML('afterbegin', el);
    }

    playerWins = (name) => {
        const $winTitle = createElement('div', 'loseTitle');
        $winTitle.innerText = name ? `${name} wins!` : 'Draw';

        return $winTitle;
    };

    getPlayerAttack = (form) => {
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

    getEnemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];

        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        }
    };

    showResult = (player1, player2) => {
        if (player1.hp === 0 && player1.hp < player2.hp) {
            this.arenas.appendChild(this.playerWins(player2.name));

            this.generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            this.arenas.appendChild(this.playerWins(player1.name));

            this.generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0) {
            this.arenas.appendChild(this.playerWins())

            this.generateLogs('draw', player1, player2);
        }
    };

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $button = createElement('button', 'button');

        $button.innerHTML = 'Restart';
        $reloadWrap.appendChild($button);
        this.arenas.appendChild($reloadWrap);

        $button.addEventListener('click', function(){
            window.location.reload();
        });
    };

    onFormSubmit = (e, player1, player2) => {
        e.preventDefault();
        
        const {
            hit: enemyHit,
            defence: enemyDefence,
            value: enemyValue
        } = this.getEnemyAttack();

        const {
            hit: playerHit,
            defence: playerDefence,
            value: playerValue
        } = this.getPlayerAttack(e.target);

        if (playerDefence !== enemyHit) {
            player1.damage = enemyValue;
            player1.changeHP((enemyValue));
            player1.renderHP();

            this.generateLogs('hit', player2, player1);
        } else {
            this.generateLogs('defence', player2, player1);
        }

        if (enemyDefence !== playerHit) {
            player2.damage = playerValue;
            player2.changeHP((playerValue));
            player2.renderHP();

            this.generateLogs('hit', player1, player2);
        } else {
            this.generateLogs('defence', player1, player2);
        }

        if (player1.hp === 0 || player2.hp === 0) {
            this.randomButton.disabled = true;
            this.createReloadButton();
        }

        this.showResult(player1, player2);
    }

    start = () => {
        this.form.addEventListener('submit', (e) => {
            this.onFormSubmit(e, this.player1, this.player2);
        });

        this.player1.createPlayer();
        this.player2.createPlayer();

        this.generateLogs('start', this.player1, this.player2);

        // const serviceMK = new Service();

        // console.log(serviceMK.getPlayers());
        const getPlayers = async () => {
            const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
                .then(res => res.json());

            return body;
        }

        console.log(getPlayers());
    }
}