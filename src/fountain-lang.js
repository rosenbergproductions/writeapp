// src/fountain-lang.js
import { StreamLanguage } from '@codemirror/language';

export const fountain = StreamLanguage.define({
  startState: function() {
    return { inDialogue: false };
  },

  token: function(stream, state) {
    // Blank line
    if (stream.sol() && stream.eol()) {
      state.inDialogue = false;
      return null;
    }

    // Forced Scene Heading (e.g., .A TITLE)
    if (stream.sol() && stream.match(/^\./)) {
      stream.skipToEnd();
      state.inDialogue = false;
      console.log("Matched: Forced Scene Heading");
      return 'keyword';
    }
    
    // Standard Scene Heading (e.g., INT. ROOM - DAY)
    if (stream.sol() && stream.match(/^(?:INT\.?\/EXT\.?|INT\.?|EXT\.?|EST\.?|I\/E\.?)/i)) {
      stream.skipToEnd();
      state.inDialogue = false;
      console.log("Matched: Standard Scene Heading");
      return 'keyword';
    }

    // Transition
    if (stream.match(/.*TO:$/) || (stream.sol() && stream.match(/>.*/))) {
      stream.skipToEnd();
      state.inDialogue = false;
      console.log("Matched: Transition");
      return 'heading';
    }
    
    // Character Name
    if (stream.sol() && stream.match(/^[A-Z\s_][A-Z\s_0-9'()]*$/)) {
      // ADDED LENGTH CHECK HERE:
      if (stream.eol() && stream.current().length > 1) {
        state.inDialogue = true;
        return 'strong';
      }
    }
    
    // Parenthetical
    if (state.inDialogue && stream.sol() && stream.match(/^\s*\(.*\)/)) {
      console.log("Matched: Parenthetical");
      return 'emphasis';
    }

    // Dialogue
    if (state.inDialogue) {
      stream.skipToEnd();
      console.log("Matched: Dialogue");
      return 'string';
    }
    
    // All-Caps Scene Heading (check after character)
    if (stream.sol() && stream.match(/^[A-Z\s0-9'.-]+$/)) {
       stream.skipToEnd();
       state.inDialogue = false;
       console.log("Matched: All-Caps Scene Heading");
       return 'keyword';
    }

    // Default to action
    stream.skipToEnd();
    console.log("Matched: Action (Default)");
    return 'content';
  }
});