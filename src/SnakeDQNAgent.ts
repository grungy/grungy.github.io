import * as tf from '@tensorflow/tfjs';

export class SnakeDQNAgent {
  model: tf.LayersModel;
  targetModel: tf.LayersModel;
  memory: any[] = [];
  gamma = 0.99;
  epsilon = 1.0;
  epsilonMin = 0.05;
  epsilonDecay = 0.995;
  batchSize = 64;
  learnStep = 0;
  stateSize: number;
  actionSize: number;
  training = false;

  constructor(stateSize: number, actionSize: number) {
    this.stateSize = stateSize;
    this.actionSize = actionSize;
    this.model = this.createModel();
    this.targetModel = this.createModel();
    this.updateTargetModel();
  }

  createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [this.stateSize], units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: this.actionSize, activation: 'linear' }));
    model.compile({ optimizer: tf.train.adam(0.001), loss: 'meanSquaredError' });
    return model;
  }

  updateTargetModel() {
    this.targetModel.setWeights(this.model.getWeights());
  }

  act(state: number[]) {
    if (Math.random() < this.epsilon) {
      return Math.floor(Math.random() * this.actionSize);
    }
    return tf.tidy(() => {
      const s = tf.tensor2d([state]);
      const q = this.model.predict(s) as tf.Tensor;
      return q.argMax(-1).dataSync()[0];
    });
  }

  remember(state: number[], action: number, reward: number, nextState: number[], done: boolean) {
    this.memory.push({ state, action, reward, nextState, done });
    if (this.memory.length > 10000) this.memory.shift();
  }

  async replay() {
    if (this.training) return;
    if (this.memory.length < this.batchSize) return;
    this.training = true;
    const minibatch = [];
    for (let i = 0; i < this.batchSize; i++) {
      minibatch.push(this.memory[Math.floor(Math.random() * this.memory.length)]);
    }
    const states = minibatch.map(e => e.state);
    const actions = minibatch.map(e => e.action);
    const rewards = minibatch.map(e => e.reward);
    const nextStates = minibatch.map(e => e.nextState);
    const dones = minibatch.map(e => e.done);

    const statesTensor = tf.tensor2d(states);
    const nextStatesTensor = tf.tensor2d(nextStates);
    const qNext = this.targetModel.predict(nextStatesTensor) as tf.Tensor;
    const qNextMax = qNext.max(-1).arraySync() as number[];
    const targets = this.model.predict(statesTensor) as tf.Tensor;
    const targetsArray = targets.arraySync() as number[][];
    for (let i = 0; i < this.batchSize; i++) {
      targetsArray[i][actions[i]] = rewards[i] + (dones[i] ? 0 : this.gamma * qNextMax[i]);
    }
    const y = tf.tensor2d(targetsArray);
    await this.model.fit(statesTensor, y, { epochs: 1, verbose: 0 });
    tf.dispose([statesTensor, nextStatesTensor, qNext, targets, y]);
    this.epsilon = Math.max(this.epsilon * this.epsilonDecay, this.epsilonMin);
    this.learnStep++;
    if (this.learnStep % 20 === 0) this.updateTargetModel();
    this.training = false;
  }
} 