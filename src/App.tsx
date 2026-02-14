import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/common/Layout";
import MainPage from "@/pages/MainPage";
import VideoEditPage from "@/pages/VideoEditPage";
import CharacterSelectionPage from "@/pages/CharacterSelectionPage";
import SubmitSuccess from "./pages/SubmitSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/video-edit" element={<VideoEditPage />} />
          <Route path="/character-selection" element={<CharacterSelectionPage />} />
        </Route>
        <Route path="/submit-success" element={<SubmitSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
