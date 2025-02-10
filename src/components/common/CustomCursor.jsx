// src/components/common/CustomCursor.jsx
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Fixed the error by checking if target exists and is an Element
      if (e.target && e.target instanceof Element) {
        const target = e.target;
        const style = window.getComputedStyle(target);
        setIsPointer(
          style.cursor === 'pointer' ||
          target.tagName.toLowerCase() === 'button' ||
          target.tagName.toLowerCase() === 'a' ||
          target.closest('button') ||
          target.closest('a')
        );
      }
    };

    const showCursor = () => setIsVisible(true);
    const hideCursor = () => setIsVisible(false);

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', showCursor);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isPointer ? 'scale-150' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0
        }}
      />
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  );
};

export default CustomCursor;