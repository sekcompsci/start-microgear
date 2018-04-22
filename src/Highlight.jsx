import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { googlecode } from 'react-syntax-highlighter/styles/hljs'

const Highlight = (lang, codeString) => {
    return(<SyntaxHighlighter language={lang} style={googlecode}>{codeString}</SyntaxHighlighter>)
}

export default Highlight