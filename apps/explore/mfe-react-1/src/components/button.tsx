import './button.css'

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="react-button" {...props}>
      {children || 'Button from MFE React 1'}
    </button>
  )
}

export default Button
