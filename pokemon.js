class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressBar = document.getElementById(`progressbar-${name}`);
    }
}
    
class Pokemon extends Selectors {
    constructor({name, hp, type, selectors}) {
        super(selectors);

        this.name = name;
        this hp = {
            current: hp,
            total: hp,
        };
        this type = type;

        this renderHP();
    }

    changeHP = (count) => {
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

    
    }
    
    random = (num) => {
        return Math.ceil(Math.random() * num)
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }
    
    renderHPLife = () => {
        this.elHP.innerText = this.damageHP + '/' + this.defaultHP;
    }
    
    renderProgressbarHP = () => {
        this.elProgressbar.style.width = this.damageHP + '%';
    }
    
    superHit = () => {
      if (character.damageHP < 50) {
          $btnSuper.style.display = 'block';
          $btnSuper.onclick = function () {
              $btnSuper.disabled = true;
          }
      }
    
    }



}

export default Pokemon;