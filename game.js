import {CharFrame, Pokemon} from './characters.js'
import {random, logThis, initElements, getLogString, getPokemon} from "./utils.js";
import {left_frame_ids, rem_elements_ids, right_frame_ids} from "./template.js";

export class Game {
    constructor() {
        [this.$divControls, this.$divStart, this.$btnStart, this.$divLeftFrame, this.$divRightFrame, this.$divEnemy, this.$divChar, this.$divGame] = initElements(rem_elements_ids);
        this.$btnStart.addEventListener('click', function () {
            this.victories = 0;
            this.showProcessView();
            this.beginGame().then(() => {
                logThis('**** Игра начинается! ****', true);
            });
        }.bind(this));
        this.$btnStop = document.createElement('button');
        this.$btnStop.classList.add('button');
        this.$btnStop.innerText = '-- Stop Game --';
        this.$btnStop.addEventListener('click', function () {
            this._character.clearButtons();
            this.showStartView();
            logThis('Игра прервана.', true);
        }.bind(this));
        this.$divGame.addEventListener('kickEnemy', function (event) {
            const {from, attack, clicks, player1, player2} = event.detail;
            const frame = this._character;
            const other = this._enemy;
            console.log('Кнопка ', attack.name, 'нажата', clicks, 'раз.');
            let deadEnemy = false;
            let deadChar = false;
            other.item.damageMe(player2, () => {
                deadEnemy = true;
            });
            other.renderHp();
            frame.item.damageMe(player1, () => {
                deadChar = true;
            });
            logThis(getLogString([frame.item, other.item, player2]));
            if (deadEnemy) {
                logThis(`**** [${frame.item.name}] побеждает [${other.item.name}]! Побед: ${++this.victories} ****`, true);
                this.initEnemy().then(() => {
                    deadEnemy = false;
                    deadChar = false;
                });

            } else {
                frame.renderHp();
                logThis(getLogString([other.item, frame.item, player1]));
                if (deadChar) {
                    logThis(`**** [${other.item.name}] побеждает [${frame.item.name}]! ****`, true);
                    let suffix = '' + this.victories;
                    suffix = suffix.charAt(suffix.length - 1) === '1' ? 'ы' : '';
                    logThis(`**** [${frame.item.name}] проигрывает после ${this.victories} побед${suffix}! ****`, true);
                    this.endGame();
                }
            }
        }.bind(this), true);

    }

    async initChars() {
        const pokemon = await getPokemon();
        this._character = new CharFrame({
            elements: initElements(left_frame_ids),
            item: new Pokemon(pokemon),
            type: '_character'
        });
        this.initEnemy().then(() => {
            this._character.placeButtons([this.$btnStop]);
        });
    }

    async beginGame() {
        await this.initChars();
        if (random(1) > 0.5) {
            this._character.enableButtons();
        } else {
            this._enemy.enableButtons();
        }
    }

    endGame() {
        this._character.disableButtons();
        this._enemy.disableButtons();
        window.setTimeout(() => {
            this._character.clearButtons();
            this.showStartView();
            logThis('Игра окончена.', true);
        }, 3000);
    }

    showStartView() {
        this.clearControls();
        this.$divControls.appendChild(this.$divStart);
        this.$divChar.style.visibility = 'hidden';
        this.$divRightFrame.style.visibility = 'hidden';
        this.$divLeftFrame.style.visibility = 'hidden';
    }

    showProcessView() {
        this.clearControls();
        this.$divControls.appendChild(this.$divChar);
        this.$divChar.style.visibility = 'visible';
        this.$divRightFrame.style.visibility = 'visible';
        this.$divLeftFrame.style.visibility = 'visible';
        this.$btnStop.disabled = false
    }

    clearControls() {
        Array.from(this.$divControls.children).forEach(e => {
            if (e === this.$divStart || e === this.$divChar) {
                e.remove();
            }
        });
    }

    startGame() {
        this.showStartView();
    }

    async initEnemy() {
        const pokemon = await getPokemon(true, this._character.item.id);
        this._enemy = new CharFrame({
            elements: initElements(right_frame_ids),
            item: new Pokemon(pokemon),
            type: '_enemy'
        });
        this._character.enemy = this._enemy;
        this._enemy.hideButtons();
    }
}