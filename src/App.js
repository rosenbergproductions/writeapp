import React, { useState, useEffect } from 'react';
import './App.css';
import MenuBar from './components/MenuBar';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Auth from './pages/Auth';
import FileBrowser from './components/FileBrowser';
import SaveAsModal from './components/SaveAsModal';
import FountainPreview from './components/FountainPreview';
import { supabase } from './services/supabase';

function App() {
  const [session, setSession] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [showFileBrowser, setShowFileBrowser] = useState(false);
  const [showSaveAsModal, setShowSaveAsModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchDocuments();
    }
  }, [session]);

  const fetchDocuments = async () => {
    const { data, error } = await supabase.from('documents').select('*');
    if (error) {
      console.error('Error fetching documents:', error);
    } else {
      setDocuments(data);
    }
  };

  const handleNew = () => {
    setCurrentDocument({ id: null, title: '', content: '' });
  };

  const handleOpen = () => {
    setShowFileBrowser(true);
  };

  const handleSave = async () => {
    if (currentDocument && session) {
      const { id, title, content } = currentDocument;
      const user = session.user;

      if (id) {
        // Update existing document
        const { error } = await supabase
          .from('documents')
          .update({ title, content, updated_at: new Date() })
          .eq('id', id);
        if (error) console.error('Error updating document:', error);
      } else {
        // If no ID, treat as Save As
        setShowSaveAsModal(true);
      }
      fetchDocuments();
    }
  };

  const handleSaveAs = () => {
    setShowSaveAsModal(true);
  };

  const handleSaveWithTitle = async (title) => {
    if (currentDocument && session) {
      const { content } = currentDocument;
      const user = session.user;

      const { data, error } = await supabase
        .from('documents')
        .insert([{ title, content, user_id: user.id }])
        .select();

      if (error) {
        console.error('Error creating document:', error);
      } else {
        setCurrentDocument(data[0]);
      }
      fetchDocuments();
    }
  };

  const handleSelectDocument = (doc) => {
    setCurrentDocument(doc);
    setShowFileBrowser(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      {session ? (
        <>
          <MenuBar
            onNew={handleNew}
            onOpen={handleOpen}
            onSave={handleSave}
            onSaveAs={handleSaveAs}
            currentDocument={currentDocument}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-content">
            {isSidebarOpen && <Sidebar />}
            <Editor
              content={currentDocument ? currentDocument.content : ''}
              onChange={(content) =>
                setCurrentDocument({ ...currentDocument, content })
              }
            />
            <FountainPreview
              content={currentDocument ? currentDocument.content : ''}
            />
          </div>
          <FileBrowser
            show={showFileBrowser}
            onHide={() => setShowFileBrowser(false)}
            documents={documents}
            onSelect={handleSelectDocument}
          />
          <SaveAsModal
            show={showSaveAsModal}
            onHide={() => setShowSaveAsModal(false)}
            onSave={handleSaveWithTitle}
          />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
