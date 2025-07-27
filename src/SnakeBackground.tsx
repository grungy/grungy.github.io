import React, { useRef, useEffect } from 'react';
import { SnakeEnv, CELL_SIZE, GRID_WIDTH, GRID_HEIGHT, Obstacle } from './SnakeEnv';
import { SnakeDQNAgent } from './SnakeDQNAgent';

const SNAKE_COLOR = '#4242fa';
const FOOD_COLOR = '#00b478';
const BG_COLOR = 'rgba(255,255,255,0)';
const TICK_MS = 30;

interface SnakeBackgroundProps {
  obstacles?: Obstacle[];
}

const SnakeBackground: React.FC<SnakeBackgroundProps> = ({ obstacles = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const envRef = useRef<SnakeEnv | null>(null);
  const agentRef = useRef<SnakeDQNAgent | null>(null);
  const stateRef = useRef<any>({});
  const episodeRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);

  useEffect(() => {
    envRef.current = new SnakeEnv(obstacles);
    agentRef.current = new SnakeDQNAgent(envRef.current.getState().length, 4);
    stateRef.current = {
      state: envRef.current.getState(),
      done: false,
    };
    episodeRef.current = 0;
    scoreRef.current = 0;
    let lastTime = 0;
    let prevState = envRef.current.getState();
    let prevAction = 0;
    let reward = 0;
    let done = false;

    let running = true;
    async function loop(time: number) {
      if (!running) return;
      if (!canvasRef.current || !envRef.current || !agentRef.current) return;
      if (time - lastTime > TICK_MS) {
        lastTime = time;
        // RL step
        const agent = agentRef.current;
        const env = envRef.current;
        let state = env.getState();
        let action = agent.act(state);
        const { state: nextState, reward, done } = env.step(action);
        agent.remember(state, action, reward, nextState, done);
        if (done) {
          episodeRef.current++;
          scoreRef.current = env.snake.length;
          env.reset();
        }
        await agent.replay();
        draw(env, agent);
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    return () => {
      running = false;
    };
    // eslint-disable-next-line
  }, [JSON.stringify(obstacles)]);

  function draw(env: SnakeEnv, agent: SnakeDQNAgent) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Background
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw obstacles
    // Draw food
    ctx.fillStyle = FOOD_COLOR;
    ctx.beginPath();
    ctx.arc(
      env.food.x * CELL_SIZE + CELL_SIZE / 2,
      env.food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE * 0.38,
      0,
      2 * Math.PI
    );
    ctx.fill();
    // Draw snake
    ctx.fillStyle = SNAKE_COLOR;
    for (let i = 0; i < env.snake.length; ++i) {
      ctx.beginPath();
      ctx.arc(
        env.snake[i].x * CELL_SIZE + CELL_SIZE / 2,
        env.snake[i].y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE * 0.42,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
    // Draw episode/score
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#222';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`Episode: ${episodeRef.current}`, 12, 24);
    ctx.fillText(`Score: ${scoreRef.current}`, 12, 48);
    ctx.fillText(`Epsilon: ${agent.epsilon.toFixed(2)}`, 12, 72);
    ctx.restore();
  }

  return (
    <canvas
      ref={canvasRef}
      width={CELL_SIZE * GRID_WIDTH}
      height={CELL_SIZE * GRID_HEIGHT}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        opacity: 1,
        filter: 'none',
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
      }}
      aria-hidden="true"
    />
  );
};

export default SnakeBackground; 