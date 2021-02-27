import React, { useEffect, useState } from 'react'
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import { useRef } from "react";
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js'
import './RichEditorExample.css'
import { motion } from 'framer-motion';

export default function MyEditor(props) {
    const editorRef = useRef()
    const [large, setlarge] = useState(true)

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) props.onChange(newState);
        return newState != null;
    }

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9) {   // TAB
            const newEditorState = RichUtils.onTab(e, props.editorState, 4);
            props.onChange(newEditorState);
        }
        return getDefaultKeyBinding(e);
    }

    return (<>
        <Blah resize={() => setlarge(!large)} />
        <motion.div className="RichEditor-root" animate={{width:(large)?'100%':'20px'}}>
            <div className='RichEditor-editor' onClick={(e) => editorRef.current.focus()}>
                {large && (
                    <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={props.editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={props.onChange}
                    ref={editorRef}
                    spellCheck={true}
                />
                )}
            </div>
        </motion.div>

        <style jsx>{`
            .RichEditor-root {
                display: inline-block;
                position: relative;
                border-radius: 8px;
                background: white;
                box-shadow: rgba(0,0,0,0.2) 6px 10px 12px -5px;
                overflow:hidden;
                min-height: 50vh;
            }   
            .public-DraftStyleDefault-rtl{
                direction: rtl;
            }
        `}</style>
    </>
    );
}

function Blah(props) {
    const [hover, sethover] = useState(false)
    return (
        <div className={'blah ' + (hover ? 'blah-hover' : '')} onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)} onClick={props.resize}>
        </div>
    )
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
        default: return 'test';
    }
}