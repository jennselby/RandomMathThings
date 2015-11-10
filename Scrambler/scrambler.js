var Rotator = function(radius, speed, orbiters) {
    this.radius = radius;
    this.orbiters = orbiters;
    this.speed = speed;
    
    this.centerX = 0;
    this.centerY = 0;
    this.angle = 0;
    
    for (var index = 0; index < orbiters.length; ++index) {
        this.orbiters[index].angle = (360/this.orbiters.length) * index;
    }
};

Rotator.prototype.drawNext = function() {
    fill(255, 234, 0);
    ellipse(this.centerX, this.centerY, this.radius/10, this.radius/10);
    
    for (var index = 0; index < this.orbiters.length; ++index) {
        var orbiter = this.orbiters[index];
        orbiter.centerX = this.centerX + cos(orbiter.angle) * this.radius;
        orbiter.centerY = this.centerY + sin(orbiter.angle) * this.radius;
        
        orbiter.drawNext();
        stroke(0, 0, 0);
        line(this.centerX, this.centerY, orbiter.centerX, orbiter.centerY);
        
        orbiter.angle += this.speed;
    }
};

var Circle = function () {
    this.centerX = 0;
    this.centerY = 0;
    this.angle = 0;
};

Circle.prototype.drawNext = function () {
    fill(255, 234, 0);
    ellipse(this.centerX, this.centerY, 20, 20);
};

var carHubs = new Array(5);
for (var hubIndex = 0; hubIndex < carHubs.length; ++hubIndex) {
    var cars = new Array(4);
    for (var carIndex = 0; carIndex < cars.length; ++carIndex) {
        cars[carIndex] = new Circle();
    }
    carHubs[hubIndex] = new Rotator(40, 2, cars);
}
var scrambler = new Rotator(100, 1, carHubs);
scrambler.centerX = 200;
scrambler.centerY = 200;

var draw = function() {
    background(255, 255, 255);
    scrambler.drawNext();
};
