import React, { useRef, useEffect, useState } from 'react';
import { DQNAgent } from './dqnAgent';

// Environment constants
const WIDTH = 500;
const HEIGHT = 300;
const OBSTACLE_COUNT = 3;
const LANDING_PAD_WIDTH = 80;
const LANDING_PAD_HEIGHT = 10;

// Spaceship state type
interface ShipState {
  x: number;
  y: number;
  angle: number;
  vx: number;
  vy: number;
  alive: boolean;
}

function randomObstacle() {
  let obs;
  let dx, dy;
  do {
    obs = {
      x: Math.random() * (WIDTH - 100) + 50,
      y: Math.random() * (HEIGHT - 100) + 50,
      r: 30 + Math.random() * 30,
    };
    dx = obs.x - WIDTH / 2;
    dy = obs.y - 100;
  } while (Math.sqrt(dx * dx + dy * dy) < 60);
  return obs;
}

const initialShip: ShipState = {
  x: WIDTH / 2,
  y: 100,
  angle: Math.PI / 2,
  vx: 0,
  vy: 0,
  alive: true,
};

const landingPad = {
  x: WIDTH / 2 - LANDING_PAD_WIDTH / 2,
  y: HEIGHT - 60,
  width: LANDING_PAD_WIDTH,
  height: LANDING_PAD_HEIGHT,
};

const ACTIONS = [
  'none', // 0
  'thrust', // 1
  'left', // 2
  'right', // 3
];

const stateSize = 8;
const actionSize = 4;

const SpaceshipRLBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 300 });
  const obstacles = useRef(Array.from({ length: OBSTACLE_COUNT }, randomObstacle));
  const ship = useRef<ShipState>({ ...initialShip });
  const agent = useRef<DQNAgent | null>(null);
  const prevState = useRef<number[]>([]);
  const prevAction = useRef<number>(0);

  function getState(): number[] {
    const s = ship.current;
    // Distance to pad center
    const dx_to_pad = (s.x - (landingPad.x + landingPad.width / 2)) / WIDTH;
    const dy_to_pad = (s.y - landingPad.y) / HEIGHT;
    // Min distance to obstacle
    let minDist = 9999;
    for (const obs of obstacles.current) {
      const dx = s.x - obs.x;
      const dy = s.y - obs.y;
      const d = Math.sqrt(dx * dx + dy * dy) - obs.r;
      if (d < minDist) minDist = d;
    }
    return [
      s.x / WIDTH,
      s.y / HEIGHT,
      s.vx / 10,
      s.vy / 10,
      s.angle / Math.PI,
      dx_to_pad,
      dy_to_pad,
      minDist / WIDTH,
    ];
  }

  function agentStep(state: number[]) {
    if (!agent.current) return 0;
    return agent.current.act(state);
  }

  function checkCollision(): 'landed' | 'crashed' | null {
    for (const obs of obstacles.current) {
      const dx = ship.current.x - obs.x;
      const dy = ship.current.y - obs.y;
      if (Math.sqrt(dx * dx + dy * dy) < obs.r + 10) {
        ship.current.alive = false;
        return 'crashed';
      }
    }
    if (
      ship.current.y > landingPad.y - 10 &&
      ship.current.x > landingPad.x &&
      ship.current.x < landingPad.x + landingPad.width &&
      Math.abs(ship.current.vy) < 1.5
    ) {
      ship.current.alive = false;
      return 'landed';
    }
    if (
      ship.current.x < 0 ||
      ship.current.x > WIDTH ||
      ship.current.y < 0 ||
      ship.current.y > HEIGHT
    ) {
      ship.current.alive = false;
      return 'crashed';
    }
    return null;
  }

  function drawShip(ctx: CanvasRenderingContext2D, s: ShipState) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.angle);
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(-10, 8);
    ctx.lineTo(-10, -8);
    ctx.closePath();
    ctx.fillStyle = s.alive ? '#222' : '#f55';
    ctx.fill();
    ctx.restore();
  }

  function drawObstacles(ctx: CanvasRenderingContext2D) {
    for (const obs of obstacles.current) {
      ctx.beginPath();
      ctx.arc(obs.x, obs.y, obs.r, 0, 2 * Math.PI);
      ctx.fillStyle = '#888';
      ctx.fill();
    }
  }

  function drawLandingPad(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(landingPad.x, landingPad.y, landingPad.width, landingPad.height);
  }

  useEffect(() => {
    // ResizeObserver to track parent size
    const resize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    resize();
    const observer = new (window as any).ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    agent.current = new DQNAgent(stateSize, actionSize);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId: number;
    let reward = 0;
    let done = false;

    function reset() {
      ship.current = { ...initialShip };
      obstacles.current = Array.from({ length: OBSTACLE_COUNT }, randomObstacle);
      prevState.current = getState();
      prevAction.current = agentStep(prevState.current);
    }

    async function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      // Scale drawing to new dimensions
      const scaleX = dimensions.width / WIDTH;
      const scaleY = dimensions.height / HEIGHT;
      ctx.save();
      ctx.scale(scaleX, scaleY);
      drawObstacles(ctx);
      drawLandingPad(ctx);
      drawShip(ctx, ship.current);
      ctx.restore();
      let state = getState();
      if (ship.current.alive) {
        // Agent action
        const action = agentStep(state);
        // Apply action
        if (action === 1) { // thrust
          ship.current.vx += Math.cos(ship.current.angle) * 0.2;
          ship.current.vy += Math.sin(ship.current.angle) * 0.2;
        }
        if (action === 2) { // left
          ship.current.angle -= 0.08;
        }
        if (action === 3) { // right
          ship.current.angle += 0.08;
        }
        ship.current.x += ship.current.vx;
        ship.current.y += ship.current.vy;
        ship.current.vx *= 0.99;
        ship.current.vy *= 0.99;
        // Reward
        reward = -1;
        const result = checkCollision();
        if (result === 'landed') reward = 100;
        if (result === 'crashed') reward = -100;
        done = !!result;
        // Store experience
        if (prevState.current.length > 0 && agent.current) {
          agent.current.remember(prevState.current, prevAction.current, reward, state, done);
        }
        prevState.current = state;
        prevAction.current = action;
        // Train
        if (agent.current) {
          await agent.current.replay();
        }
      } else {
        setTimeout(reset, 1000);
      }
      animationFrameId = requestAnimationFrame(render);
    }
    reset();
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default SpaceshipRLBackground; 