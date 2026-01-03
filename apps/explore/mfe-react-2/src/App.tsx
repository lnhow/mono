import './App.css'
import Card from 'mfe1/card'
import Button from 'mfe1/button'

const App = () => {
  return (
    <div className="content">
      <h1>MFE React 2</h1>
      <Card
        title="Card Title from MFE React 2"
        description="This is a description of the card from MFE React 2."
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
