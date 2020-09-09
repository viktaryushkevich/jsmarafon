import {getDamage, logThis, updateBtn} from './utils.js'

export class Pokemon {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.lvl = props.level;
        this.type = props.type;
        this.img = props.img;
        this.MAX_HP = props.hp;
        this.hp = this.MAX_HP;
        this.def = props.defence;
        this.attacks = props.attacks;
    }

    get level() {
        return this.lvl != undefined ? this.lvl : 1;
    }

    get defence() {
        return Number.isInteger(this.def) ? this.def : 1;
    }

    damageMe(damage, after = () => {}) {
        this.hp -= Math.ceil(damage / this.defence);
        if (this.hp <= 0) {
            this.hp = 0;
            after(this);
        }
    }
}

export class CharFrame {
    constructor(props) {
        const $elements = props.elements;
        [this.$kickBtns, this.progress, this.hpField, this.levelField, this.nameField, this.imgField] = $elements;
        this.item = props.item;
        this.type = props.type;
        this.buttons = [];
        this.nameField.innerText = `${this.item.name}`;
        this.imgField.src = this.item.img;
        this.init();
    }

    init() {
        this.renderLvl();
        this.renderHp();
        logThis(`${this.item.name} приходит в этот мир!`);
    }

    renderHp() {
        this.hpField.innerText = `${this.item.hp} / ${this.item.MAX_HP}`;
        this.progress.style.width = `${Math.abs(this.item.hp / this.item.MAX_HP * 100)}%`;
    }

    renderLvl() {
        this.levelField.innerText = `Lvl ${this.item.level}`;
    }

    clickHandler(charId, enemyId, attack) {
        let clicks = 0;
        return async function () {
            const damages = await getDamage(charId, enemyId, attack.id);
            this.dispatchEvent(new CustomEvent('kickEnemy', {detail : {from: charId, attack, clicks: ++clicks, ...damages.kick}}))
            updateBtn(this, attack.name, clicks, attack.maxCount, ($b) => {$b.disabled = true});
        }
    }

    placeButtons(extra) {
        this.item.attacks.forEach(a => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            $btn._attack = a;
            updateBtn($btn, a.name, 0, a.maxCount);
            $btn.addEventListener('click', this.clickHandler(this.item.id, this.enemy.item.id, a))
            this.$kickBtns.appendChild($btn);
            this.buttons.push($btn);
        })
        if (extra != undefined && extra.length > 0) {
            extra.forEach($b => {
                this.$kickBtns.appendChild($b);
                this.buttons.push($b);
            });
        }
    }

    clearButtons() {
        Array.from(this.$kickBtns.children).forEach( c => c.remove());
        this.buttons = [];
    }

    enableButtons() {
        if(this.forEnabled === undefined || this.forEnabled.length === 0) {
            this.forEnabled = this.buttons;
        }
        this.forEnabled.forEach(b => b.disabled = false)
    }

    disableButtons() {
        let forEnabled = [];
        this.buttons.forEach($b => {
            if (!$b.disabled) {
                forEnabled.push()
            }
            $b.disabled = true;
        });
        this.forEnabled = forEnabled;
    }

    hideButtons() {
        this.buttons.forEach(b => b.style.visibility = 'hidden');
    }
}