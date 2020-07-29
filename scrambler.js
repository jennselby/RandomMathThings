var Hub = function(_radius, _speed, _orbiters) {
    this.radius = _radius;
    this.speed = _speed;
    this.orbiters = _orbiters;
    this.centerX = 0;
    this.centerY = 0;
    this.angle = 0;

    for (var index = 0; index < this.orbiters.length; ++index) {
        this.orbiters[index].angle = ((2*Math.PI)/this.orbiters.length) * index;
    }
}

Hub.prototype.drawNext = function (context) {
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius/10, 0, 2 * Math.PI, false);
    context.fillStyle = '#FFEA00';
    context.fill();
    context.stroke();
    
    for (var index = 0; index < this.orbiters.length; ++index) {
        var orbiter = this.orbiters[index];
        orbiter.centerX = this.centerX + Math.cos(orbiter.angle) * this.radius;
        orbiter.centerY = this.centerY + Math.sin(orbiter.angle) * this.radius;
    
        orbiter.drawNext(context);

        context.beginPath();
        context.moveTo(this.centerX, this.centerY);
        context.lineTo(orbiter.centerX, orbiter.centerY);
        context.stroke();
    
        orbiter.angle += this.speed;
        if (orbiter.angle > 2 * Math.PI) {
            orbiter.angle -= (2 * Math.PI);
        }
    }
}

function Car(_centerX, _centerY, _angle) {
    this.centerX = _centerX;
    this.centerY = _centerY;
    this.angle = _angle;
}

Car.prototype.drawNext = function (context) {
    context.beginPath();
    context.arc(this.centerX, this.centerY, 20, 0, 2 * Math.PI, false);
    context.fillStyle = '#FFEA00';
    context.fill();
    context.stroke();
}

var scrambler;

function setup () {
    var numHubs = 5;
    var hubSize = 200;
    var hubSpeed = 0.01;

    var numCars = 4;
    var carSize = 80;
    var carSpeed = 0.02;

    var carHubs = new Array(numHubs);
    for (var hubIndex = 0; hubIndex < carHubs.length; ++hubIndex) {
        var cars = new Array(numCars);
        for (var carIndex = 0; carIndex < cars.length; ++carIndex) {
            cars[carIndex] = new Car();
        }
        carHubs[hubIndex] = new Hub(carSize, carSpeed, cars);
    }
    scrambler = new Hub(hubSize, hubSpeed, carHubs);
    scrambler.centerX = 400;
    scrambler.centerY = 400;
}

function draw () {
    var canvas = document.getElementById("scramblerCanvas");
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    scrambler.drawNext(context);
}

setup();
window.setInterval(draw, 17);
