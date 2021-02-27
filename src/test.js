import React from 'react'
import MyEditor from './components/MyEditor'
import BlockStyleControls from './components/BlockStyleControls'
import InlineStyleControls from './components/InlineStyleControls'
import useEditor from './useEditor'

export default function Test() {
    const editors = useEditor(3)

    const allBlocks = editors.editors.map(editor => editor.getCurrentContent().getBlocksAsArray())
    // ----------- set empty paragraphs
    document.querySelectorAll('.empty').forEach(el=>el.classList.remove('empty'))
    allBlocks.forEach(blocksArray => {
        blocksArray.forEach(block=>{
            if (block.text == "") {
                let element = document.querySelector(`[data-offset-key="${block.key}-0-0"]`)
                if (element) element.classList.add('empty')
            }
        })
    })

    
    // ----------- set paragraph height
    const minimumBlockCount = Math.min(...allBlocks.map(blocks => blocks.length))
    for (let index = 0; index < minimumBlockCount; index++) {
        let elements = allBlocks.map(blocks => document.querySelectorAll(`[data-offset-key="${blocks[index].key}-0-0"]`)[0])
        elements = elements.filter(element => element !== undefined)
        elements.forEach(element => element.removeAttribute('style'))
        const maxSize = Math.max(...elements.map(element => element.offsetHeight)) - 33
        elements.forEach(element => element.setAttribute('style', `min-height:${maxSize}px;`))
    }


    //  ------------- set selected parageaphs
    document.querySelectorAll('.selected').forEach(el=>el.classList.remove('selected'))
    const selected = editors.getAllBlocksByIndex(editors.getCurrBlockIndex())
    let elements = selected.map(block => document.querySelectorAll(`[data-offset-key="${block}-0-0"]`)[0])
    elements = elements.filter(element => element !== undefined)
    elements.forEach(element => element.classList.add('selected'))

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3em'}}>
                <InlineStyleControls editors = {editors}/>
                <BlockStyleControls editors = {editors}/>
            </div>
            <div id='main'>
                {editors.editors.map((editor, index) => (
                    <MyEditor editorState={editor} onChange={(newState) => editors.updateEditor(index, newState)} />
                ))}
            </div>
            <style jsx>{`
                #main{
                    display:flex;
                    {/* gap: 0.5em; */}
                    margin-left: 2em;
                    margin-right: 2em;
                }
            `}</style>
        </>
    )
}
