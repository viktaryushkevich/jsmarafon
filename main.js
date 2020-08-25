const $btn = document.getElementById('btn-kick');
const $btnSuper = document.getElementById('btn-punch');

const character = {
    name: 'Pikcahu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

$btn.addEventListener('click', function () {
    changeHP(random(20), character);
    changeHP(random(20), enemy);
});

$btnSuper.addEventListener('click', function () {
    changeHP(random(10), character);
    changeHP(random(50), enemy);
});

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}

function superHit() {
    if (character.damageHP < 50) {
        $btnSuper.style.display = 'block';
        $btnSuper.onclick = function () {
            $btnSuper.disabled = true;
        }
    }

}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        alert('Бедный ' + person.name + ' проиграл бой!');
        $btn.disabled = true;
        $btnSuper.disabled = true;
    } else {
        person.damageHP -= count;
    }
    superHit();
    renderHP(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();