const player1 = {
    name: 'Scorpion',
    hp: 100,
    img: '',
    weapon: ['blades', 'swords'],
    attack: function() {
        console.log(this.name + ' fight');
    },
};

const player2 = {
    name: 'Sub Zero',
    hp: 100,
    img: '',
    weapon: ['frost', 'swords'],
    attack: function() {
        console.log(this.name + ' fight');
    },
};

function createPlayer(playerClass, name, hp) {
    const $arenas = document.querySelector('.arenas');

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
    
    $img.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';
    $name.innerHTML = 'SCORPION';

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $arenas.appendChild($player);
};

createPlayer('player1', 'SCORPION', 50);
createPlayer('player2', 'SUB-ZERO', 80);