import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Benefits from '@/components/sections/Benefits'
import HowItWorks from '@/components/sections/HowItWorks'
import Technologies from '@/components/sections/Technologies'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <Hero />
                <Services />
                <Benefits />
                <HowItWorks />
                <Technologies />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
        </>
    )
}
