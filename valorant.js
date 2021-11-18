class Agent {
    constructor(props){
        if (this.constructor === Agent) {
            throw new Error("Cannot instantiate from Abstract Class")
        }

        let {name, skills} = props;
        this.name = name;
        this.skills = skills;
    }

    shoot(){
        document.getElementById('result').innerHTML += (`${this.name} is Shooting! <br>`);
    }
    buy(){
        document.getElementById('result').innerHTML += (`${this.name} is Buying items! <br>`);
    }
    kill(){
        document.getElementById('result').innerHTML += (`${this.name} is Killing enemy! <br>`);
    }
    _introduce(){
        document.getElementById('result').innerHTML += (`Hello My Name is ${this.name} <br>`);
    }
    #skill(){
        throw new Error("Method 'skill' must be implemented.");
    }
}

const Sentinel = Base => class extends Base{
    holding(){
        document.getElementById('result').innerHTML += (`${this.name} is holding! <br>`);
    }
}

const Duelist = Base => class extends Base{
    entry(){
        document.getElementById('result').innerHTML += (`${this.name} is entering! <br>`);
    }
}

const Controller = Base => class extends Base{
    block(){
        document.getElementById('result').innerHTML += (`${this.name} is blocking! <br>`);
    }
}

const Initiator = Base => class extends Base{
    initiate(){
        document.getElementById('result').innerHTML += (`${this.name} is initiating! <br>`);
    }
}

class Sage extends Sentinel(Agent){
    constructor(props){
        super(props);
        let {name, skills} = props;

        this.name = name;
        this.skills = skills;
    }
    #skills(){
        document.getElementById('result').innerHTML += (`My skills are ${this.skills} <br>`);
    }
    _introduce(){
        document.getElementById('result').innerHTML += ("I am a Sentinel! <br>");
    }
    play(){
        super._introduce();
        this._introduce();
        this.#skills();
        super.buy();
        super.holding();
        super.shoot();
        super.kill();
    }
}

class Omen extends Controller(Agent){
    constructor(props){
        super(props);
        let {name, skills} = props;

        this.name = name;
        this.skills = skills;
    }
    #skills(){
        document.getElementById('result').innerHTML += (`My skills are ${this.skills} <br>`);
    }
    _introduce(){
        document.getElementById('result').innerHTML += ("I am a Controller! <br>");
    }
    play(){
        super._introduce();
        this._introduce();
        this.#skills();
        super.buy();
        super.block();
        super.shoot();
        super.kill();
    }
}

class Sova extends Initiator(Agent){
    constructor(props){
        super(props);
        let {name, skills} = props;

        this.name = name;
        this.skills = skills;
    }
    #skills(){
        document.getElementById('result').innerHTML += (`My skills are ${this.skills} <br>`);
    }
    _introduce(){
        document.getElementById('result').innerHTML += ("I am an Initiator! <br>");
    }
    play(){
        super._introduce();
        this._introduce();
        this.#skills();
        super.buy();
        super.initiate();
        super.shoot();
        super.kill();
    }
}

class Reyna extends Duelist(Agent){
    constructor(props){
        super(props);
        let {name, skills} = props;

        this.name = name;
        this.skills = skills;
    }
    #skills(){
        document.getElementById('result').innerHTML += (`My skills are ${this.skills} <br>`);
    }
    _introduce(){
        document.getElementById('result').innerHTML += ("I am a Duelist! <br>");
    }
    play(){
        super._introduce();
        this._introduce();
        this.#skills();
        super.buy();
        super.entry();
        super.shoot();
        super.kill();
    }
}

const create_hero = () => {
    let hero_name = document.getElementById("name").value;
    let class_hero = document.getElementById("type").value;
    let hero_skills = [];
    hero_skills.push(document.getElementById('skill1').value);
    hero_skills.push(document.getElementById('skill2').value);
    hero_skills.push(document.getElementById('skill3').value);
    hero_skills.push(document.getElementById('skill4').value);
    //class_hero = 'Sage';
    
    if(class_hero == "Sage"){
        var new_hero = new Sage({
            name :hero_name, 
            skills: hero_skills
        })
    }else if(class_hero == "Omen"){
        var new_hero = new Omen({
            name :hero_name, 
            skills: hero_skills
        })
    }else if(class_hero == "Sova"){
        var new_hero = new Sova({
            name :hero_name, 
            skills: hero_skills
        })
    }else if(class_hero == "Reyna"){
        var new_hero = new Reyna({
            name :hero_name, 
            skills: hero_skills
        })
    }
    new_hero.play();
}
    
