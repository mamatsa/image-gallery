import { useSearchParams, usePathname, useRouter } from "next/navigation";

const useModal = () => {
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

  return { openModal: handleModalOpen, closeModal: handleModalClose };
};
export default useModal;
