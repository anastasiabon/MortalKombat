export default function Player(name, playerNum) {
    const refactoredName = name.replace(/ /g,'').toLowerCase();

    this.player = playerNum;
    this.name = name;
    this.hp =  100;
    this.img = `http://reactmarathon-api.herokuapp.com/assets/${refactoredName}.gif`;

    this.changeHP = (damage) => {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.hp = 0;
        }
    };
    this.elHP = () => {
        return document.querySelector('.player' + this.player + ' .life')
    }
    this.renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }
}