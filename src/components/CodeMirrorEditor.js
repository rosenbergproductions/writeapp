// src/components/CodeMirrorEditor.js
import React, { useMemo, useRef, useEffect } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { fountain } from '../fountain-lang';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

const CodeMirrorEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  const extensions = useMemo(() => {
    const fountainHighlightStyle = HighlightStyle.define([
      { tag: t.keyword, fontWeight: "bold", textTransform: "uppercase" },
      { tag: t.strong, class: "cm-character" },
      { tag: t.string, display: "block", marginLeft: "12ch", marginRight: "12ch" },
      { tag: t.emphasis, textAlign: "center", display: "block", marginLeft: "18ch", marginRight: "18ch" },
      { tag: t.heading, textAlign: "right", textTransform: "uppercase", display: "block", marginTop: "1em" },
      { tag: t.content, display: "block", marginTop: "1em" }
    ]);

    const editorChromeTheme = EditorView.theme({
        "&": { height: "100%" }
    });

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    return [
      keymap.of(defaultKeymap),
      EditorView.lineWrapping,
      fountain,
      syntaxHighlighting(fountainHighlightStyle),
      editorChromeTheme,
      updateListener
    ];
  }, [onChange]);

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
        const startState = EditorState.create({
            doc: content || '',
            extensions: extensions,
        });

        const view = new EditorView({
            state: startState,
            parent: editorRef.current,
        });
        viewRef.current = view;
    }

    return () => {
        if (viewRef.current) {
            viewRef.current.destroy();
            viewRef.current = null;
        }
    };
  }, [extensions]);

  useEffect(() => {
    const view = viewRef.current;
    if (view && content !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: content || '' },
      });
    }
  }, [content]);

  return <div ref={editorRef} style={{ height: '100%' }} />;
};

export default CodeMirrorEditor;