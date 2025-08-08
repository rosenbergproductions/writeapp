import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const WysiwygEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    onUpdate: ({ editor }) => {
      // Temporarily removed onChange(editor.getText()); for debugging
    },
  });

  useEffect(() => {
    // Only update editor content if it's different from the prop to avoid infinite loops
    if (editor && content !== editor.getText()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null; // Or a loading indicator
  }

  return (
    <div className="wysiwyg-editor">
      <EditorContent editor={editor} />
    </div>
  );
};

export default WysiwygEditor;