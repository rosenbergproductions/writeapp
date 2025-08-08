

### **WriteApp: Architectural Design Outline**

#### **1. Core Architecture: Serverless SPA**

- **Model:** A modern **Single-Page Application (SPA)** for the frontend that communicates directly with **Supabase** for all backend services.
- **Key Principle:** This model eliminates the need for a traditional, self-managed backend server (like Node.js), leading to faster development and easier scaling.
* * *

#### **2. Frontend (The Browser Application)**

- **Technology:** A JavaScript framework like **React**.
- **Responsibilities:**

    - **UI and State Management:** Renders all components (editor, menus, sidebar) and manages the application's state (e.g., current text, open modals).

    - **Fountain Syntax Parsing:** Parses the raw plaintext in the browser using a library like `fountain-js`. It then applies formatting styles using CSS.

    - **Client-Side Logic:** Handles features like the "Navigator" sidebar and basic document statistics by processing the parsed text data directly.

    - **Direct API Calls:** Uses the `supabase-js` client library to securely communicate with the backend for data and authentication.
* * *

#### **3. Backend (The Supabase Platform)**

- **Role:** Acts as the complete backend, providing a suite of integrated services.
- **Core Services Used:**

    - **Authentication:** Manages user sign-up, login, and session control via Supabase Auth.

    - **Database (PostgreSQL):**

        - Stores all persistent data (user documents, bin snippets).

        - Uses **Row Level Security (RLS)** to ensure users can only access their own data.

        - The database only ever stores **raw plaintext**, not formatted text.

    - **Realtime:**

        - **Presence:** To show who is currently active in a document.

        - **Broadcast:** To send real-time text changes between clients for collaborative editing.
* * *

#### **4. Advanced Features & Extensibility**

- **Method:** Use **Supabase Edge Functions** for custom server-side logic that shouldn't run in the browser.
- **Use Cases:**

    - **File Exports (PDF/FDX):** An Edge Function takes raw text, uses a library to generate the file, and saves it to **Supabase Storage**.

    - **Heavy Data Processing:** Offloading complex analysis that might slow down the browser.

    - **Secure API Integrations:** Communicating with third-party services using secret API keys hidden from the frontend.

This architecture creates a powerful, secure, and scalable application where the frontend focuses on user experience and the backend provides robust, ready-to-use services.


#### **Core Writing & Editing ✍️**

- **Fountain Syntax Recognition:** The editor understands the Fountain plaintext screenwriting format.
- **Live Screenplay Formatting:** Automatically formats plaintext into standard screenplay layout (centered character names, indented dialogue, etc.) as you type.
- **Minimalist Editor:** A clean, 60-character-wide writing canvas designed for focus.
- **Extensible Menu Bar:** A familiar, Google Docs-style menu (`File`, `Edit`, `Format`, etc.) designed for future expansion.

#### **File Management & Data 📂**

- **Cloud Storage:** All documents are securely saved to the cloud via Supabase.1
- **Standard File Operations:** Full support for `New`, `Open`, `Save`, and `Save As` functions.
- **Modal File Browser:** An intuitive popup window for opening existing documents from a user's library.

#### **User & Collaboration 👥**

- **Secure Authentication:** Users can sign up and log in to access their private work.
- **Real-time Collaborative Editing:** (Future capability) Multiple users can edit the same document simultaneously.
- **Collaborator Presence:** (Future capability) See who is currently viewing or editing a document with you.

#### **Productivity & Analysis Tools 📊**

- **Multi-Modal Sidebar:** A collapsible sidebar that can switch between different modes.

    - **Navigator Mode:** Provides a clickable document outline based on scene headings for quick navigation.

    - **Bin Mode:** A dedicated space to store and manage snippets of text, research, or ideas.
- **Document Statistics:** Provides insights like estimated page count, scene count, and more.2
- **Character Analysis:** Analyzes character dialogue counts and scene presence within the script.

#### **Export & Integration 📄**

- **PDF Export:** Generate and download a professionally formatted PDF of your screenplay.
- **FDX Export:** Export your script to the Final Draft `.fdx` format for compatibility with industry-standard software.