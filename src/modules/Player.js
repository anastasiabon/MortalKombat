import {createElement} from "../utils";

export default class Player {
    constructor(props) {
        const { name, hp, player, rootSelector } = props;

        this.name = name;
        this.hp = hp;
        this.img =
            `http://reactmarathon-api.herokuapp.com/assets/${name.replace(/ /g,'').toLowerCase()}.gif`;
        this.player = player;
        this.selector = `player${this.player}`;
        this.rootSelector = rootSelector;
    }

    changeHP = (damage) => {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`)
    }

    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }

    createPlayer = () => {
        const $player = createElement('div', this.selector);
        const $progressbar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $img = createElement('img');

        $img.src = this.img;
        $name.innerHTML = this.name;
        $life.style.width = this.hp + '%';

        $player.appendChild($progressbar);
        $player.appendChild($character);

        $progressbar.appendChild($life);
        $progressbar.appendChild($name);

        $character.appendChild($img);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);

        return $player;
    };
}
