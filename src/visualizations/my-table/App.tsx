import { mockData, mockQueryResponse, mockConfig } from './mockData'
import { MyTable } from './components/MyTable'

function MyTableApp() {

    return (
        <div style={{ padding: '2rem' }}>
            <MyTable
                data={mockData}
                queryResponse={mockQueryResponse}
                config={mockConfig}
            />
        </div>
    )
}

export default MyTableApp