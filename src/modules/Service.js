export  default class Service {
    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
            .then(res => res.json());

        return body;
    }

    getRandomPlayer = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
            .then(res => res.json());

        return body;
    }
}
