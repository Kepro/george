import { FC, FormEvent, useEffect, useRef, useState } from "react";
import Input from "./common/Input";
import { useHashRouter } from "../hooks/useHashRouter";
import { useDebounceFn } from "../hooks/useDebounceFn";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

const SearchBar: FC = () => {
  const { hash, setHash } = useHashRouter();
  const [value, setValue] = useState(hash);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // ignore external changes while we are inside input
    if (document.activeElement === inputRef.current) return;

    setValue(hash);
  }, [hash, value]);

  const onHashChange = useDebounceFn(setHash, 500);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setValue(val);
    onHashChange(val);
  };

  return (
    <div className="sticky top-0 bg-george-light shadow-md">
      <div className="container mx-auto p-4">
        <form
          action="#"
          aria-label="currencies search"
          onSubmit={(e) => e.preventDefault()}
          role="search"
          className="relative rounded-md shadow-sm"
        >
          <Input
            type="search"
            aria-label="search"
            spellCheck={false}
            ref={inputRef}
            value={value}
            onChange={handleChange}
          />
          <div className="absolute text-2xl inset-y-0 right-0 flex items-center pr-2">
            <SearchIcon />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
