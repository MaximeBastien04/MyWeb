import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Nav from './Components/Nav.jsx'
import Footer from './Components/Footer.jsx'
import Home from './Home.jsx'
import Works from './Works.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App;