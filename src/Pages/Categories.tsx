import { useGetAllCategoriesQuery } from '../features/auth/authApi';
import { Link } from 'react-router-dom';
import { Skeleton } from '../Components/ui/skeleton';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Categories() {
  const { data: categoriesData, isLoading, isError } = useGetAllCategoriesQuery();
console.log(categoriesData);

  const cats = categoriesData?.data || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-60 w-full rounded-lg" />
        ))}
      </div>
    );
  }
  if (isError) {
    return <p className="text-center text-red-500 py-10">Failed to load categories.</p>;
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {cats.map((category:any) => (
        <motion.div key={category._id} variants={cardVariants}>
          <Link
            to={`/category/${category._id}`}
            className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <div className="relative py-3">
              <img
                loading="lazy"
                src={category.image}
                alt={category.name}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold text-center px-2">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}