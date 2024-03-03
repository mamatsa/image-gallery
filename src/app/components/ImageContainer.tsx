"use client";

import type { Photo } from "@/models/Images";
import { Statistics } from "@/models/Statistics";
import Image from "next/image";
import ImageModal from "./ImageModal";
import { useState } from "react";
import { fetchImageStatistics } from "@/lib";

type Props = {
  image: Photo;
};

const ImageContainer = ({ image }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [statistics, setStatistics] = useState<Statistics | undefined>();

  const handleModalOpen = async (id: string) => {
    let imageStats = await fetchImageStatistics(id);
    setStatistics(imageStats);
    setModalIsOpen(true);
  };

  return (
    <>
      <Image
        src={image.urls.regular}
        alt={image.alt_description}
        fill={true}
        sizes="(min-width: 1380px) 310px, (min-width: 1040px) calc(18.75vw + 55px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
        className="cursor-pointer object-cover hover:opacity-75"
        onClick={() => handleModalOpen(image.id)}
      />

      {/* Modal */}
      {modalIsOpen && (
        <ImageModal
          openImage={image}
          statistics={statistics}
          onModalClose={() => setModalIsOpen(false)}
        />
      )}
    </>
  );
};
export default ImageContainer;
