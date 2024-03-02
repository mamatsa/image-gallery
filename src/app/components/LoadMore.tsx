"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Photo } from "@/models/Images";
import { fetchSearchImages } from "@/lib";

function LoadMore({ query }: { query: string }) {
  const [images, setImages] = useState<Photo[]>([]);
  const [page, setPage] = useState(2);

  const observerTarget = useRef(null);

  // Remove previous query images on query change
  useEffect(() => {
    setImages([]);
  }, [query]);

  // Infinite scroll with Intersection Observer API
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchSearchImages(query, page);
      if (result) setImages([...images, ...result]);
      setPage(page + 1);
    };

    let observerRefValue = null; // variable to hold ref value

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(); // Fetch next page when spinner becomes visible
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current; // save ref value
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [observerTarget, page, query, images]);

  return (
    <>
      {/* Gallery */}
      <section className="my-3 grid grid-cols-gallery gap-2 px-2">
        {images?.map((image) => (
          <div
            className="relative h-64 overflow-hidden rounded-xl bg-gray-400"
            style={{ backgroundColor: image.color }}
            key={image.id}
          >
            <Image
              src={image.urls.regular}
              alt={image.alt_description}
              fill={true}
              sizes="(min-width: 1380px) 310px, (min-width: 1040px) calc(18.75vw + 55px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
              className="object-cover"
            />
          </div>
        ))}
      </section>

      {/* Spinner */}
      <div
        ref={observerTarget}
        className="flex w-full items-center justify-center"
      >
        <Image
          src="./spinner.svg"
          alt="spinner"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    </>
  );
}

export default LoadMore;
