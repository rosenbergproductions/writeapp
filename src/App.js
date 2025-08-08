import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import MenuBar from './components/MenuBar';
import Sidebar from './components/Sidebar';
import Auth from './pages/Auth';
import FileBrowser from './components/FileBrowser';
import SaveAsModal from './components/SaveAsModal';
import CodeMirrorEditor from './components/CodeMirrorEditor'; // Import the new editor
import { supabase } from './services/supabase';


function App() {
  const [session, setSession] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  
  const [showFileBrowser, setShowFileBrowser] = useState(false);
  const [showSaveAsModal, setShowSaveAsModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  

  // State management is now very simple: the content is always raw text.
  const handleContentChange = (newContent) => {
    setCurrentDocument(prevDoc => ({...prevDoc, content: newContent}));
  };

  const handleNew = () => {
    setCurrentDocument({ id: null, title: 'Untitled', content: 'INT. A NEW SCENE - DAY\n\n' });
  };

  const handleSelectDocument = (doc) => {
    setCurrentDocument(doc);
    setShowFileBrowser(false);
  };

  const handleSave = async () => {
    if (currentDocument && session) {
      const { id, title, content } = currentDocument;
      if (id) {
        const { error } = await supabase.from('documents').update({ title, content, updated_at: new Date() }).eq('id', id);
        if (error) console.error('Error updating document:', error);
      } else {
        setShowSaveAsModal(true);
      }
      fetchDocuments();
    }
  };

  const handleSaveWithTitle = async (title) => {
    if (currentDocument && session) {
      const { content } = currentDocument;
      const { data, error } = await supabase.from('documents').insert([{ title, content, user_id: session.user.id }]).select();
      if (error) console.error('Error creating document:', error);
      else if (data) setCurrentDocument(data[0]);
      fetchDocuments();
    }
  };
  
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchDocuments();
  }, [session]);
  
  

  const fetchDocuments = async () => {
    const { data, error } = await supabase.from('documents').select('*');
    if (error) console.error('Error fetching documents:', error);
    else setDocuments(data);
  };


  
  const handleOpen = () => setShowFileBrowser(true);
  const handleSaveAs = () => setShowSaveAsModal(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="App">
      {session ? (
        <>
          <MenuBar onNew={handleNew} onOpen={handleOpen} onSave={handleSave} onSaveAs={handleSaveAs} currentDocument={currentDocument} toggleSidebar={toggleSidebar} />
          <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-hidden'}`}>
            {isSidebarOpen && <Sidebar className={isSidebarOpen ? '' : 'hidden'} />}
            <div className="editor-container">
              <CodeMirrorEditor
                content={currentDocument ? currentDocument.content : ''}
                onChange={handleContentChange}
              />
            </div>
          </div>
          <FileBrowser show={showFileBrowser} onHide={() => setShowFileBrowser(false)} documents={documents} onSelect={handleSelectDocument} />
          <SaveAsModal show={showSaveAsModal} onHide={() => setShowSaveAsModal(false)} onSave={handleSaveWithTitle} />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;