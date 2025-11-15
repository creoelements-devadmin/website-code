import React, { useEffect, useRef } from 'react';
import './Cursor.css';
import $ from 'jquery';

const Cursor = () => {
  // Using useRef to persist cursor position across re-renders
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const circles = document.querySelectorAll(".circle");

    circles.forEach((circle) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = "white";
    });

    const updateMousePosition = (e) => {
      // Update the ref with new mouse coordinates
      coords.current = { x: e.clientX, y: e.clientY };

      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      const isClickable = isElementClickable(hoveredElement);

      const scaleFactor = isClickable ? 2 : 1;
      if (isClickable) {
        $(".circle:nth-child(-n+5)").css("background", "#000000");
        hoveredElement.style.cursor = "none";
        $(".circle:nth-child(n+5)").css("background", "#3eb8a2");
        $(".cursor").css("opacity", "0.4");
      } else {
        $(".circle:nth-child(-n+5)").css("background", "#3eb8a2");
        $(".circle:nth-child(n+5)").css("background", "#ffffff");
        $(".cursor").css("opacity", "1");
      }

      const isDowm = isElementDown(hoveredElement);
      if (isDowm) {
        $(".circle:first-child").css("box-shadow", "0px 0px 15px 12px #24242484");
      } else {
        $(".circle:first-child").css("box-shadow", "0px 0px 10px 10px #24242424");
      }

      circles.forEach((circle) => {
        circle.style.transform = `scale(${scaleFactor})`;
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    function animateCircles() {
      let x = coords.current.x;
      let y = coords.current.y;

      circles.forEach((circle, index) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        circle.style.scale = (circles.length - index) / circles.length;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x) * 0.2;
        y += (nextCircle.y) * 0.2;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []); // Empty dependency array ensures this effect runs only on mount

  return (
    <div className="cursor">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="circle"></div>
      ))}
    </div>
  );
};

function isElementClickable(element) {
  return (
    element &&
    (element.tagName === "button" || element.getAttribute("onclick") || element.classList.contains('clickable'))
  );
}

function isElementDown(element) {
  return (
    element &&
    (
      element.classList.contains("partner") ||
      element.classList.contains("downer") ||
      element.classList.contains("partner-name") ||
      element.classList.contains("partner-description") ||
      element.classList.contains("partner-logo") ||
      (document.querySelector(".partner-logo img") === element)
    )
  );
}

export default Cursor;
