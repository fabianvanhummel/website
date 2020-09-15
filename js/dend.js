var myGamePiece;
var myObstacles = [];
var myCandies = [];
var myScore;
var myCandiesScore = 0;
var myGameArea;
var keysPressed = { "up": false, "down": false, "left": false, "right": false };

var image_character = new Image(30, 30);
image_character.src = 'file://fspaka02/userdata7c$/al15266/Documents/VueJS/secret_project/resources/images/dragon-removebg-preview.png';

var fireball = new Image(30, 30);
fireball.src = 'file://fspaka02/userdata7c$/al15266/Documents/VueJS/secret_project/resources/images/fireball.png';

var candy = new Image(30, 30);
candy.src = 'file://fspaka02/userdata7c$/al15266/Documents/VueJS/secret_project/resources/images/candy.png';

function startGame() {
    myGamePiece = new component(125, 125, "red", 10, 150, type = "player", background = image_character);
    myGamePiece.gravity = 0;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 460;
        this.canvas.style = "background: url('file://fspaka02/userdata7c$/al15266/Documents/VueJS/secret_project/resources/images/cave_cave.jpg'); position:absolute; left:550px; top: 200px; z-index:2;";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = 0;
        this.interval = setInterval(updateGameArea, 1);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type, background) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = (Math.random() * 1.5) + 0.25;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.type == "player") {
            ctx.drawImage(background, 0, 0, 480, 480, this.x, this.y, this.width, this.height);
        } else if (this.type == "fire") {
            ctx.drawImage(background, 0, 0, 200, 110, this.x, this.y, this.width, this.height);
        } else if (this.type == "candy") {
            ctx.drawImage(background, 0, 0, 625, 450, this.x, this.y, 140, 100);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBottom();
        this.hitTop();
        this.hitLeft();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height + 50;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.hitTop = function () {
        var rocktop = - 50;
        if (this.y < rocktop) {
            this.y = rocktop;
            this.gravitySpeed = 0;
        }
    }
    this.hitLeft = function () {
        var left = -50;
        if (this.x < left) {
            this.x = left;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function (otherobj) {
        var myxcenter = this.x + this.width / 2
        var objxcenter = otherobj.x + otherobj.width / 2
        var xcenterdiff = objxcenter - myxcenter
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var otherleft = otherobj.x;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var avg_pos_my = [myright, (mytop + mybottom) / 2]
        var avg_pos_obj = [otherleft, (othertop + otherbottom) / 2]
        var diff_x = avg_pos_obj[0] - avg_pos_my[0]
        var diff_y = avg_pos_obj[1] - avg_pos_my[1]

        var crash = false;
        if (diff_x < 0 && diff_x > -200 && Math.abs(diff_y) < 75 && Math.sqrt(xcenterdiff * xcenterdiff + diff_y * diff_y) < 100) {
            crash = true;
        }
        return crash;
    }
    this.findCandy = function (otherobj) {
        var myxcenter = this.x + this.width / 2
        var objxcenter = otherobj.x + otherobj.width / 2
        var xcenterdiff = objxcenter - myxcenter
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var otherleft = otherobj.x;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var avg_pos_my = [myright, (mytop + mybottom) / 2]
        var avg_pos_obj = [otherleft, (othertop + otherbottom) / 2]
        var diff_x = avg_pos_obj[0] - avg_pos_my[0]
        var diff_y = avg_pos_obj[1] - avg_pos_my[1]

        var crash = false;
        if (diff_x < 0 && diff_x > -250 && Math.abs(diff_y) < 75 && Math.sqrt(xcenterdiff * xcenterdiff + diff_y * diff_y) < 150) {
            crash = true;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, minHeight, maxHeight;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    for (i = 0; i < myCandies.length; i += 1) {
        if (myGamePiece.findCandy(myCandies[i])) {
            myCandiesScore += 1
            myCandies[i] = new component(0, 0, "red", 1000, 1000, type = "candy", background = candy)
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    if (keysPressed.down) {
        myGamePiece.speedY = 1
    }
    if (keysPressed.up) {
        myGamePiece.speedY = -1
    }
    if (keysPressed.left) {
        myGamePiece.speedX = -1
    }
    if (keysPressed.right) {
        myGamePiece.speedX = 1
    }

    if (myGameArea.frameNo == 1 || everyinterval(200)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 750;
        y = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        myObstacles.push(new component(150, 100, "green", x, y, type = "fire", background = fireball));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x +=  -myObstacles[i].gravitySpeed;
        myObstacles[i].update();
    }

    if (everyinterval(1000)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 750;
        y = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        myCandies.push(new component(150, 100, "green", x, y, type = "candy", background = candy));
    }
    for (i = 0; i < myCandies.length; i += 1) {
        myCandies[i].x += -1;
        myCandies[i].update();
    }

    myScore.text = "SCORE: " + myCandiesScore;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();

    if (myCandiesScore === 10) {
        youWin()
        return
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function youWin() {
    resetVariables()
    myGameArea.style = "visibility:hidden;"
    myGameArea.canvas.style = "visibility:hidden;"
    buttonstart.style = "visibility:visible;"
    bericht5.style = "visibility:visible;"
}

// Laat antwoord checken
myBtn.onclick = function () {
    resetVariables()
    startGame()
}

function resetVariables() {
    myObstacles = [];
    myCandies = [];
    myCandiesScore = 0;
}

function keydownFunction() {

    var keynum;

    keynum = window.event.key

    if (keynum == 'ArrowUp') {
        keysPressed["up"] = true
    }
    if (keynum == 'ArrowDown') {
        keysPressed["down"] = true
    }
    if (keynum == 'ArrowLeft') {
        keysPressed["left"] = true
    }
    if (keynum == 'ArrowRight') {
        keysPressed["right"] = true
    }
    return keysPressed
}

function keyupFunction() {

    var keynum;

    keynum = window.event.key

    if (keynum == 'ArrowUp') {
        keysPressed["up"] = false
    }
    if (keynum == 'ArrowDown') {
        keysPressed["down"] = false
    }
    if (keynum == 'ArrowLeft') {
        keysPressed["left"] = false
    }
    if (keynum == 'ArrowRight') {
        keysPressed["right"] = false
    }
    return keysPressed
};
