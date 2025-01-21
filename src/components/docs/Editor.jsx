// src/components/docs/Editor.jsx
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '../common/Button';
import { Bold, Italic, List, ListOrdered, Code } from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 p-4 flex flex-wrap gap-2">
      <Button
        variant={editor.isActive('bold') ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Button>
      <Button
        variant={editor.isActive('italic') ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Button>
      <Button
        variant={editor.isActive('bulletList') ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Button>
      <Button
        variant={editor.isActive('orderedList') ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </Button>
      <Button
        variant={editor.isActive('code') ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code size={16} />
      </Button>
    </div>
  );
};

const Editor = ({ initialContent = '', onSave }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose max-w-none focus:outline-none',
      },
    },
  });

  const handleSave = () => {
    if (onSave && editor) {
      onSave(editor.getHTML());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <MenuBar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
      <div className="border-t border-gray-200 p-4 flex justify-end">
        <Button onClick={handleSave}>Save Document</Button>
      </div>
    </div>
  );
};

export default Editor;