import { BACKGROUND_COLOR, FRONT_COLOR } from "./Colors.mjs";

export default class ParticleManager {
    constructor(ctx){
        this.ctx = ctx;
        this.particles = [];
    }

    step(dt) {
        for (let i = this.particles.length-1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.vx += particle.ax * dt;
            particle.vy += particle.ay * dt;
            particle.x += particle.vx * dt;
            particle.y += particle.vy * dt;
            particle.ttl -= 1 * dt;
            if (particle.ttl <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }
    }
    explode(x, y, qty=30, ttl=0.5) {
        for (let q = 0; q < qty; q++) {
            const particle = {
                ax: 0,
                ay: 300,
                x,
                y,
                vx: 420 * (Math.random() - 0.5),
                vy: -420 * (Math.random() - 0.5),
                ttl,
            };
            this.particles.push(particle);
        }
    }
    heal(x, y, qty=30, ttl=0.5) {
        for (let q = 0; q < qty; q++) {
            const particle = {
                ax: 0,
                ay: -300,
                x,
                y,
                vx:  120 * (Math.random() - 0.5),
                vy: -420 * (Math.random() ),
                ttl,
            };
            this.particles.push(particle);
        }
    }
    block(x, y, qty=30, ttl=0.25) {
        for (let q = 0; q < qty/4; q++) {
            const particle = {
                ax: 200,
                ay: -200,
                x,
                y,
                vx:  200-Math.random()*100,
                vy:  -200+Math.random()*100,
                ttl,
            };
            this.particles.push(particle);
        }
        for (let q = 0; q < qty/4; q++) {
            const particle = {
                ax: -200,
                ay: 200,
                x,
                y,
                vx:  -200+Math.random()*100,
                vy:  200-Math.random()*100,
                ttl,
            };
            this.particles.push(particle);
        }
        for (let q = 0; q < qty/4; q++) {
            const particle = {
                ax: 200,
                ay: 200,
                x,
                y,
                vx:  200+Math.random()*100,
                vy:  200-Math.random()*100,
                ttl,
            };
            this.particles.push(particle);
        }
        for (let q = 0; q < qty/4; q++) {
            const particle = {
                ax: -200,
                ay: -200,
                x,
                y,
                vx:  -200+Math.random()*100,
                vy:  -200-Math.random()*100,
                ttl,
            };
            this.particles.push(particle);
        }


    }
    draw() {
        this.ctx.beginPath();
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            this.ctx.fillStyle = FRONT_COLOR;
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI);
        }
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = BACKGROUND_COLOR;
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            this.ctx.moveTo(particle.x+20, particle.y+20);
            this.ctx.arc(particle.x+20, particle.y+20, 2, 0, 2 * Math.PI);
        }
        this.ctx.fill();
    }

}