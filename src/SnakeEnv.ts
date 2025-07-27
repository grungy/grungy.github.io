export type Cell = { x: number; y: number };
export type Obstacle = { x: number; y: number; width: number; height: number };

export const CELL_SIZE = 18;
export const GRID_WIDTH = 32;
export const GRID_HEIGHT = 18;

export class SnakeEnv {
  snake: Cell[] = [];
  dir: number = 0; // 0=up, 1=down, 2=left, 3=right
  food: Cell = { x: 0, y: 0 };
  obstacles: Obstacle[] = [];
  done: boolean = false;
  reward: number = 0;
  steps: number = 0;

  constructor(obstacles: Obstacle[] = []) {
    this.obstacles = obstacles;
    this.reset();
  }

  reset() {
    this.snake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    this.dir = 2; // left
    this.food = this.getRandomCell();
    this.done = false;
    this.reward = 0;
    this.steps = 0;
    return this.getState();
  }

  getRandomCell(): Cell {
    let cell: Cell;
    do {
      cell = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };
    } while (
      this.snake.some(seg => seg.x === cell.x && seg.y === cell.y) ||
      this.collidesWithObstacle(cell)
    );
    return cell;
  }

  collidesWithObstacle(cell: Cell): boolean {
    return this.obstacles.some(obs =>
      cell.x * CELL_SIZE + CELL_SIZE / 2 > obs.x &&
      cell.x * CELL_SIZE + CELL_SIZE / 2 < obs.x + obs.width &&
      cell.y * CELL_SIZE + CELL_SIZE / 2 > obs.y &&
      cell.y * CELL_SIZE + CELL_SIZE / 2 < obs.y + obs.height
    );
  }

  step(action: number) {
    if (this.done) return { state: this.getState(), reward: 0, done: true };
    // Only allow valid actions (no reverse)
    if (
      (this.dir === 0 && action === 1) ||
      (this.dir === 1 && action === 0) ||
      (this.dir === 2 && action === 3) ||
      (this.dir === 3 && action === 2)
    ) {
      action = this.dir;
    }
    this.dir = action;
    const head = this.snake[0];
    let newHead: Cell = { x: head.x, y: head.y };
    if (action === 0) newHead.y -= 1; // up
    if (action === 1) newHead.y += 1; // down
    if (action === 2) newHead.x -= 1; // left
    if (action === 3) newHead.x += 1; // right
    // Wrap around
    newHead.x = (newHead.x + GRID_WIDTH) % GRID_WIDTH;
    newHead.y = (newHead.y + GRID_HEIGHT) % GRID_HEIGHT;
    // Check collision
    let reward = -0.01;
    if (
      this.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y) ||
      this.collidesWithObstacle(newHead)
    ) {
      this.done = true;
      reward = -1;
      this.reward = reward;
      return { state: this.getState(), reward, done: true };
    }
    this.snake.unshift(newHead);
    // Eat food
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      reward = 1;
      this.food = this.getRandomCell();
    } else {
      this.snake.pop();
    }
    this.steps++;
    this.reward = reward;
    return { state: this.getState(), reward, done: false };
  }

  getState(): number[] {
    // State: [head_x, head_y, food_x, food_y, dir, ...snake_body_flat, ...obstacle_flat]
    const head = this.snake[0];
    const state = [
      head.x / GRID_WIDTH,
      head.y / GRID_HEIGHT,
      this.food.x / GRID_WIDTH,
      this.food.y / GRID_HEIGHT,
      this.dir / 3,
      ...this.snake.slice(1, 6).flatMap(seg => [seg.x / GRID_WIDTH, seg.y / GRID_HEIGHT]),
    ];
    // Pad snake body
    while (state.length < 15) state.push(0);
    // Add up to 4 obstacles (x, y, w, h)
    for (let i = 0; i < 4; ++i) {
      const obs = this.obstacles[i];
      if (obs) {
        state.push(obs.x / (CELL_SIZE * GRID_WIDTH));
        state.push(obs.y / (CELL_SIZE * GRID_HEIGHT));
        state.push(obs.width / (CELL_SIZE * GRID_WIDTH));
        state.push(obs.height / (CELL_SIZE * GRID_HEIGHT));
      } else {
        state.push(0, 0, 0, 0);
      }
    }
    return state;
  }

  isDone() {
    return this.done;
  }
} 