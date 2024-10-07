"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <div className="relative w-full">
        <Input
          placeholder="Buscar restaurantes..."
          className="w-full border-none bg-gray-100 pr-12 focus:outline-none focus:ring focus:ring-gray-100"
          onChange={handleChange}
          value={search}
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute inset-y-0 right-0 flex items-center rounded-full px-3 py-2 hover:bg-gray-100"
        >
          <SearchIcon size={20} />
        </Button>
      </div>
    </form>
  );
};

export default Search;
