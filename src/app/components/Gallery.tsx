import type { Photo } from "@/models/Images";
import type { Statistics } from "@/models/Statistics";
import ImageContainer from "./ImageContainer";

type Props = {
  images?: Photo[];
  openImage?: Photo;
  statistics?: Statistics;
};

const Gallery = ({ images, statistics }: Props) => {
  return (
    <section className="my-3 grid grid-cols-gallery gap-2 px-2">
      {images?.map((image, i) => (
        <div
          className="relative h-64 overflow-hidden rounded-xl"
          style={{ backgroundColor: image.color }}
          key={image.id + i}
        >
          <ImageContainer image={image} />
        </div>
      ))}
    </section>
  );
};
export default Gallery;
