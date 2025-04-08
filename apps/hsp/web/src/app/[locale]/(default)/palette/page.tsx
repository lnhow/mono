export default function Page() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extralight">Palette</h1>
      <div className="flex flex-col space-y-4 mt-4">
        <ColorRow
          title="Primary"
          colors={[
            'bg-primary-100',
            'bg-primary-200',
            'bg-primary-300',
            'bg-primary-400',
            'bg-primary-500',
          ]}
        />
        <ColorRow
          title="Secondary"
          colors={[
            'bg-secondary-100',
            'bg-secondary-200',
            'bg-secondary-300',
            'bg-secondary-400',
            'bg-secondary-500',
          ]}
        />
        <ColorRow
          title="Accent"
          colors={[
            'bg-accent-100',
            'bg-accent-200',
            'bg-accent-300',
            'bg-accent-400',
            'bg-accent-500',
          ]}
        />
        <ColorRow
          title="Text"
          colors={[
            'bg-text-100',
            'bg-text-200',
            'bg-text-300',
            'bg-text-400',
            'bg-text-500',
          ]}
        />
        <ColorRow
          title="Base"
          colors={[
            'bg-base-100',
            'bg-base-200',
            'bg-base-300',
            'bg-base-400',
            'bg-base-500',
          ]}
        />
        <ColorRow
          title="Warning"
          colors={['bg-warning-100', 'bg-warning-200', 'bg-warning-300']}
        />
        <ColorRow
          title="Error"
          colors={['bg-error-100', 'bg-error-200', 'bg-error-300']}
        />
      </div>
    </div>
  )
}

function ColorRow({ title, colors }: { title: string; colors: string[] }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-light">{title}</h2>
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
