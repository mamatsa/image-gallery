import Image from "next/image";
import type { Photo } from "@/models/Images";

const Gallery = ({ images }: { images: Photo[] | undefined }) => {
  return (
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
  );
};
export default Gallery;
