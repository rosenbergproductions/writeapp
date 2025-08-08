import React, { useState, useEffect, useRef } from 'react';

const LiveFormatter = ({ content, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText !== content) {
      editorRef.current.innerText = content;
    }
  }, [content]);

  const handleInput = (e) => {
    onChange(e.currentTarget.innerText);
  };

  return (
    <div
      className="editor-area"
      contentEditable
      onInput={handleInput}
      suppressContentEditableWarning
      ref={editorRef}
    >
      {content}
    </div>
  );
};

export default LiveFormatter;