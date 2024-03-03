"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Statistics } from "@/models/Statistics";
import { Photo } from "@/models/Images";
import { fetchSearchImages } from "@/lib";
import { useInView } from "@/hooks";
import Gallery from "./Gallery";

let page = 2;

type Props = {
  query: string;
  openImageId?: string;
  statistics?: Statistics;
};

function LoadMore({ query, openImageId, statistics }: Props) {
  const [images, setImages] = useState<Photo[]>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>(3);

  const { observerTargetRef, inView } = useInView();

  // Infinite scroll
  useEffect(() => {
    const fetchMoreImages = async () => {
      const res = await fetchSearchImages(query, page);
      if (res) {
        setImages((prevState) => [...prevState, ...res?.results]);
      }
      setTotalPages(res?.total_pages);
      page++;
    };

    // If spinner comes in view fetch more images
    if (inView) {
      fetchMoreImages();
    }
  }, [inView, query]);

  // Find open image with it's id
  let openImage;
  if (openImageId) {
    openImage = images?.find((image) => image.id === openImageId);
  }

  // Remove previous images and reset page count on query change
  useEffect(() => {
    setImages([]);
    page = 2;
  }, [query]);

  return (
    <>
      <Gallery images={images} openImage={openImage} statistics={statistics} />

      {/* Spinner; Display when there are more photos to show. */}
      {totalPages && totalPages >= page && (
        <div
          ref={observerTargetRef}
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
