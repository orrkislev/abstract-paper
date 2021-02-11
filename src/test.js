import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import React, { useState } from 'react'
import Panel from './components/Panel'
import MyEditor from './components/MyEditor'

export default function Test() {
    const [editorState1, seteditorState1] = useState(EditorState.createEmpty())
    const [editorState2, seteditorState2] = useState(EditorState.createEmpty())

    let paragraphIndex = -1
    if (editorState1.getSelection().getHasFocus()) {
        const anchorKey = editorState1.getSelection().getAnchorKey()
        const blocks = editorState1.getCurrentContent().getBlocksAsArray()
        paragraphIndex = blocks.indexOf(blocks.find(e => e.key === anchorKey))
    } else if (editorState2.getSelection().getHasFocus()) {
        const anchorKey = editorState2.getSelection().getAnchorKey()
        const blocks = editorState2.getCurrentContent().getBlocksAsArray()
        paragraphIndex = blocks.indexOf(blocks.find(e => e.key === anchorKey))
    }

    let text1 = '', text2 = ''
    if (paragraphIndex > -1) {
        const blocks1 = editorState1.getCurrentContent().getBlocksAsArray()
        const blocks2 = editorState2.getCurrentContent().getBlocksAsArray()
        if (blocks1.length >= paragraphIndex + 1) text1 = blocks1[paragraphIndex].getText()
        if (blocks2.length >= paragraphIndex + 1) text2 = blocks2[paragraphIndex].getText()
    }

    const blocks1 = editorState1.getCurrentContent().getBlocksAsArray()
    const blocks2 = editorState2.getCurrentContent().getBlocksAsArray()
    for (let index = 0; index < Math.min(blocks1.length, blocks2.length); index++) {
        const element1 = document.querySelectorAll(`[data-offset-key="${blocks1[index].key}-0-0"]`)[0]
        const element2 = document.querySelectorAll(`[data-offset-key="${blocks2[index].key}-0-0"]`)[0]
        const size1 = element1 ? element1.offsetHeight : -1
        const size2 = element2 ? element2.offsetHeight : -1
        if (size1 > -1 && size2 > -1) {
            if (size1 > size2 + 33) element2.setAttribute('style', `height:${size1 - 33}px;`)
            if (size2 > size1 + 33) element1.setAttribute('style', `height:${size2 - 33}px;`)
        }
    }

    const save = (e) => {
        const raw1 = convertToRaw(editorState1.getCurrentContent())
        const content = convertFromRaw(raw1)
        seteditorState2(EditorState.createWithContent(content))
    }

    return (
        <>
            <div id='topBar'>
                <button onClick={save}>save</button>
            </div>
            <div id='main'>
                <Panel align='end' text={text1} />
                <MyEditor editorState={editorState1} seteditorState={seteditorState1} />
                <MyEditor editorState={editorState2} seteditorState={seteditorState2} />
                <Panel align='start' text={text2} compare={text1} />
            </div>
            <style jsx>{`
                #main{
                    display: grid;
                    grid-template-columns: 1fr 6fr 6fr 1fr;
                }
            `}</style>
        </>
    )
}
