class  Hub {
    float radius;
    float speed;
    Object[] orbiters;
    float centerX;
    float centerY;
    float angle;

    Hub(float _radius, float _speed, Object[] _orbiters) {
        radius = _radius;
        speed = _speed;
        orbiters = _orbiters;
    
        centerX = 0;
        centerY = 0;
        angle = 0;
    
        for (int index = 0; index < orbiters.length; ++index) {
            orbiters[index].angle = ((2*PI)/orbiters.length) * index;
        }
    }

    void drawNext () {
        fill(255, 234, 0);
        ellipse(centerX, centerY, radius/10, radius/10);
    
        for (index index = 0; index < orbiters.length; ++index) {
            Object orbiter = orbiters[index];
            orbiter.centerX = centerX + cos(orbiter.angle) * radius;
            orbiter.centerY = centerY + sin(orbiter.angle) * radius;
        
            orbiter.drawNext();
            stroke(0, 0, 0);
            line(centerX, centerY, orbiter.centerX, orbiter.centerY);
        
            orbiter.angle += speed;
            if (orbiter.angle > 2 * PI) {
                orbiter.angle -= (2 * PI);
            }
        }
    }
}

class Car {
    float centerX;
    float centerY;
    float angle;

    Car () {
        centerX = 0;
        centerY = 0;
        angle = 0;
    }
    void drawNext () {
        fill(255, 234, 0);
        ellipse(centerX, centerY, 20, 20);
    }
}

Hub scrambler;

void setup () {
    size(800, 800);
    Object[] carHubs = new Array(5);
    for (int hubIndex = 0; hubIndex < carHubs.length; ++hubIndex) {
        Object[] cars = new Array(4);
        for (int carIndex = 0; carIndex < cars.length; ++carIndex) {
            cars[carIndex] = new Car();
        }
        carHubs[hubIndex] = new Hub(80, 0.02, cars);
    }
    scrambler = new Hub(200, 0.01, carHubs);
    scrambler.centerX = 400;
    scrambler.centerY = 400;
}

void draw () {
    background(255, 255, 255);
    scrambler.drawNext();
}
