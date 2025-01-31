// import { BrandsCarousel } from "@/features/restaurant/brands/brands-carousel";
import { CuisinesCarousel } from "@/features/restaurant/cuisines/cuisines-carousel";
import { PopularRestaurantsSection } from "@/features/restaurant/popular-restaurants";

export default function Home() {
  return (
    <main className="">
      <section className="py-14 bg-white">
        <CuisinesCarousel />
      </section>

      <section className="bg-gray-100 py-24">
        <PopularRestaurantsSection />
      </section>

      {/* <section className="shadow py-24">
        <BrandsCarousel
          subtitle="We have restaurants that serve 100% vegetarian food."
          title="Pure Vegetarian Restaurants"
          showOnlyVeg={true}
        />
      </section> */}
    </main>
  );
}
