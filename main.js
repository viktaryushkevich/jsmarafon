const $btn = document.getElementById('btn-kick');
const $btnSuper = document.getElementById('btn-punch');
const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
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

function changeHP(count, person) {
    if (this.damageHP < count) {
        this.damageHP = 0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        $btn.disabled = true;
    } else {
        this.damageHP -= count;
    }

    this.renderHP();

}

function random(num) {
    return Math.ceil(Math.random() * num)
}
init();