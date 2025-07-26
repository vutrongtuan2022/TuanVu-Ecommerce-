import React, { useEffect, useRef, useState } from "react";
import styles from "./Spinner3D.module.scss";

const Spinner3D = ({ images }) => {
  const spinnerRef = useRef(null);
  const [angleY, setAngleY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentAngleRef = useRef(0);
  const cellCount = images.length;
  const rotateAngle = 360 / cellCount;

  // Hàm cập nhật xoay khi kéo chuột
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentAngleRef.current = angleY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    const newAngle = currentAngleRef.current + deltaX;
    setAngleY(newAngle);
    if (spinnerRef.current) {
      spinnerRef.current.style.transform = `rotateY(${newAngle}deg)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentAngleRef.current = angleY;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const newAngle = currentAngleRef.current + deltaX;
    setAngleY(newAngle);
    if (spinnerRef.current) {
      spinnerRef.current.style.transform = `rotateY(${newAngle}deg)`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div
      className={styles.scene}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className={styles.carousel} ref={spinnerRef}>
        {images.map((url, i) => (
          <div
            key={i}
            className={styles.cell}
            style={{
              transform: `rotateY(${i * rotateAngle}deg) translateZ(300px)`,
            }}
          >
            <img src={url} alt={`item-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spinner3D;

// import Spinner3D from "@/components/Spinner3D";

//  const [images, setImages] = useState([]);
//     useEffect(() => {
//     // Gọi API hoặc dùng dữ liệu tĩnh
//     const fetchImages = async () => {
//       // Ví dụ: gọi API hoặc fake
//       const fakeApi = [
//         'https://picsum.photos/id/1018/200/200',
//         'https://picsum.photos/id/1015/200/200',
//         'https://picsum.photos/id/1016/200/200',
//         'https://picsum.photos/id/1020/200/200',
//         'https://picsum.photos/id/1021/200/200',
//         'https://picsum.photos/id/1022/200/200',
//         'https://picsum.photos/id/1023/200/200',
//         'https://picsum.photos/id/1024/200/200',
//       ];
//       setImages(fakeApi);
//     };

//     fetchImages();
//   }, []);
//     <div>
//       <h2 style={{ textAlign: 'center' }}>Vòng quay 3D động</h2>
//       {images.length > 0 && <Spinner3D images={images} />}
//     </div>