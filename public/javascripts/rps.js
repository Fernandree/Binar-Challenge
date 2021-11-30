class Games {

    constructor() {
      if (this.constructor == Games) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
  
    victory() {
      throw new Error("Method 'say()' must be implemented.");
    }

    draw(){
        document.getElementById('result').classList.add('banner');
        document.getElementById('result').innerHTML = `<h5 style="color:white"><b>DRAW</b></h5>`;
    }
  }

class Stone extends Games {
    constructor(name,type){
        super();
        this.name = name;
        this.type = type;
        if(this.type == 'Player'){
            let div_batu_player = document.getElementById('batu_player');
            div_batu_player.innerHTML += "<img src='../images/assets/batu.png' alt='Batu' style='width: 50px;height:75px;'>";
        }else{
            let div_batu_cpu = document.getElementById('batu_cpu');
            div_batu_cpu.innerHTML += "<img src='../images/assets/batu.png' alt='Batu' style='width: 50px;height:75px;'>";
        }
    }

    victory(){
        document.getElementById('result').classList.add('banner');
        document.getElementById('result').innerHTML = `<h5 style="color:white;vertical-align: -webkit-baseline-middle;"><b>${this.name} WIN!</b></h5>`;
    }
}

class Scissors extends Games{
    constructor(name,type){
        super();
        this.name = name;
        this.type = type;
        if(this.type == 'Player'){
            let div_gunting_player = document.getElementById('gunting_player');
            div_gunting_player.innerHTML += "<img src='../images/assets/gunting.png' alt='gunting' style='width: 50px; height:75px;'>";
        }else{
            let div_gunting_cpu = document.getElementById('gunting_cpu');
            div_gunting_cpu.innerHTML += "<img src='../images/assets/gunting.png' alt='gunting' style='width: 50px; height:75px;'>";
        }
    }
    victory(){
        document.getElementById('result').classList.add('banner');
        document.getElementById('result').innerHTML = `<h5 style="color:white;vertical-align: -webkit-baseline-middle;"><b>${this.name} WIN!</b></h5>`;
    }
}


class Paper extends Games {
    constructor(name,type){
        super();
        this.name = name;
        this.type = type;
        if(this.type == 'Player'){
            let div_kertas_player = document.getElementById('kertas_player');
            div_kertas_player.innerHTML += "<img src='../images/assets/kertas.png' alt='kertas' style='width: 50px;height:75px;'>";
        }else{
            let div_kertas_cpu = document.getElementById('kertas_cpu');
            div_kertas_cpu.innerHTML += "<img src='../images/assets/kertas.png' alt='kertas' style='width: 50px;height:75px;'>";
        }
    }    
    victory(){
        document.getElementById('result').classList.add('banner');
        document.getElementById('result').innerHTML = `<h5 style="color:white; vertical-align: -webkit-baseline-middle;"><b>${this.name} WIN!</b></h5>`;
    }
}

let stone_player = new Stone("Stone Player 1", "Player");
let stone_cpu    = new Stone("Stone CPU","CPU");

let scissors_player = new Scissors("Scissors Player 1","Player");
let scissors_cpu    = new Scissors("Scissors CPU","CPU");

let paper_player = new Paper("Paper Player 1","Player");
let paper_cpu    = new Paper("Paper CPU","CPU");

let s1 = document.getElementById('batu_player');
let s2 = document.getElementById('batu_cpu');

let sc1 = document.getElementById('gunting_player');
let sc2 = document.getElementById('gunting_cpu');

let p1 = document.getElementById('kertas_player');
let p2 = document.getElementById('kertas_cpu');

let result = document.getElementById('result');

let choose1 = "";
let choose2 = "";

document.getElementById('refresh').addEventListener('click', event =>{
    s1.classList.remove('active');
    sc1.classList.remove('active');
    p1.classList.remove('active');

    s2.classList.remove('active');
    sc2.classList.remove('active');
    p2.classList.remove('active');

    result.classList.remove('banner');
    result.innerHTML = '<h1 style="color:red"><b>VS</b></h1>'

    choose1 = "";
    choose2 = "";
});

s1.addEventListener("click", event =>{
    if(!(p1.classList.contains('active')) && !(sc1.classList.contains('active'))){
        s1.classList.add('active');
        sc1.classList.remove('active');
        p1.classList.remove('active');
        choose1 = 'batu';
        console.log("Player 1 Memilih " + choose1 );
        setTimeout(() => {
            check();
        }, 1500);
    }
});

// s2.addEventListener("click", event =>{
//     if(!(p2.classList.contains('active')) && !(sc2.classList.contains('active'))){
//         s2.classList.add('active');
//         sc2.classList.remove('active');
//         p2.classList.remove('active');
//         choose2 = 'batu';
//         check();
//     }
// });

sc1.addEventListener("click", event =>{
    if(!(s1.classList.contains('active')) && !(p1.classList.contains('active'))){
        sc1.classList.add('active');
        s1.classList.remove('active');
        p1.classList.remove('active');
        choose1 = 'gunting';
        console.log("Player 1 Memilih " + choose1 );
        setTimeout(() => {
            check();
        }, 1500);
        //alert(!(s1.classList.contains('active') + " " + !(p1.classList.contains('active'))));
    }
});

// sc2.addEventListener("click", event =>{
//     if(!(s2.classList.contains('active')) && !(p2.classList.contains('active'))){
//         sc2.classList.add('active');
//         s2.classList.remove('active');
//         p2.classList.remove('active');
//         choose2 = 'gunting';
//         check();
//     }
// });

p1.addEventListener("click", event =>{
    if(!(s1.classList.contains('active')) && !(sc1.classList.contains('active'))){
        p1.classList.add('active');
        sc1.classList.remove('active');
        s1.classList.remove('active');
        choose1 = 'kertas';
        console.log("Player 1 Memilih " + choose1 );
        setTimeout(() => {
            check();
        }, 1500);
        //alert(!(s1.classList.contains('active') + " " + !(sc1.classList.contains('active'))));
    }
});

// p2.addEventListener("click", event =>{
//     if(!(s2.classList.contains('active')) && !(sc2.classList.contains('active'))){
//         p2.classList.add('active');
//         sc2.classList.remove('active');
//         s2.classList.remove('active');
//         choose2 = 'kertas';
//         check();
//     }
// });


const check = () =>{
    let arr = ['batu','gunting','kertas'];
    let cpu = arr[Math.floor(Math.random()*arr.length)];
    console.log("CPU memilih " + cpu);
    if(choose1 == 'batu' && cpu == 'batu'){
        s2.classList.add('active');
        console.log('SERI');
        stone_player.draw();
    }else if(choose1 == 'batu' && cpu == 'gunting'){
        sc2.classList.add('active');
        console.log('Player 1 Menang!');
        document.getElementById('result').classList.add('banner');
        document.getElementById('result').innerHTML = '<h2 style="color:white"><b>Seri</b></h2>';
        stone_player.victory();
    }else if(choose1 == 'batu' && cpu == 'kertas'){
        p2.classList.add('active');
        console.log('Player 2 Menang!');
        paper_cpu.victory();
    }else if(choose1 == 'kertas' && cpu == 'batu'){
        s2.classList.add('active');
        console.log('Player 1 Menang!');
        paper_player.victory();
    }else if(choose1 == 'kertas' && cpu == 'kertas'){
        p2.classList.add('active');
        console.log('SERI');
        paper_player.draw();
    }else if(choose1 == 'kertas' && cpu == 'gunting'){
        sc2.classList.add('active');
        console.log('Player 2 Menang!');
        scissors_cpu.victory();
    }else if(choose1 == 'gunting' && cpu == 'batu'){
        s2.classList.add('active');
        console.log('Player 2 Menang!');
        stone_cpu.victory();
    }else if(choose1 == 'gunting' && cpu == 'kertas'){
        p2.classList.add('active');
        console.log('Player 1 Menang!');
        scissors_player.victory();
    }else if(choose1 == 'gunting' && cpu == 'gunting'){
        sc2.classList.add('active');
        console.log('SERI');
        scissors_player.draw();
    }else{
        return 0;
    }
}