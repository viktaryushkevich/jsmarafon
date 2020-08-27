function $getElById(id) {
    return document.getElementById(id);
}

const $btn = $getElById('btn-kick');
const $btnSuper = $getElById('btn-punch');
const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}
$btn.addEventListener('click', function() {
    console.log('kick');
    console.log(random(20));
    changeHP(random(20), character);
    changeHP(random(20), enemy);
});

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    this.elHP.innerText = this.damageHP + '/' + this.defaultHP;
}

function renderProgressbarHP() {
    this.elProgressbar.style.width = this.damageHP + '%';
}

function superHit() {
  if (character.damageHP < 50) {
      $btnSuper.style.display = 'block';
      $btnSuper.onclick = function () {
          $btnSuper.disabled = true;
      }
  }

}

function changeHP(count) {
    this.damageHP -= count;
    const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
    console.log(log);
    const $logs = document.querySelector('#logs');
    if (this.damageHP < count) {
        this.damageHP = 0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        $btn.disabled = true;
    } else {
        
    }

    this.renderHP();

}

function random(num) {
    return Math.ceil(Math.random() * num)
}

function params() {
    return `-${character.defaultHP - character.damageHP} ${character.damageHP}/${character.defaultHP}`;
}

function generateLog(firstPerson, secondPerson) {
    const {name} = character;
    const {name: enName} = enemy;
    const $p = document.createElement('p');
    $p.innerText = [

        `${name} вспомнил что-то важное, но неожиданно ${enName}, не помня себя от испуга, ударил в предплечье врага. ${params()}`,
        `${name} поперхнулся, и за это ${enName} с испугу приложил прямой удар коленом в лоб врага. ${params()}`,
        `${name} забылся, но в это время наглый ${enName}, приняв волевое решение, неслышно подойдя сзади, ударил. ${params()}`,
        `${name} пришел в себя, но неожиданно ${enName} случайно нанес мощнейший удар. ${params()}`,
        `${name} поперхнулся, но в это время ${enName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${params()}`,
        `${name} удивился, а ${enName} пошатнувшись влепил подлый удар. ${params()}`,
        `${name} высморкался, но неожиданно ${enName} провел дробящий удар. ${params()}`,
        `${name} пошатнулся, и внезапно наглый ${enName} беспричинно ударил в ногу противника. ${params()}`,
        `${name} расстроился, как вдруг, неожиданно ${enName} случайно влепил стопой в живот соперника. ${params()}`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${enName} со скуки, разбил бровь сопернику. ${params()}`

    ]

    const $logs = document.querySelector('#logs')
    $logs.insertBefore($p, $logs.children[0])
    return $p[random($logs.length)-1];
}
init();