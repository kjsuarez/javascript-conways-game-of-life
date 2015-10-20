var num;

$(document).ready(function(){
     looper( setSize(Prompt()) );    
    $( "li" ).click(function() {
      $( this ).addClass( "active" );
          //console.log($('#container .active').length + " active cells on this board");
         
      });
    $( document.getElementById("start") ).click(function() {
      

      //board = write_blank_board(num);
      //run_game(board); 
      el = $('li:nth-child('+1+')')
      intervalID = window.setInterval( shell, 250);
    });
    $( document.getElementById("x") ).click(function() {
      window.clearInterval(intervalID)
    });

    //console.log($('#container li').length + " cells on this board")  
});

//////////////////
function blinky() {
  el = $('li:nth-child('+1+')')
   alternate("poop");
};
 function alternate(text) {
  console.log(text);
   if (el.hasClass("active")) {el.removeClass("active")} else{el.addClass( "active" );};
 };
///////////////////

///////////////////////////////////////////////////
function Prompt() {
    num = prompt("give me a number", "2");
     return(num);
   }
function setSize(num){
    $( "#container" ).height(num*100);
     $( "#container" ).width(num*100);
    return (num);
}

function looper(containerSize){
  for (var counter = 0; counter < num*num; counter++) { writeLi(); }
}

function writeLi(){
$("<li></li>").appendTo("#container");
}
////////////////////////////////////////////////////////
function shell () {
  board = write_blank_board(num);
  run_game(board);
}


function run_game(board) {
  //console.log("in run_game, pre generating board_array");

  board_array = board_to_array(board);

  //console.log("in run_game, post generating board_array:");
  //printBoard(board_array);

  new_board_array = iterate_array(board_array);

  //console.log("in run_game, post iteration");
  //printBoard(new_board_array);
  array_to_board(board.length, new_board_array);

  //console.log("post board writing");
};

function board_to_array(board){  // generates a 2d array from dom elements in 'container'
  var length = board.length;
  var area = length*length;
  for (var counter = 1; counter <= area; counter++) { 
    el = $('li:nth-child('+counter+')');

    x = coordinates(counter, length)[0];  y = coordinates(counter, length)[1];
      if (el.hasClass("active")) { board[y][x] = 1;};
  };
  return board;
};

function write_blank_board (side_length) {
  board = []; row = [];  
  for(count = 0; count<side_length; count++){
        row = [];
        for (var i = 0; i <= side_length-1; i++) { row.push(0); };
      board.push(row);
    };
  return board;
}

function coordinates (index, side_length) { // takes the index of an element and the
  if (index%side_length === 0){           // side length of a square, and returns that index's 
       x = side_length-1; y = (index/side_length); // xy coordinates
  }else{
       x = (index%side_length)-1; 
       y = (Math.floor(index/side_length))+1;};

  return [x,y-1];
}

function coordinates_to_index(coordinates, side_length) {
  var x = coordinates[0]; var y = coordinates[1];
  var index = 0;
  if (x === side_length-1) {index = (y+1)*side_length} else{index = (y*side_length)+(x+1)};

  return index;
}

function printBoard (board) {  //prints the board as an array to the console
  for (var i = 0; i <= board.length-1; i++) {
    console.log(board[i]);
  };
}

////////////

function array_to_board(length, array) {
  for (var y = 0; y <= array.length-1; y++) {
    for (var x = 0; x <= array.length-1; x++) {
      value = array[y][x]
      index = coordinates_to_index([x,y],length);
      el = $('li:nth-child('+index+')');
      if (value === 1) { el.addClass( "active" );} else{el.removeClass( "active")};
    };
  };
};

function iterate_array (board_array) {  // takes the board array and loops through each cell
  length = board_array.length            // examining those ajacent and applying the four rules;
  area = length*length;
  test = write_blank_board(length);

  for (var i = 1; i <= area; i++) {
    var neighbor_count = 0;
    coords = coordinates(i,length);
    x = coords[0]; y = coords[1];
    cell = board_array[y][x];
    
    neighbor_count += check_cell(up(coords, length),board_array);
    neighbor_count += check_cell(up_right(coords, length),board_array);
    neighbor_count += check_cell(right(coords, length),board_array);
    neighbor_count += check_cell(down_right(coords, length),board_array);
    neighbor_count += check_cell(down(coords, length),board_array);
    neighbor_count += check_cell(down_left(coords, length),board_array);
    neighbor_count += check_cell(left(coords, length),board_array);
    neighbor_count += check_cell(up_left(coords, length),board_array);

    //console.log(coords+" number of neighbours: "+neighbor_count);
    //console.log("cell contents (1 or 0): "+cell)

    if (cell === 1 && neighbor_count<2) {test[coords[1]][coords[0]]=0; }
    else if (cell === 1 && neighbor_count>=2&&neighbor_count<=3){test[coords[1]][coords[0]]=1; }
    else if (cell === 1 && neighbor_count>3){test[coords[1]][coords[0]]=0;} 
    else if (cell === 0 && neighbor_count === 3){test[coords[1]][coords[0]]=1;}  
    else{};
  };
  // Any live cell with fewer than two live neighbours dies,
  // as if caused by under-population.

  //Any live cell with two or three live neighbours
  // lives on to the next generation.

  //Any live cell with more than three live neighbours
  // dies, as if by over-population

  //Any dead cell with exactly three live neighbours
  // becomes a live cell, as if by reproduction.
  return test;
};


function check_cell (coords,array) {
  x=coords[0]; y = coords[1];
  return array[y][x];

}

function up (arry, length) {    
  x = arry[0]; y = arry[1];
  if (y===0){return [x,length-1]} else{ return [x,y-1]};
}
function up_right (arry, length) {  
  x = arry[0]; y = arry[1];
  if (y===0&&x==length-1){return [0,length-1]} 
  else if(y===0){return [x+1,length-1]}
  else if(x===length-1){return [0,y-1]}   
  else{ return [x+1,y-1]};
}
function right (arry, length) {
  x = arry[0]; y = arry[1];
  if (x===length-1){return [0,y]} else{ return [x+1,y]};
}
function down_right (arry, length) {    
  x = arry[0]; y = arry[1];
  if (y===length-1&&x==length-1){return [0,0]} 
  else if(y===length-1){return [x+1,0]}
  else if(x===length-1){return [0,y+1]}   
  else{ return [x+1,y+1]};
}
function down (arry, length) {
  x = arry[0]; y = arry[1];
  if (y===length-1){return [x,0]} else{ return [x,y+1]};
}
function down_left (arry, length) {   
  x = arry[0]; y = arry[1];
  if (x===0&&y==length-1){return [0,length-1]} 
  else if(y===length-1){return [x-1,0]}
  else if(x===0){return [length-1,y+1]}   
  else{ return [x-1,y+1]};
}
function left (arry, length) {
  x = arry[0]; y = arry[1];
  if (x===0){return [length-1,y]} else{ return [x-1,y]};
}
function up_left (arry, length) {
  x = arry[0]; y = arry[1];
  if (y===0&&x===0){return [length-1,length-1]} 
  else if(y===0){return [x-1,length-1]}
  else if(x===0){return [length-1,y-1]}  
  else{ return [x-1,y-1]};
}

