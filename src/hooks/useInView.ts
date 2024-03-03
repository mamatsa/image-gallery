import { useEffect, useRef, useState } from "react";

const useInView = () => {
  const [inView, setInView] = useState(false);
  const observerTargetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setInView(entries[0].isIntersecting);
      },
      { threshold: 1 },
    );

    const currentRef = observerTargetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [observerTargetRef]);

  return { observerTargetRef, inView };
};

export default useInView;
