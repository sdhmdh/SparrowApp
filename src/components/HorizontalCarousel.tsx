import { ReactNode, useRef, useState } from "react";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { useDebouncedResize } from "../hooks";
import "../styles/components/horizontalCarousel.scss";

interface HorizontalCarouselProps {
  children: ReactNode;
  itemsGap: number;
  scrollAmount: number;
}

const HorizontalCarousel = ({
  children,
  itemsGap = 5,
  scrollAmount = 220,
}: HorizontalCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    if (containerRef.current) {
      setIsOverflowing(
        containerRef.current.scrollWidth > containerRef.current.clientWidth
      );
    }
  };

  useDebouncedResize(checkOverflow, 200);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="carousel-container">
      {isOverflowing && (
        <LeftCircleFilled className="scroll-btn left" onClick={scrollLeft} />
      )}
      <div
        className="carousel-content"
        ref={containerRef}
        style={{ gap: itemsGap }}
      >
        {children}
      </div>
      {isOverflowing && (
        <RightCircleFilled className="scroll-btn right" onClick={scrollRight} />
      )}
    </div>
  );
};

export { HorizontalCarousel };
