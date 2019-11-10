/*************************************************

     MOBILE DROPDOWN MENU USING HTML/CSS/JS

*************************************************/

var two = 0;
var three = 0;

function TwoSubOpen(){
  $sub_menu_two = document.getElementById('two_sub_menu');
  if(!two){
    if(three){
      ThreeSubOpen();
    }
    $sub_menu_two.style.height = "68px";
    two++;
  }else{
    $sub_menu_two.style.height = "0";
    two--;
  }
}

function ThreeSubOpen(){
  $sub_menu_three = document.getElementById('three_sub_menu');
  if(!three){
    if(two){
      TwoSubOpen();
    }
    $sub_menu_three.style.height = "102px";
    three++;
  }else{
    $sub_menu_three.style.height = "0";
    three--;
  }  
}

function DisplayVariables(){
  $textbox = document.getElementById('box1');
  $textbox.innerHTML = two;
  $textboxtwo = document.getElementById('box2');
  $textboxtwo.innerHTML = three;
}