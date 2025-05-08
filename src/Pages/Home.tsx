// src/pages/Home.tsx
import { motion } from "framer-motion";
import MainSlider from "../Components/MainSlider";
import Categories from "./Categories";
import RecentProducts from "../Components/RecentProducts";
import { useGetAllCategoriesQuery } from "../features/auth/authApi";
import { Skeleton } from "../Components/ui/skeleton";
// import BrandsList from "./BrandsList";

const sectionVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

export default function Home() {
  const { data, isLoading, isError } = useGetAllCategoriesQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-gray-100 p-6">
        <Skeleton className="h-72 w-full max-w-4xl rounded-2xl" />
        <Skeleton className="h-12 w-full max-w-2xl rounded-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {[...Array(4)].map((_, idx) => (
            <Skeleton key={idx} className="h-40 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500">Failed to load categories.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 overflow-x-hidden">
      <motion.section
        initial="hiddenRight"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white shadow-lg"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <MainSlider />
        </div>
      </motion.section>

      <motion.section
        initial="hiddenRight"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            Shop by Categories
          </h2>
          {data?.results === 0 ? (
            <p className="text-center text-gray-500">No categories available.</p>
          ) : (
            <Categories />
          )}
        </div>
      </motion.section>

      <motion.section
        initial="hiddenLeft"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            New Arrivals
          </h2>
          <RecentProducts />
        </div>
      </motion.section>

      {/*Problem from api wait too fix */} 
      {/* <motion.section
  initial="hiddenRight"
  whileInView="visible"
  viewport={{ once: true }}
  variants={sectionVariants}
  transition={{ duration: 0.8 }}
  className="py-16 bg-gray-50"
>
  <div className="container mx-auto px-6 lg:px-8">
    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
      Explore Top Brands
    </h2>
    <BrandsList />
  </div>
</motion.section> */}

    </div>
  );
}
