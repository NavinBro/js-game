/*
1)events
2)cookie, localStorage, sessionStorage
3)DOM elements
4)sprites+js
*/

// переменная запоминает карту 30rows x 40columns (она будет двумерным массивом)
var map = {
  legend: {
    free:   0,
    wall:   1,
    person: 2,
    bomb:   3,
    money:  4,
    shild:  5,
    bombv:  6,
    shildv: 7,
    path:   8
  },
  rows: 20,
  cols: 20,
  territory: [],
  generateMap: function(){
    for(var r=0; r<this.rows; r++){
      var row = [];
      for(var c=0; c<this.cols; c++){
        row[c] = 0; //карта с пустыми ячейками
      }
      this.territory[r] = row; //записали все в territory
    }
    var n_r = parseInt(Math.random()*this.rows);
    var n_c = parseInt(Math.random()*this.rows);

    this.territory[n_r][n_c] = this.legend.person; //записали персонажа в ячейку

    //сгенерируем 15 бомб
    var bombs = 15;
    while(bombs>0){
      var n_r = parseInt(Math.random()*this.rows);
      var n_c = parseInt(Math.random()*this.rows);

     if(this.territory[n_r][n_c]==0){
       this.territory[n_r][n_c] = this.legend.bomb;
       bombs--;
      }
     }
     //сгенерируем 5 shild
     var shilds = 5;
     while(shilds>0){
       var n_r = parseInt(Math.random()*this.rows);
       var n_c = parseInt(Math.random()*this.rows);

      if(this.territory[n_r][n_c]==0){
        this.territory[n_r][n_c] = this.legend.shild;
        shilds--;
       }
      }
      //сгенерируем 50 money
      var money_s = 50;
      while(money_s>0){
        var n_r = parseInt(Math.random()*this.rows);
        var n_c = parseInt(Math.random()*this.rows);

       if(this.territory[n_r][n_c]==0){
         this.territory[n_r][n_c] = this.legend.money;
         money_s--;
        }
       }
  },
  us_money: 0,
  us_shild: 0,
  us_lifes: 3,
  showMap: function(){
    //находим главный контайнер
    var stage = document.getElementById("stage");
    //вытираем все дивы внутри
    stage.innerHTML = "";
    //обновляем размер сцены
    var w = this.cols * 24;
    var h = this.rows * 24;
    stage.style.width = w + "px";
    stage.style.height = h + "px";
    for(var r=0; r<this.rows; r++){
      for(var c=0; c<this.cols; c++){
        var div = document.createElement("div");//создаем новый див
        if(this.territory[r][c] == this.legend.free){
          div.className = "free";
        }
        if(this.territory[r][c] == this.legend.person){
          div.className = "person";
        }
        if(this.territory[r][c] == this.legend.bomb){
          div.className = "bomb";
        }
        if(this.territory[r][c] == this.legend.bombv){
          div.className = "bombv";
        }
        if(this.territory[r][c] == this.legend.shild){
          div.className = "shild";
        }
        if(this.territory[r][c] == this.legend.shildv){
          div.className = "shildv";
        }
        if(this.territory[r][c] == this.legend.money){
          div.className = "money";
        }
        if(this.territory[r][c] == this.legend.path){
          div.className = "path";
        }

        stage.appendChild(div);
      }
    }
  },
moveRight: function(){
  for(var r=0; r<this.rows; r++){
    for(var c=0; c<this.cols; c++){
      if(this.territory[r][c] == this.legend.person && c < this.cols -1){
        // a) удаляем персонажа из ячейки (записываем в нее пустоту)
        this.territory[r][c] = this.legend.path;
        //b) переместить вправо
        if(this.territory[r][c+1] == this.legend.bomb || this.territory[r][c+1] == this.legend.bombv){ //если бомба
            this.us_lifes = this.us_lifes - 1; // -1 жизнь
            document.querySelector("#us_life span").innerHTML = this.us_lifes;
            document.querySelector(".notification").innerHTML = "Oopss BOMB";
            document.querySelector(".notification").style = "color:red";
            this.territory[r][c] = this.legend.person;
            this.territory[r][c+1] = this.legend.bombv;

            if(this.us_lifes<1){
              this.showMap();
              var t = setTimeout(function(){
                alert("game over");
                window.location.reload();
              },1000);

            }

          }
          else if(this.territory[r][c+1] == this.legend.money){
            this.us_money = this.us_money + 10;
            document.querySelector("#us_money span").innerHTML = this.us_money;
            this.territory[r][c+1] = this.legend.person;
            if(this.us_money == 500){
              alert("You win!!!");
              window.location.reload();
            }
          }
          else if(this.territory[r][c+1] == this.legend.shild){
            this.us_lifes = this.us_lifes + 1;
            document.querySelector("#us_life span").innerHTML = this.us_lifes;
            document.querySelector(".notification").innerHTML = "You get 1 life!";
            document.querySelector(".notification").style = "color:green";
            this.territory[r][c] = this.legend.person;
            this.territory[r][c+1] = this.legend.shildv;
          }
          else{
            this.territory[r][c+1] = this.legend.person;
          }
        return; //выйти из функции
      }
    }
  }
},
moveUp: function(){
  for(var r=0; r<this.rows; r++){
    for(var c=0; c<this.cols; c++){
      if(this.territory[r][c] == this.legend.person && r > 0){
        // a) удаляем персонажа из ячейки (записываем в нее пустоту)
        this.territory[r][c] = this.legend.path;
        //b) переместить вниз
        if(this.territory[r-1][c] == this.legend.bomb || this.territory[r-1][c] == this.legend.bombv){ //если бомба
            this.us_lifes = this.us_lifes - 1; // -1 жизнь
            document.querySelector("#us_life span").innerHTML = this.us_lifes;
            document.querySelector(".notification").innerHTML = "Oopss BOMB";
            document.querySelector(".notification").style = "color:red";
            this.territory[r][c] = this.legend.person;
            this.territory[r-1][c] = this.legend.bombv;
            if(this.us_lifes<1){
              this.showMap();
              var t = setTimeout(function(){
                alert("game over");
                window.location.reload();
              },1000);
            }

          }
          else if(this.territory[r-1][c] == this.legend.money){
            this.us_money = this.us_money + 10;
            document.querySelector("#us_money span").innerHTML = this.us_money;
            this.territory[r-1][c] = this.legend.person;
            if(this.us_money == 500){
              alert("You win!!!");
              window.location.reload();
            }
          }
          else if(this.territory[r-1][c] == this.legend.shild){
            this.us_lifes = this.us_lifes + 1;
            document.querySelector("#us_life span").innerHTML = this.us_lifes;
            document.querySelector(".notification").innerHTML = "You get 1 life!";
            document.querySelector(".notification").style = "color:green";
            this.territory[r][c] = this.legend.person;
            this.territory[r-1][c] = this.legend.shildv;
          }
          else{
            this.territory[r-1][c] = this.legend.person;
          }
        return; //выйти из функции
      }
    }
  }
},
moveDown: function(){
  //1) Находим персонажа
  for(var r=0; r<this.rows; r++){
    for(var c=0; c<this.cols; c++){
      if(this.territory[r][c] == this.legend.person && r < this.rows -1 ){
        // a) удаляем персонажа из ячейки (записываем в нее пустоту)
        this.territory[r][c] = this.legend.path;
        //b) переместить вниз
        if(this.territory[r+1][c] == this.legend.bomb || this.territory[r+1][c] == this.legend.bombv){ //если бомба
            this.us_lifes = this.us_lifes - 1; // -1 жизнь
            document.querySelector("#us_life span").innerHTML = this.us_lifes;
            document.querySelector(".notification").innerHTML = "Oopss BOMB";
            document.querySelector(".notification").style = "color:red";
            this.territory[r][c] = this.legend.person;
            this.territory[r+1][c] = this.legend.bombv;
            if(this.us_lifes<1){
              this.showMap();
              var t = setTimeout(function(){
                alert("game over");
                window.location.reload();
              },1000);
            }

          }
          else if(this.territory[r+1][c] == this.legend.money){
            this.us_money = this.us_money + 10;
            document.querySelector("#us_money span").innerHTML = this.us_money;
            this.territory[r+1][c] = this.legend.person;
            if(this.us_money == 500){
              alert("You win!!!");
              window.location.reload();
            }
          }
          else if(this.territory[r+1][c] == this.legend.shild){
            this.us_lifes = this.us_lifes + 1;
            document.querySelector("#us_life span").innerHTML = this.us_lifes;
            document.querySelector(".notification").innerHTML = "You get 1 life!";
            document.querySelector(".notification").style = "color:green";
            this.territory[r][c] = this.legend.person;
            this.territory[r+1][c] = this.legend.shildv;
          }
          else{
            this.territory[r+1][c] = this.legend.person;
          }
        return; //выйти из функции
      }
    }
  }
},
moveLeft: function(){
  for(var r=0; r<this.rows; r++){
    for(var c=0; c<this.cols; c++){
      if(this.territory[r][c] == this.legend.person && c > 0){
        // a) удаляем персонажа из ячейки
        // a) удаляем персонажа из ячейки (записываем в нее пустоту) (записываем в нее пустоту)
          this.territory[r][c] = this.legend.path;
        //b) переместить влево
      if(this.territory[r][c-1] == this.legend.bomb || this.territory[r][c-1] == this.legend.bombv){ //если бомба
          this.us_lifes = this.us_lifes - 1; // -1 жизнь
          document.querySelector("#us_life span").innerHTML = this.us_lifes;
          document.querySelector(".notification").innerHTML = "Oopss BOMB";
          document.querySelector(".notification").style = "color:red";
          this.territory[r][c] = this.legend.person;
          this.territory[r][c-1] = this.legend.bombv;
          if(this.us_lifes<1){
            this.showMap();
            var t = setTimeout(function(){
              alert("game over");
              window.location.reload();
            },1000);
          }

        }
        else if(this.territory[r][c-1] == this.legend.money){
          this.us_money = this.us_money + 10;
          document.querySelector("#us_money span").innerHTML = this.us_money;
          this.territory[r][c-1] = this.legend.person;
          if(this.us_money == 500){
            alert("You win!!!");
            window.location.reload();
          }
        }
        else if(this.territory[r][c-1] == this.legend.shild){
          this.us_lifes = this.us_lifes + 1;
          document.querySelector("#us_life span").innerHTML = this.us_lifes;
          document.querySelector(".notification").innerHTML = "You get 1 life!";
          document.querySelector(".notification").style = "color:green";
          this.territory[r][c] = this.legend.person;
          this.territory[r][c-1] = this.legend.shildv;
        }
        else{
          this.territory[r][c-1] = this.legend.person;
        }
        return; //выйти из функции
      }
    }
  }
}
};
function onKey(event){
  if(event.keyCode == 40) map.moveDown();
  if(event.keyCode == 38) map.moveUp();
  if(event.keyCode == 39) map.moveRight();
  if(event.keyCode == 37) map.moveLeft();
  map.showMap();

}
map.generateMap();
map.showMap();
