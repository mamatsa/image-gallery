"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import type { Photo } from "@/models/Images";
import type { Statistics } from "@/models/Statistics";
import ImageModal from "./ImageModal";

type Props = {
  images?: Photo[];
  openImage?: Photo;
  statistics?: Statistics;
};

const Gallery = ({ images, openImage, statistics }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleModalOpen = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.append("openId", id);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleModalClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("openId");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="my-3 grid grid-cols-gallery gap-2 px-2">
      {openImage && (
        <ImageModal
          openImage={openImage}
          statistics={statistics}
          onModalClose={handleModalClose}
        />
      )}

      {images?.map((image) => (
        <div
          className="relative h-64 overflow-hidden rounded-xl"
          style={{ backgroundColor: image.color }}
          key={image.id}
        >
          <Image
            src={image.urls.regular}
            alt={image.alt_description}
            fill={true}
            sizes="(min-width: 1380px) 310px, (min-width: 1040px) calc(18.75vw + 55px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
            className="cursor-pointer object-cover hover:opacity-75"
            onClick={(item) => handleModalOpen(image.id)}
          />
        </div>
      ))}
    </section>
  );
};
export default Gallery;
