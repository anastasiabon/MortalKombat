const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const state = {
    winner: '',
};

const currentPlayers = [
    {
        player: 1,
        name: 'SCORPION',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['blades', 'swords'],
        attack: function() {
            console.log(this.name + ' fight');
        },
    },
    {
        player: 2,
        name: 'KITANA',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        weapon: ['frost', 'swords'],
        attack: function() {
            console.log(this.name + ' fight');
        },
    }
];

function getDamage () {
    const min = 0;
    const max = 20;

    return Math.ceil(Math.random() * (max - min) + min);
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

function getWinner() {
    currentPlayers.forEach(function(item) {
        if (item.hp > 0) {
            state.winner = item.name;
        }
    });
};

function changeHP(player) {    
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const damage = getDamage();
    const playerLost = player.hp <= 0 || player.hp < damage;

    player.hp = playerLost ? 0 : player.hp - damage;

    $playerLife.style.width = player.hp + '%';

    if (player.hp === 0) {
        $randomButton.disabled = true;
        getWinner();
        $arenas.appendChild(playerWin(state.winner));
    }
};

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' wins!';

    return $winTitle;
};

$randomButton.addEventListener('click', function(){
    currentPlayers.forEach(function(item) {
        if (!state.winner) {
            changeHP(item);
        }
    });
});

function createArena () {
    currentPlayers.forEach(function(item) {
        $arenas.appendChild(createPlayer(item));
    });
}

createArena();
