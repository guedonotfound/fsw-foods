import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex gap-2">
      <Input placeholder="Faça sua busca..."></Input>
      <Button type="submit" size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
