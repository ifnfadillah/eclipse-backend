import React, { useState, useEffect } from "react";
import Layout from "@/admin/layout";
import Button from "@/admin/components/Button";
import Input from "@/admin/components/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditWebinar() {
  const { id } = useParams();
  const [values, setValues] = useState({
    judul: "",
    foto: "",
    deskripsi: "",
    narasumber: "",
    tanggal: "",
    waktu: "",
    harga: "",
    link_daftar: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/webinar/${id}`)
      .then((res) => {
        console.log("Response:", res);
        const responseData = res.data;
        if (responseData) {
          setValues({
            ...values,
            judul: responseData.judul,
            foto: responseData.foto,
            deskripsi: responseData.deskripsi,
            narasumber: responseData.narasumber,
            tanggal: responseData.tanggal,
            waktu: responseData.waktu,
            harga: responseData.harga,
            link_daftar: responseData.link_daftar,
          });
        } else {
          console.error("Data not found");
        }
      })
      .catch((err) => {
        console.error("Error:", err.response ? err.response.data : err.message);
      });
  }, [id]);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("foto", values.foto);
    formData.append("deskripsi", values.deskripsi);
    formData.append("narasumber", values.narasumber);
    formData.append("tanggal", values.tanggal);
    formData.append("waktu", values.waktu);
    formData.append("harga", values.harga);
    formData.append("link_daftar", values.link_daftar);

    axios
      .put(`http://localhost:3001/webinar/update/${id}`, formData)
      .then((res) => {
        console.log("Update success:", res);
        navigate("/data-webinar", { state: { alertMessage: `Berhasil mengubah ${values.judul}` } });
      })
      .catch((err) => {
        console.error("Update error:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <Layout>
      <div className="py-8 px-4 md:mx-52 max-w-xl lg:py-13">
        <h2 className="mb-5 text-2xl font-semibold font-primary text-gray-900">Ubah Webinar</h2>
        <form onSubmit={handleUpdate}>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-6 sm:gap-6">
            <Input text="Judul Webinar" name="judul" type="text" placeholder="Masukkan judul webinar" value={values.judul} onChange={(e) => setValues({ ...values, judul: e.target.value })} />
            <Input text="Foto" name="foto" type="file" placeholder="Masukkan URL foto webinar" value={values.foto} onChange={(e) => setValues({ ...values, foto: e.target.files[0] })} />
            <Input text="Deskripsi" name="deskripsi" type="desc" placeholder="Masukkan deskripsi webinar" value={values.deskripsi} onChange={(e) => setValues({ ...values, deskripsi: e.target.value })} />
            <Input text="Narasumber" name="narasumber" type="text" placeholder="Masukkan narasumber webinar" value={values.narasumber} onChange={(e) => setValues({ ...values, narasumber: e.target.value })} />
            <Input text="Tanggal" name="tanggal" type="date" placeholder="Masukkan tanggal webinar" value={values.tanggal} onChange={(e) => setValues({ ...values, tanggal: e.target.value })} />
            <Input text="Waktu" name="waktu" type="time" placeholder="Masukkan waktu webinar" value={values.waktu} onChange={(e) => setValues({ ...values, waktu: e.target.value })} />
            <Input text="Harga" name="harga" type="text" placeholder="Masukkan harga webinar" value={values.harga} onChange={(e) => setValues({ ...values, harga: e.target.value })} />
            <Input text="Link Daftar" name="link" type="text" placeholder="Masukkan link daftar komunitas" value={values.link_daftar} onChange={(e) => setValues({ ...values, link_daftar: e.target.value })} />
          </div>
          <div className="mt-6 flex space-x-4 justify-end">
            <Button classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-red-500 hover:bg-red-700 text-white" type="button" name="batal">
              <Link to="/data-webinar">Batal</Link>
            </Button>
            <Button classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-sky-700 hover:bg-sky-900 text-white" type="submit" name="update">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EditWebinar;
