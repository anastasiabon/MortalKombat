const $arenas = document.querySelector('.arenas');

const player1 = {
    name: 'SCORPION',
    hp: 77,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['blades', 'swords'],
    attack: function() {
        console.log(this.name + ' fight');
    },
};

const player2 = {
    name: 'KITANA',
    hp: 85,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['frost', 'swords'],
    attack: function() {
        console.log(this.name + ' fight');
    },
};

function createPlayer(playerClass, player) {
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $img = document.createElement('img');

    $player.classList.add(playerClass);
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $life.classList.add('life');
    $name.classList.add('name');
    
    $img.src = player.img;
    $name.innerHTML = player.name;
    $life.style.width = player.hp + '%';

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $arenas.appendChild($player);
};

createPlayer('player1', player1);
createPlayer('player2', player2);