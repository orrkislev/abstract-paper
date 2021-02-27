import { convertFromRaw, convertToRaw, EditorState, RichUtils } from 'draft-js'
import { useEffect, useState } from 'react'

export default function useEditor(size) {
    const [editors, seteditors] = useState(Array(size).fill(0).map(a => EditorState.createEmpty()))

    const updateEditor = (index, editorState) => {
        let newEditors = [...editors]
        newEditors[index] = editorState
        seteditors(newEditors)
    }

    const getCurrEditor = () => {
        for (let i = 0; i < size; i++) {
            if (editors[i].getSelection().getHasFocus()) return i
        }
        return null
    }

    const getCurrBlockIndex = () => {
        const currEditorIndex = getCurrEditor()
        if (currEditorIndex != null) {
            const currEditor = editors[currEditorIndex]
            const anchorKey = currEditor.getSelection().getAnchorKey()
            const blocks = currEditor.getCurrentContent().getBlocksAsArray()
            return blocks.indexOf(blocks.find(e => e.key === anchorKey))
        }
    }

    const getAllBlocksByIndex = (index) => {
        let res = editors.map(editor=>{
            const blocks = editor.getCurrentContent().getBlocksAsArray()
            return blocks[index]?.key
        })
        res = res.filter(b=>b!=null)
        return res
    }

    return {
        editors, updateEditor,
        getCurrEditor, getCurrBlockIndex,
        getAllBlocksByIndex
    }
}