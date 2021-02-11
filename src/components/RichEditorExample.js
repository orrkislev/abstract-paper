import React from 'react'
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import { useRef, useState } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
import './RichEditorExample.css'
import Panel from './Panel';

export default function RichEditorExample() {
    const editorRef = useRef()
    const [editorState, seteditorState] = useState(EditorState.createEmpty())

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            seteditorState(newState);
            return true;
        }
        return false;
    }

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9) {   // TAB
            const newEditorState = RichUtils.onTab(e, editorState, 4);
            seteditorState(newEditorState);
        }
        return getDefaultKeyBinding(e);
    }

    const toggleBlockType = (blockType) => {
        seteditorState(RichUtils.toggleBlockType(editorState, blockType));
    }

    const toggleInlineStyle = (inlineStyle) => {
        seteditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    return (<>
        <div className="RichEditor-root">
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <div className='RichEditor-editor' onClick={(e) => editorRef.current.focus()}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={seteditorState}
                    ref={editorRef}
                    spellCheck={true}
                />
                <Panel editorState={editorState} />
            </div>
        </div>
        <style jsx>{`
            .RichEditor-root {
                position: relative;
                border: 1px dashed gray;
                border-radius: 8px;
                margin:1em auto;
                padding: 1em;
                width: 50%;
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