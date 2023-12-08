import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobList from "./pages/jobList/";
import AddJobs from "./pages/addJobs/";
import Header from "./components/header";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/add" element={<AddJobs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
