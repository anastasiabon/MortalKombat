import { logsConfig } from "../configs/logsConfig";
import { getRandom, getTextReplaced, getTime } from "../utils";

export const generateLogs = (type, playerObj1, playerObj2) => {
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
    }
    const el = `<p>${text}</p>`;

    $chat.insertAdjacentHTML('afterbegin', el);
}