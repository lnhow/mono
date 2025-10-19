import isProductionEnv from '@hsp/ui/utils/nextjs/isProduction'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Palette',
  description: 'HSP Design System color palette and guidelines',
}

export default function Page() {
  if (isProductionEnv) {
    notFound()
  }

  const colors = [
    {
      title: 'Primary',
      colors: [
        'bg-primary-100',
        'bg-primary-200',
        'bg-primary-300',
        'bg-primary-400',
        'bg-primary-500',
      ],
    },
    {
      title: 'Secondary',
      colors: [
        'bg-secondary-100',
        'bg-secondary-200',
        'bg-secondary-300',
        'bg-secondary-400',
        'bg-secondary-500',
      ],
    },
    {
      title: 'Accent',
      colors: [
        'bg-accent-100',
        'bg-accent-200',
        'bg-accent-300',
        'bg-accent-400',
        'bg-accent-500',
      ],
    },
    {
      title: 'Fore',
      colors: [
        'bg-fore-100',
        'bg-fore-200',
        'bg-fore-300',
        'bg-fore-400',
        'bg-fore-500',
      ],
      subtitles: 'Text/Foreground element colors',
    },
    {
      title: 'Base',
      colors: [
        'bg-base-100',
        'bg-base-200',
        'bg-base-300',
        'bg-base-400',
        'bg-base-500',
      ],
      subtitles: 'Background element colors',
    },
    {
      title: 'Warning',
      colors: ['bg-warning-100', 'bg-warning-200', 'bg-warning-300'],
      subtitles: 'Warning colors',
    },
    {
      title: 'Error',
      colors: ['bg-error-100', 'bg-error-200', 'bg-error-300'],
      subtitles: 'Error colors',
    },
  ]

  return (
    <div className="max-w-5xl mx-2 md:mx-auto">
      <div className="lg:flex lg:space-x-6 ">
        <div className="flex flex-4/6 flex-col space-y-4 mt-4">
          <h1 className="text-4xl font-extralight">Palette</h1>
          {colors.map((color) => (
            <ColorRow
              key={color.title}
              title={color.title}
              colors={color.colors}
              subtitle={color.subtitles}
            />
          ))}
        </div>
        <div className="mt-6 flex-2/6 bg-base-500 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-light">General guidelines</h2>
          <p className="text-sm text-fore-200">
            Smaller number is for background elements.
          </p>
          <p className="text-sm text-fore-200">
            Higher number is for foreground elements.
          </p>
          <GuidelineRow
            title="Colors with 100, 200, 300, 400, 500"
            values={{
              100: 'Secondary Background',
              200: 'Background',
              300: 'Background Highlight',
              400: 'Foreground (Text)',
              500: 'Important Foreground (Heading, alert)',
            }}
          />
          <GuidelineRow
            title="Colors with 100, 200, 300"
            values={{
              100: 'Background',
              200: 'Background Highlight, Secondary Foreground',
              300: 'Important Foreground',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function ColorRow({
  title,
  subtitle,
  colors,
}: {
  title: string
  subtitle?: string
  colors: string[]
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-light">{title}</h2>
        <p className="text-sm text-fore-300">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-2">
        {colors.map((color) => (
          <div
            key={color}
            className={`w-10 h-10 border-base-100 ${color} rounded-lg shadow-lg`}
          ></div>
        ))}
      </div>
    </div>
  )
}

function GuidelineRow({
  title,
  values,
}: {
  title: string
  values: Record<string, string>
}) {
  return (
    <div className="mt-4">
      <h3 className="text-md font-normal">{title}</h3>
      <ul className="list-disc pl-4 text-fore-300">
        {Object.entries(values).map(([key, value]) => (
          <li key={key}>
            <span className="text-sm w-4 text-fore-500 font-semibold mr-2">
              {key}
            </span>
            <span className="text-sm">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
