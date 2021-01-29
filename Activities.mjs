export default class Activities {
    constructor(x = 300, y = 120) {
      this.x = x;
      this.y = y;
      this.activities = [];
    }
  
    add(activity) {
      this.activities.push(activity);
      activity.draggable = false;
    }
    delete(activity) {
      const idx = this.activities.indexOf(activity);
      this.activities.splice(idx, 1);
    }
  
    draw(ctx) {
        for (let s = 0; s < Math.min(this.activities.length, 2); s++) {
            const activity = this.activities[s];
            activity.x = this.x + activity.w * s;
            activity.y = this.y;
            activity.draw(ctx);
      }
    }
  
    expire(dt, game) {
      for (let s = 0; s < Math.min(this.activities.length, 2); s++) {
        const activity = this.activities[s];
        activity.expire -= 1 * dt;
        if (activity.expire <= 0) {
          this.delete(activity);
          game.reputation--;
        }
      }
    }
  
    check(x, y) {
      return this.activities.find((sac) => sac.hasPoint({ x, y }));
    }
  }
  