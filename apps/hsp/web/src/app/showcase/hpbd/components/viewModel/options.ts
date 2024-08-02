const options = {
  gravity: 0.1,
  text: {
    value: ['happy', 'birthday'],
    fontSize: 30,
    fontFamily: 'Arial',
    letterSpacing: 2,
    lineHeight: 50,
    color: '#222',
    waitTime: 360,
  },
  canvas: {
    blank: 'white',
    background: '#eee',
  },
  firework: {
    points: 10,
    spawnTime: 200,
    lineWidth: {
      base: 5,
      added: 8,
    },
    reachTime: {
      base: 45,
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
      points: 3,
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
  balloon: {
    spawnTime: 20,
    inflateTime: {
      base: 10,
      added: 10,
    },
    size: {
      base: 20,
      added: 20,
    },
    velocity: {
      base: 0.4,
      added: 0.4,
    },
    radian: {
      base: -(Math.PI / 2 - 0.5),
      added: -1,
    }
  },
}

export const Tau = Math.PI * 2
export default options
