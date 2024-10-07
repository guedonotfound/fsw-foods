import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products/`}
      className="2md: flex w-[152px] items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md 2md:h-[54px]"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
