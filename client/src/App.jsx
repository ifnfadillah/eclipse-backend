import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./admin/login/Login";
import NotFound from "./pages/404";
import "./index.css";
// admin
import Dashboard from "./admin/pages/Dashboard";
import DataMitra from "./admin/pages/DataMitra";
import AddMitra from "./admin/mitra/layout/AddMitra";
import EditMitra from "./admin/mitra/layout/EditMitra";
import DataKidspedia from "./admin/pages/DataKidspedia";
import AddKidspedia from "./admin/kidspedia/layout/AddKidspedia";
import EditKidspedia from "./admin/kidspedia/layout/EditKidspedia";
import DataWebinar from "./admin/pages/DataWebinar";
import AddWebinar from "./admin/webinar/layout/AddWebinar";
import EditWebinar from "./admin/webinar/layout/EditWebinar";
import DataKomunitas from "./admin/pages/DataKomunitas";
import AddKomunitas from "./admin/komunitas/layout/AddKomunitas";
import EditKomunitas from "./admin/komunitas/layout/EditKomunitas";
import DataArtikel from "./admin/pages/DataArtikel";
import AddArtikel from "./admin/artikel/layout/AddArtikel";
import EditArtikel from "./admin/artikel/layout/EditArtikel";

// user
import HomeUser from "./user/pages/HomeUser";
import Kidspedia from "./user/pages/kidspedia";
import Sharenting from "./user/pages/sharenting";
import Webinar from "./user/pages/listWebinar";
import PanduanAsuh from "./user/pages/panduanasuh";
import Komunitas from "./user/pages/listKomunitas";
import DetailKomunitas from "./user/pages/DetailKomunitas";
import DetailWebinar from "./user/pages/DetailWebinar";
import Artikel from "./user/pages/artikel";
import HasilQuiz from "./user/pages/hasilquiz";
import Quiz from "./user/pages/quiz";
import GayaParenting from "./user/pages/gayaparenting";
import KenaliGaya from "./user/pages/kenaligaya";
import DetailPanduan from "./user/pages/DetailPanduan";
import DetailGaya from "./user/pages/DetailGaya";
import ListVideoBelajar from "./user/pages/listVideoBelajar";
import ListMewarnai from "./user/pages/listMewarnai";
import DetailArtikel from "./user/pages/DetailArtikel";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route index path="/" element={<HomeUser />} />
      <Route path="/kidspedia" element={<Kidspedia />} />
      <Route path="/sharenting" element={<Sharenting />} />
      <Route path="/sharenting-webinar" element={<Webinar />} />
      <Route path="/sharenting-webinar/:id" element={<DetailWebinar />} />
      <Route path="/sharenting-komunitas" element={<Komunitas />} />
      <Route path="/sharenting-komunitas/:id" element={<DetailKomunitas />} />
      <Route path="/artikel" element={<Artikel />} />
      <Route path="/artikel/:id" element={<DetailArtikel />} />
      <Route path="/edukasi/gaya-parenting" element={<GayaParenting />} />
      <Route path="/edukasi/kenali-gaya" element={<KenaliGaya />} />
      <Route path="/edukasi/kenali-gaya/quiz" element={<Quiz />} />
      <Route
        path="/edukasi/kenali-gaya/quiz/hasilquiz"
        element={<HasilQuiz />}
      />
      <Route path="/edukasi/panduan-asuh" element={<PanduanAsuh />} />
      <Route path="/edukasi/panduan-asuh/:id" element={<DetailPanduan />} />
      <Route path="/edukasi/gaya-parenting/:id" element={<DetailGaya />} />
      <Route path="/kidspedia/video" element={<ListVideoBelajar />} />
      <Route path="/kidspedia/mewarnai" element={<ListMewarnai />} />

      {/* //ADMIN */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      {/* //ADMIN MITRA */}
      <Route
        path="/data-mitra"
        element={<ProtectedRoute element={<DataMitra />} />}
      />
      <Route
        path="/data-mitra/add"
        element={<ProtectedRoute element={<AddMitra />} />}
      />
      <Route
        path="/data-mitra/edit/:id"
        element={<ProtectedRoute element={<EditMitra />} />}
      />
      {/* //ADMIN KIDSPEDIA */}
      <Route
        path="/data-kidspedia"
        element={<ProtectedRoute element={<DataKidspedia />} />}
      />
      <Route
        path="/data-kidspedia/add"
        element={<ProtectedRoute element={<AddKidspedia />} />}
      />
      <Route
        path="/data-kidspedia/edit/:id"
        element={<ProtectedRoute element={<EditKidspedia />} />}
      />
      {/* //ADMIN WEBINAR */}
      <Route
        path="/data-webinar"
        element={<ProtectedRoute element={<DataWebinar />} />}
      />
      <Route
        path="/data-webinar/add"
        element={<ProtectedRoute element={<AddWebinar />} />}
      />
      <Route
        path="/data-webinar/edit/:id"
        element={<ProtectedRoute element={<EditWebinar />} />}
      />
      {/* //ADMIN KOMUNITAS */}
      <Route
        path="/data-komunitas"
        element={<ProtectedRoute element={<DataKomunitas />} />}
      />
      <Route
        path="/data-komunitas/add"
        element={<ProtectedRoute element={<AddKomunitas />} />}
      />
      <Route
        path="/data-komunitas/edit/:id"
        element={<ProtectedRoute element={<EditKomunitas />} />}
      />
      {/* //ADMIN ARTIKEL */}
      <Route
        path="/data-artikel"
        element={<ProtectedRoute element={<DataArtikel />} />}
      />
      <Route
        path="/data-artikel/add"
        element={<ProtectedRoute element={<AddArtikel />} />}
      />
      <Route
        path="/data-artikel/edit/:id"
        element={<ProtectedRoute element={<EditArtikel />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
