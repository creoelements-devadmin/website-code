import React from 'react';
import './WavyText.css'; // External CSS file for styles

const WavyText = ({ children, text, fontSize }) => {
  const dynamicFontSize = fontSize || '6rem';

  const dynamicStyle = {
    fontSize: dynamicFontSize,
  };

  // Determine the text source: from props or children
  const content = text || children;

  // Split based on <br> tags (using JSX)
  const lines = React.Children.toArray(content).filter((child) => {
    return typeof child === 'string' || child.type === 'br';
  }).reduce((acc, child) => {
    if (typeof child === 'string') {
      acc.push(...child.split('<br>'));
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="text-animation">
      <div className="text-wrapper">
        {lines.map((line, index) => (
          <div
            key={index}
            className="wave-container"
            style={{
              height: `calc(${dynamicFontSize} + 10px)`, // Adjust height dynamically for each line
            }}
          >
            <h1 style={dynamicStyle}>{line}</h1>
            <span style={dynamicStyle} className="wave-text">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WavyText;
