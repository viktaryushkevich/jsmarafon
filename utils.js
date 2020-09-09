import {dmgMessages} from "./templates.js";


const $logs = document.querySelector('#logs');
const baseUrl = 'https://newpkemon-api.netlify.app';

export function getById(id) {
    return document.getElementById(id);
}

export function initElements(ids) {
    return ids.map(id => getById(id));
}

export function random(arg) {
    return Math.ceil(Math.random() * arg);
}

export function updateBtn($btn, action, clicks, maxClicks, after = (o) => {}) {
    $btn.innerHTML = `<div class="action-name">${action}</div><div class="attempts-count">Осталось ударов: ${maxClicks - clicks}</div>`;
    if (maxClicks - clicks <= 0) {
        after($btn);
    }
}

export function logThis(message, blame = false) {
    const $msgEl = document.createElement('p');
    $msgEl.classList.add('log_message');
    if (blame) {
        $msgEl.classList.add('red');
    }
    $msgEl.innerHTML = message;
    $logs.insertBefore($msgEl, $logs.children[0]);
}

export function getLogString(args) {
    const [char, enemy, damage] = args;
    const logs = [
        `[${enemy.name}] вспомнил что-то важное, но неожиданно [${char.name}], не помня себя от испуга, ударил в предплечье врага.`,
        `[${enemy.name}] поперхнулся, и за это [${char.name}] с испугу приложил прямой удар коленом в лоб врага.`,
        `[${enemy.name}] забылся, но в это время наглый [${char.name}], приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `[${enemy.name}] пришел в себя, но неожиданно [${char.name}] случайно нанес мощнейший удар.`,
        `[${enemy.name}] поперхнулся, но в это время [${char.name}] нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `[${enemy.name}] удивился, а [${char.name}] пошатнувшись влепил подлый удар.`,
        `[${enemy.name}] высморкался, но неожиданно [${char.name}] провел дробящий удар.`,
        `[${enemy.name}] пошатнулся, и внезапно наглый [${char.name}] беспричинно ударил в ногу противника.`,
        `[${enemy.name}] расстроился, как вдруг, неожиданно [${char.name}] случайно влепил стопой в живот соперника.`,
        `[${enemy.name}] пытался что-то сказать, но вдруг, неожиданно [${char.name}] со скуки, разбил бровь сопернику.`
    ];

    const prefix = logs[random(logs.length - 1)];
    const dmgType = dmgMessages[char.type] != undefined ? dmgMessages[char.type] : char.type;
    const result = `${prefix} [${enemy.name}] получил <span class="red">${damage}</span> <span class="italic">${dmgType}</span> урона. У него осталось <span class="green">${enemy.hp}</span> hp.`;

    return result;
}

export async function getPokemon(random = true, id=-1) {
    const url = new URL('/api/pokemons', baseUrl);
    if (random) {
        url.searchParams.append('random', true);
        if (id > -1) {
            url.searchParams.append('expectId', id);
        }
    } else {
        url.searchParams.append('id', id);
    }

    const response = await fetch(url);
    const body = await response.json();
    return body;
}

export async function getDamage(charId, enemyId, attackId) {
    const url = new URL('/api/fight', baseUrl);
    url.searchParams.append('player1id', charId);
    url.searchParams.append('player2id', enemyId);
    url.searchParams.append('attackId', attackId);

    const response = await fetch(url);
    const body = await response.json();
    return body;
}