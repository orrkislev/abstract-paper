import { RichUtils } from 'draft-js';
import React from 'react'
import StyleButton from "./StyleButton";

var INLINE_STYLES = [
    { label: 'B', style: 'BOLD' },
    { label: 'i', style: 'ITALIC' },
    { label: 'U', style: 'UNDERLINE' },
    // { label: 'Monospace', style: 'CODE' },
];

export default function InlineStyleControls(props){

    const toggle = (inlineStyle) => {
        const currEditor = props.editors.getCurrEditor()
        if (currEditor)
            props.editors.updateEditor(currEditor, RichUtils.toggleInlineStyle(props.editors.editors[currEditor], inlineStyle))
    }

    let currentStyle = new Set([])
    const currEditorIndex = props.editors.getCurrEditor()
    if (currEditorIndex){
        currentStyle = props.editors.editors[currEditorIndex].getCurrentInlineStyle();
    }

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={toggle}
                    style={type.style}
                />
            )}
        </div>
    );
};