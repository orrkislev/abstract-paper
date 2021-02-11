import React, { useEffect } from 'react'
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import { useRef } from "react";
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js'
import './RichEditorExample.css'

export default function MyEditor(props) {
    const editorRef = useRef()

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) props.seteditorState(newState);
        return newState!=null;
    }

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9) {   // TAB
            const newEditorState = RichUtils.onTab(e, props.editorState, 4);
            props.seteditorState(newEditorState);
        }
        return getDefaultKeyBinding(e);
    }

    const toggleBlockType = (blockType) => {
        props.seteditorState(RichUtils.toggleBlockType(props.editorState, blockType));
    }

    const toggleInlineStyle = (inlineStyle) => {
        props.seteditorState(RichUtils.toggleInlineStyle(props.editorState, inlineStyle));
    }

    return (<>
        <div className="RichEditor-root">
            <BlockStyleControls
                editorState={props.editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={props.editorState}
                onToggle={toggleInlineStyle}
            />
            <div className='RichEditor-editor' onClick={(e) => editorRef.current.focus()}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={props.editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={props.seteditorState}
                    ref={editorRef}
                    spellCheck={true}
                />
            </div>
        </div>
        <style jsx>{`
            .RichEditor-root {
                position: relative;
                border: 1px dashed gray;
                border-radius: 8px;
                padding: 1em;
            }   
            .public-DraftStyleDefault-rtl{
                direction: rtl;
            }
        `}</style>
    </>
    );
}



// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        case 'unstyled': return 'test'
        default: return null;
    }
}