import { BrandsCarousel } from "@/components/page-components/fooding/sections/brands/brands-carousel";
import { CuisinesCarousel } from "@/components/page-components/fooding/sections/cuisines/cuisines-carousel";
import { PopularRestaurantsSection } from "@/components/page-components/fooding/sections/popular-restaurants/popular-restaurants";

export default function Home() {
  return (
    <main className="">
      <section className="py-14 bg-white">
        <CuisinesCarousel />
      </section>

      <section className="shadow py-10">
        <BrandsCarousel
          subtitle="Browse out top brands here to discover different food cuision."
          title="Featured Brands"
        />
      </section>

      <section className="bg-gray-100 py-24">
        <PopularRestaurantsSection />
      </section>

      <section className="shadow py-24">
        <BrandsCarousel
          subtitle="We have restaurants that serve 100% vegetarian food."
          title="Pure Vegetarian Restaurants"
          showOnlyVeg={true}
        />
      </section>
    </main>
  );
}
