import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
      <main className='container'>
        <Sidebar />
        <section className="content">
          <Outlet/>
        </section>
      </main>
    </>
  )
}

export default App

