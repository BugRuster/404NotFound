// src/components/docs/Editor.jsx
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Code, Save } from 'lucide-react';

const MenuBar = ({ editor, isSaving }) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-white">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-indigo-100 text-indigo-600' : ''}`}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-indigo-100 text-indigo-600' : ''}`}
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-indigo-100 text-indigo-600' : ''}`}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-indigo-100 text-indigo-600' : ''}`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('code') ? 'bg-indigo-100 text-indigo-600' : ''}`}
      >
        <Code size={18} />
      </button>
      
      <div className="ml-auto flex items-center gap-2">
        {isSaving ? (
          <span className="text-sm text-gray-500">Saving...</span>
        ) : (
          <span className="text-sm text-green-500">All changes saved</span>
        )}
        <Save size={18} className={isSaving ? 'animate-spin text-gray-400' : 'text-green-500'} />
      </div>
    </div>
  );
};

const Editor = ({ initialContent = '', onSave }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none p-4 min-h-[500px]',
      },
    },
    onUpdate: ({ editor }) => {
      // Trigger auto-save
      handleAutoSave(editor.getHTML());
    },
  });

  // Debounced auto-save
  const handleAutoSave = React.useCallback(
    debounce(async (content) => {
      setIsSaving(true);
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLastSaved(new Date());
        if (onSave) {
          await onSave(content);
        }
      } catch (error) {
        console.error('Failed to save:', error);
      } finally {
        setIsSaving(false);
      }
    }, 2000),
    [onSave]
  );

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <MenuBar editor={editor} isSaving={isSaving} />
      <EditorContent editor={editor} />
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Editor;