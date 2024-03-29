import type { Photo } from "@/models/Images";
import type { Statistics } from "@/models/Statistics";
import Image from "next/image";

type Props = {
  openImage: Photo;
  statistics?: Statistics;
  onModalClose: () => void;
};

const ImageModal = ({ openImage, statistics, onModalClose }: Props) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center bg-slate-700 bg-opacity-80 p-1 backdrop-blur-sm"
      onClick={() => onModalClose()}
    >
      <Image
        src="./close.svg"
        alt="close modal"
        width={16}
        height={16}
        className="absolute right-3 top-3 z-30 cursor-pointer hover:scale-110"
        onClick={(e) => onModalClose()}
      />

      <div className="fixed bottom-8 left-8 right-8 top-8 z-30 mx-auto flex max-w-7xl flex-col items-center rounded-md bg-white">
        <div className="h-[calc(100%-200px)] xs:h-[calc(100%-80px)]">
          <Image
            src={openImage?.urls.regular}
            alt={openImage.alt_description}
            width={openImage.width}
            height={openImage.height}
            className="mx-auto mt-2 h-auto max-h-full w-auto max-w-[calc(100%-20px)]"
          />
        </div>

        {statistics && (
          <div className="mb-4 mt-2 flex flex-col gap-5 xs:mb-0 xs:flex-row">
            <div className="text-center">
              <div className="font-bold">გადმოწერები</div>
              <div className="text-sm">
                {statistics?.downloads.total.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold">ნახვები</div>
              <div className="text-sm">
                {statistics?.views.total.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold">მოწონებები</div>
              <div className="text-sm">
                {statistics?.likes.total.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageModal;
