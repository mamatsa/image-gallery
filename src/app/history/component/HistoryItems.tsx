"use client";

import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useSearchHistory from "@/hooks/useSearchHistory";

const HistoryItems = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { history, deleteFromHistory } = useSearchHistory();

  // Update search params on history item toggle
  const handleTopicToggle = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term !== searchParams.get("query")) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Delete item from history and search params
  const handleTopicDelete = (term: string) => {
    deleteFromHistory(term);
    if (term === searchParams.get("query")) handleTopicToggle(term);
  };

  return (
    <section className="mx-2 mt-4">
      <ul className="flex flex-wrap items-center gap-3">
        <h1 className="mr-1 whitespace-nowrap text-lg">ძებნის ისტორია:</h1>
        {history.map((term) => (
          <li
            key={term}
            className={`group relative cursor-pointer rounded-md border px-4  py-1 hover:bg-slate-200 ${searchParams.get("query") === term && "border-slate-600 bg-slate-200"}`}
            onClick={() => handleTopicToggle(term)}
          >
            <span>{term}</span>
            <Image
              src="./delete.svg"
              alt="delete"
              width={10}
              height={10}
              className="absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 object-contain hover:scale-125 sm:hidden sm:group-hover:block"
              onClick={(e) => {
                e.stopPropagation();
                handleTopicDelete(term);
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
export default HistoryItems;
