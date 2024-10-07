import { db } from "../../_lib/prisma";
import CategoryItem from "../mobile/category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className="flex items-center justify-center gap-[1.39%]">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
