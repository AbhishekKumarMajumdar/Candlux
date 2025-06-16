import BestSellers from "@/components/BestSellers";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroCarousel from "@/components/HeroCarousel";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import MoreProducts from "@/components/MoreProducts";
import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import ReelSection from "@/components/ReelSection";


export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <>
      <HeroCarousel />
      <CategorySection/>
      <FeaturedProducts/>
      <Banner/>
      <ProductSection/>
      <WhyChooseUs/>
      <MoreProducts/>
      <BestSellers/>
      <Testimonials/>
      {/* <ReelSection/> */}
      <Contact/>
      {/* More sections like featured products here */}
    </>
  );
}
