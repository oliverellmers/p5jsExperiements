class Metaball {
    constructor() {
        this.dir = createVector(random(-1, 1), random(-1, 1));
        this.dir = this.dir.normalize();
        this.radius = random(1, 4);
        this.pos = createVector(random(-gfx.width/2+this.radius, gfx.width/2-this.radius), random(-gfx.height/2+this.radius, gfx.height/2-this.radius) );
    }

    update() {
        this.pos.x += this.dir.x;
        this.pos.y += this.dir.y;

        if (abs(this.pos.x) + this.radius > gfx.width / 2) {
            this.dir.x *= -1;
        }
        if (abs(this.pos.y) + this.radius > gfx.height / 2) {
            this.dir.y *= -1;
        }
    }
}