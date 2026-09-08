import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useLibrary } from './context/LibraryContext';
import Home from './pages/public/Home';
import Catalogue from './pages/public/Catalogue';
import BookDetails from './pages/public/BookDetails';
import EResources from './pages/public/EResources';
import QuestionPapers from './pages/public/QuestionPapers';
import Departments from './pages/public/Departments';
import DepartmentDetails from './pages/public/DepartmentDetails';
import Publications from './pages/public/Publications';
import Announcements from './pages/public/Announcements';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/Auth';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import HomepageEditor from './pages/admin/HomepageEditor';
import ManageBooks from './pages/admin/ManageBooks';
import ManageResources from './pages/admin/ManageResources';
import ManagePapers from './pages/admin/ManagePapers';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';
import ManagePublications from './pages/admin/ManagePublications';
import ManageDepartments from './pages/admin/ManageDepartments';

function Protected({ children }) {
  const { user, authReady } = useLibrary();
  if (!authReady) return <div className="route-loading"><span className="loading-spinner" /> Checking administrator session…</div>;
  return user?.role === 'admin' ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/catalogue/book/:id" element={<BookDetails />} />
      <Route path="/e-resources" element={<EResources />} />
      <Route path="/question-papers" element={<QuestionPapers />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/departments/:slug" element={<DepartmentDetails />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
    </Route>
    <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
      <Route index element={<AdminOverview />} />
      <Route path="homepage" element={<HomepageEditor />} />
      <Route path="books" element={<ManageBooks />} />
      <Route path="resources" element={<ManageResources />} />
      <Route path="papers" element={<ManagePapers />} />
      <Route path="announcements" element={<ManageAnnouncements />} />
      <Route path="publications" element={<ManagePublications />} />
      <Route path="departments" element={<ManageDepartments />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
