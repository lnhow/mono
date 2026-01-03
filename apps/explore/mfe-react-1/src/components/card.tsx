import { useState, type CSSProperties } from 'react'
import Button from './button'

export interface CardProps {
  title: string
  description: string
  style?: CSSProperties
  children?: React.ReactNode
}

const Card = ({ title, description, style, children }: CardProps) => {
  const [state, setState] = useState(0)
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
      <Button onClick={() => setState((s) => s + 1)}>
        State from React: {state}
      </Button>
    </div>
  )
}

export default Card
