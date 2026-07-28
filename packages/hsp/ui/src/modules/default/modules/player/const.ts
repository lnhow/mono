// Credits go to jsturgis: https://gist.github.com/jsturgis/3b19447b304616f18657
export const SAMPLE = {
  videos: [
    {
      description: 'Rotating Earth',
      sources: ['/static/default/player/file_example_MP4_1280_10MG.mp4'],
      track: [
        {
          label: 'English',
          kind: 'subtitles',
          srcLang: 'en',
          src: '/static/default/player/big-buck-bunny.vtt',
        },
      ],
      thumb: '/static/default/player/videoframe_8288.png',
      title: 'Rotating Earth',
    },
  ],
} as const
