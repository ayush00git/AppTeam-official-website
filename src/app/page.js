import OurDomains from "@/components/Domains"
import FAQ from "@/components/FAQ"
import HeroSection from "@/components/HeroSection"
import WhatWeDo from "@/components/WhatWeDo"
import SmoothScroll from "@/components/SmoothScroll"

function HomePage() {
    return (
        <SmoothScroll>
            <HeroSection />
            <OurDomains />
            <WhatWeDo />
            <FAQ />
        </SmoothScroll>
    )
}
export default HomePage