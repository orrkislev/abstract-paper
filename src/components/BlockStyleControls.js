import { RichUtils } from 'draft-js';
import React from 'react'
import StyleButton from "./StyleButton";

const BLOCK_TYPES = [
    // { label: 'H1', style: 'header-one' },
    { label: 'Header', style: 'header-two' },
    { label: 'SubTitle', style: 'header-three' },
    // { label: 'SubTitle', style: 'header-four' },
    // { label: 'H5', style: 'header-five' },
    // { label: 'H6', style: 'header-six' },
    { label: 'Quote', style: 'blockquote' },
    { label: 'Bullets', style: 'unordered-list-item' },
    { label: 'Number List', style: 'ordered-list-item' },
    // { label: 'Code Block', style: 'code-block' },
];

export default function BlockStyleControls(props){
    // const { editorState } = props;
    

    const toggle = (blockType)=>{
        const currEditorIndex = props.editors.getCurrEditor()
        if (currEditorIndex!==null)
            props.editors.updateEditor(currEditorIndex, RichUtils.toggleBlockType(props.editors.editors[currEditorIndex], blockType))
    }

    let blockType = ''
    const currEditorIndex = props.editors.getCurrEditor()
    if (currEditorIndex){
        const editorState = props.editors.editors[currEditorIndex]
        const selection = editorState.getSelection();
        blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    }

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    // active={false}
                    label={type.label}
                    onToggle={toggle}
                    style={type.style}
                />
            )}
        </div>
    );
};