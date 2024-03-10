import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Routes/SignIn'
import { Suspense } from 'react'
import SignUp from './Routes/SignUp'
import DashBoard from './Routes/DashBoard'
import Transfer from './Routes/MoneyTransfer'
import { RecoilRoot } from 'recoil'



function App() {

  return (
    <div>
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Suspense fallback="Loading"><SignIn></SignIn></Suspense>}></Route>
          <Route path="/signup" element={<Suspense fallback="Loading"><SignUp></SignUp></Suspense>}></Route>
          <Route path="/dashboard" element={<Suspense fallback="Loading"><DashBoard></DashBoard></Suspense>}></Route>
          <Route path="/transfer" element={<Suspense fallback="Loading"><Transfer></Transfer></Suspense>}></Route>
        </Routes>
      </BrowserRouter>

      </RecoilRoot>
    </div>
  )
}

export default App
