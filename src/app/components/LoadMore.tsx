"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Photo } from "@/models/Images";
import { fetchSearchImages } from "@/lib";
import Gallery from "./Gallery";

let page = 2;

function LoadMore({ query }: { query: string }) {
  const [images, setImages] = useState<Photo[]>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>(3);

  const observerTarget = useRef(null);

  // Remove previous images and reset page count on query change
  useEffect(() => {
    setImages([]);
    page = 2;
  }, [query]);

  // Infinite scroll with Intersection Observer API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchSearchImages(query, page);
      if (res) setImages([...images, ...res?.results]);
      setTotalPages(res?.total_pages);
      page++;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(); // Fetch next page when spinner becomes visible
        }
      },
      { threshold: 1 },
    );

    const currentRef = observerTarget.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observerTarget, query, images, totalPages]);

  return (
    <>
      <Gallery images={images} />

      {/* Spinner; Display when there are more photos to show. */}
      {totalPages && totalPages >= page && (
        <div
          ref={observerTarget}
          className="my-8 flex w-full items-center justify-center"
        >
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      )}
    </>
  );
}

export default LoadMore;
