import { useState } from 'react'
import MyTableApp from './visualizations/my-table/App'

// Add more ids as you create new visualizations
type VizId = 'table'

const visualizations: { id: VizId; name: string; description: string }[] = [
  { id: 'table', name: 'My Table', description: 'Categorical bar with color overriding' },
  // Add new viz here
]

function App() {
  const [selected, setSelected] = useState<VizId | null>(null)

  if (selected === 'table') {
    return (
      <div>
        <button onClick={() => setSelected(null)}>← Back</button>
        <MyTableApp />
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ marginBottom: '10px' }}>Looker Visualizations Library</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Select a visualization to preview</p>
      <div style={{ display: 'grid', gap: '20px' }}>
        {visualizations.map(viz => (
          <div
            key={viz.id}
            onClick={() => setSelected(viz.id)}
            style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: '#000' }}>{viz.name}</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{viz.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App