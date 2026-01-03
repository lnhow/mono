import type { CSSProperties } from 'react'

interface CardProps {
  title: string
  description: string
  style?: CSSProperties
  children?: React.ReactNode
}

const Card = ({ title, description, style, children }: CardProps) => {
  return (
    <div
      style={{
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        padding: '1rem',
        ...(style ?? {}),
      }}
    >
      <h2
        style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: '0.875rem',
        }}
      >
        {description}
      </p>
      {children}
      <p
        style={{
          fontSize: '0.875rem',
        }}
      >
        This card component is from MFE React 1.
      </p>
    </div>
  )
}

export default Card
