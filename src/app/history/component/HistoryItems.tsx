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
    <section className="mx-2 mt-4 flex items-center gap-4 ">
      <h1 className="text-lg">ძებნის ისტორია:</h1>
      <ul className="flex items-center gap-3">
        {history.map((term) => (
          <li
            key={term}
            className={`group relative cursor-pointer rounded-md border px-6  py-1 hover:bg-slate-200 ${searchParams.get("query") === term && "border-slate-600 bg-slate-200"}`}
            onClick={() => handleTopicToggle(term)}
          >
            <span>{term}</span>
            <Image
              src="./delete.svg"
              alt="delete"
              width={12}
              height={12}
              className="absolute right-0 top-0 z-10 hidden -translate-y-1/2 translate-x-1/2 object-contain hover:scale-125 group-hover:block"
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
