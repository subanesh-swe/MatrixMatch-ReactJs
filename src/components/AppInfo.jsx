
import reactLogo from '/assets/react.svg'
import viteLogo from '/assets/vite.svg'

export default function AppInfo() {
    return (
        <div className='container' style={{ width: 'auto', border: 'unset', background: 'unset' }}>
            <h1 style={{ fontSize: '30px' }}>Matrix Match</h1>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h2>Vite + React</h2>
        </div>
    )
}