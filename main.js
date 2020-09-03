import Pokemon from "./pokemon";
import { pokemons } from "./pokemons";

function $getElById(id) {
    return document.getElementById(id);
}

const randomPokemon = randomPokemon ();
const pokemonItem = pokemon.find((item) => item.name === randomPokemon);
const player1 = new Pokemon({
    ...pockemonItem,
    selectors: 'player1',
})
const player2 = new Pokemon({
    ...pockemonItem,
    selectors: 'player2',
})

const $elImg1 = document.getElementById('image-player1');
const $elImg2 = document.getElementById('image-player2');
const imgPok = pokemonItem.img;



function startGame() {
    newButtons = document.querySelectorAll(".comtrol .button");
    newButtons.forEacj(($item)=>($item).remove);
}

const $btn = $getElById('btn-kick');
const $btnSuper = $getElById('btn-punch');

const player1 = new Pokemon ({
    name: 'Pikachu',
    type: 'electric',
    hp: 500,
    selectors: 'character',
});

const player2 = new Pokemon ({
    name: 'Charmander',
    type: 'fire',
    hp: 450,
    selectors: 'enemy',
});




$btn.addEventListener('click', function() {
    console.log('kick');
    console.log(random(20));
    player1.changeHP(random(60,20));
    player2.changeHP(random(60,20));

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function params() {
    return `-${character.defaultHP - character.damageHP} ${character.damageHP}/${character.defaultHP}`;
}

function showBtnCountClick(){
    let count = 0;
    return function(button, defaultNumCick = 5){
        console.log(`Кнопка ${button.id} нажата ${count} раз, и у нее осталось ${defaultNumCick-count} нажатий`);  
        if(button.text === undefined){ button.text = button.innerText;}

        button.innerText = ${button.text} [${(defaultNumCick - count)}]; 

        if ( count > defaultNumCick-1){
            button.disabled = true
        } 
        console.log(button);
        count++;
    }   
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