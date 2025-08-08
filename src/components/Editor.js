import React from 'react';

const Editor = ({ content, onChange }) => {
  return (
    <div className="editor">
      <textarea
        className="form-control"
        rows="20"
        value={content}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Editor;
