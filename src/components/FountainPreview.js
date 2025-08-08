import React, { useState, useEffect } from 'react';
import { Fountain } from 'fountain-js';

const FountainPreview = ({ content }) => {
  const [formattedHtml, setFormattedHtml] = useState('');

  useEffect(() => {
    console.log('FountainPreview: content prop changed', content);
    const fountain = new Fountain();
    const parsed = fountain.parse(content, true);
    console.log('FountainPreview: parsed tokens', parsed.tokens);
    let html = '';

    parsed.tokens.forEach(token => {
      console.log('FountainPreview: current token', token); // Added for debugging
      switch (token.type) {
        case 'scene_heading':
          html += `<div class="scene-heading">${token.text}</div>`;
          break;
        case 'character':
          html += `<div class="character">${token.text}</div>`;
          break;
        case 'dialogue':
          html += `<div class="dialogue">${token.text}</div>`;
          break;
        case 'parenthetical':
          html += `<div class="parenthetical">${token.text}</div>`;
          break;
        case 'transition':
          html += `<div class="transition">${token.text}</div>`;
          break;
        case 'action':
          html += `<div class="action">${token.text}</div>`;
          break;
        default:
          html += `<div>${token.text || ''}</div>`; // Ensure text is not undefined
      }
    });
    console.log('FountainPreview: generated HTML', html);
    setFormattedHtml(html);
  }, [content]);

  return (
    <div className="fountain-preview-pane">
      <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
    </div>
  );
};

export default FountainPreview;
