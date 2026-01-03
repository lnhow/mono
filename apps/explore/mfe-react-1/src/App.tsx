import './App.css'
import Button from './components/button'
import Card from './components/card'

const App = () => {
  return (
    <div className="content">
      <h1>MFE React 1</h1>
      <Card
        title="Card Title from MFE React 1"
        description="This is a description of the card from MFE React 1."
        style={{
          margin: '1rem',
          border: '1px solid #666',
        }}
      >
        <Button />
      </Card>
    </div>
  )
}

export default App
