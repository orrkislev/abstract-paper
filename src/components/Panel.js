import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

function getWords(text){
    if (text.length==0) return 0
    return text.trim().split(/\s+/).length
}

export default function Panel(props){
    const [pos, setpos] = useState(0)

    useEffect(() => {
        if (window.getSelection().rangeCount > 0){
            const y = window.getSelection().getRangeAt(0).getBoundingClientRect().y
            if (y > 0) setpos(y-16)
        }
    }, [props])

    const getPerc = ()=>{
        if (props.compare){
            if (getWords(props.compare) > 0) 
                return (<>
                    {Math.floor((getWords(props.text)/getWords(props.compare))*100)}%
                    <br/>
                </>)
        }
        return (<></>)
    } 

    return (
        <motion.div animate={{y:pos, opacity:(props.text.length>0)?1:0}} className='panel' style={{
            // opacity: (props.text.length>0)?'1':'0',
            justifySelf: props.align
        }}>
            {getPerc()}
            {getWords(props.text)} words <br/>
            {props.text.length} chars 

            <style jsx>{`
                .panel {
                    height: fit-content;
                    width: fit-content;
                    top:0;
                    padding: 0.5rem;
                    background-color: lightpink;
                    border-radius: 5px;
                    font-size:smaller;
                }
            `}</style>
        </motion.div>
    )
}