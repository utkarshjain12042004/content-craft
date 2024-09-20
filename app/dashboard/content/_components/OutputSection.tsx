import React, { use, useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface PROPS{
  aiOutput:string
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
};

function OutputSection({aiOutput}:PROPS) {
  const editorRef:any=useRef();

  useEffect(()=> {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput])

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between item-center p-5'>
        <h2 className='font-bold text-lg '>Your result</h2>
        <Button 
          className='flex gap-2 bg-purple-600 text-white'
          onClick={() => { copyToClipboard(editorRef.current.getInstance().getMarkdown()); }}
        >
          <Copy className='w-4 h-4'/> 
            Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will be displayed here."
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() => {console.log(editorRef.current.getInstance().getMarkdown())}}
      />
    </div>
  )
}

export default OutputSection