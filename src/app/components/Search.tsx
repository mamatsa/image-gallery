"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import useSearchHistory from "@/hooks/useSearchHistory";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { saveInHistory } = useSearchHistory();

  // Add query in search params
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      saveInHistory(term); // Saves term in localstorage for history page
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="mx-2 mb-3 mt-4 flex flex-wrap-reverse items-center justify-between">
      <h1 className="mx-auto text-lg capitalize tracking-wide sm:mx-0">
        {searchParams.get("query")
          ? "კატეგორია: " + searchParams.get("query")?.toString()
          : "პოპულარული ფოტოები"}
      </h1>
      <form
        className="relative mb-3 w-full sm:mb-0 sm:w-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="ძიება..."
          className="w-full rounded-md border py-1 pl-10 pr-1 outline-gray-400 sm:w-auto"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </form>
    </div>
  );
};
export default Search;
