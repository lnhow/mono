const options = {
  gravity: 0.1,
  text: {
    value: ['happy', 'birthday'],
    fontSize: 30,
    fontFamily: 'Arial',
    letterSpacing: 2,
    lineHeight: 50,
    color: '#222',
    waitTime: 720,
  },
  canvas: {
    blank: 'white',
    background: '#eee',
  },
  balloon: {

  },
  firework: {
    prevPoints: 10,
    spawnTime: 200,
    lineWidth: {
      base: 5,
      added: 8,
    },
    reachTime: {
      base: 60,
      added: 30,
    },
    circle: {
      size: {
        base: 20,
        added: 10,
      },
      time: {
        base: 30,
        added: 30,
      },
      fadeTime: {
        base: 10,
        added: 5,
      },
    },
    shard: {
      prevPoints: 3,
      count: {
        base: 5,
        added: 5,
      },
      velocity: {
        base: 4,
        added: 2,
      },
      size: {
        base: 3,
        added: 3,
      },
    },
  },
}

export const Tau = Math.PI * 2
export default options
