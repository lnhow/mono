// Credits go to jsturgis: https://gist.github.com/jsturgis/3b19447b304616f18657
export const SAMPLE = {
  videos: [
    {
      description:
        "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      ],
      track: [
        {
          label: 'English',
          kind: 'subtitles',
          srcLang: 'en',
          src: '/static/default/player/big-buck-bunny.vtt',
        },
        
      ],
      thumb: 'images/BigBuckBunny.jpg',
      title: 'Big Buck Bunny',
    },
    {
      description: 'The first Blender Open Movie from 2006',
      sources: [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      ],
      subtitle: 'By Blender Foundation',
      thumb: 'images/ElephantsDream.jpg',
      title: 'Elephant Dream',
    },
  ],
  thumbPrefix:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/',
} as const
