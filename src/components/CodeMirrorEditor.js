// src/components/CodeMirrorEditor.js
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
// UPDATED: No longer need 'parser' or 'styleTags' here.


// Your theme remains the same, targeting the standard Lezer tags.



const CodeMirrorEditor = ({ content, onChange }) => {
  return (
    <CodeMirror
      value={content}
      height="100%"
      style={{ height: '100%', width: '60ch' }}
      // UPDATED: The extensions array is much cleaner now.
      extensions={[
        EditorView.lineWrapping,
      ]}
      onChange={onChange}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
        highlightActiveLine: false,
      }}
    />
  );
};

export default CodeMirrorEditor;