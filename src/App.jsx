import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/MainPage";
import VideoEditor from "@/pages/VideoEditor";

import SubmitSuccess from "./pages/SubmitSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/video-editor" element={<VideoEditor />} />
        <Route path="/submit-success" element={<SubmitSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
