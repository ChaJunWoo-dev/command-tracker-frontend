import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/MainPage";
import VideoEditPage from "@/pages/VideoEditPage";
import SubmitSuccess from "./pages/SubmitSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/video-editor" element={<VideoEditPage />} />
        <Route path="/submit-success" element={<SubmitSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
