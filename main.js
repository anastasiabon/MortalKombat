const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['blades', 'swords'],
    attack: function() {
        console.log(this.name + ' fight');
    },
    changeHP,
    elHP,
    renderHP,
};

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['frost', 'swords'],
    attack: function() {
        console.log(this.name + ' fight');
    },
    changeHP,
    elHP,
    renderHP,
};

const players = [player1, player2];

function getRandom (max) {
    return Math.ceil(Math.random() * max);
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
};

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $img.src = playerObj.img;
    $name.innerHTML = playerObj.name;
    $life.style.width = playerObj.hp + '%';

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    return $player;
};

function changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
};

function elHP () {
    return document.querySelector('.player' + this.player + ' .life')
};

function renderHP () {
    this.elHP().style.width = this.hp + '%';
};

function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' wins!';
    } else {
        $winTitle.innerText = 'Draw';
    }

    return $winTitle;
};

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');

    $button.innerHTML = 'Restart';
    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);

    $button.addEventListener('click', function(){
        window.location.reload();
    });
};

function createArena () {
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
}

function getEnemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
};

function getUserPlayerAttack(form) {
    const attack = {};

    for (let item of form) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

function handleHP(player, value) {
    player.changeHP(value);
    player.renderHP();
};

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    const enemyAttack = getEnemyAttack();
    const userPlayerAttack = getUserPlayerAttack($formFight);

    for (let item of players) {
        if (item.userPlayer && userPlayerAttack.defence !== enemyAttack.hit) {
            handleHP(item, enemyAttack.value);
        } else if (!item.userPlayer && enemyAttack.defence !== userPlayerAttack.hit) {
            handleHP(item, userPlayerAttack.value);
        }
    }

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins())
    }
});

// узнаем игрока пользователя (за которого заполняем форму) и его противника
function getUserPlayer() {
    const userPlayerInd = getRandom(2) - 1;
    players[userPlayerInd].userPlayer = true;

    for (let item of players) {
        if (!item.userPlayer) {
            item.userPlayer = false;
            break;
        }
    }
}

// Create a new game
getUserPlayer();
createArena();

