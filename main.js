const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['blades', 'swords'],
    attack: function() {
        console.log(this.name + ' fight');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

function getDamage (max) {
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

$randomButton.addEventListener('click', function(){
    player1.changeHP(getDamage(20));
    player1.renderHP();

    player2.changeHP(getDamage(20));
    player2.renderHP();

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

function createArena () {
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
}

createArena();
