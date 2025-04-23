import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CompanyLogo from './components/CompanyLogo'
import PurposeSection from './components/PurposeSection'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  
  const handleChatRedirect = () => {
    navigate('/ai-agent');
  }
  
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Hero onChatRedirect={handleChatRedirect} />
        <CompanyLogo />
        <PurposeSection />
        <FeaturesSection onChatRedirect={handleChatRedirect} />
        <TestimonialsSection />
        <Footer />
      </div>
    </main>
  )
}

export default Home