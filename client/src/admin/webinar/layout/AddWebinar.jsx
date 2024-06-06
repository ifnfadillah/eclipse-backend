import React, { useState } from 'react';
import Layout from '@/admin/layout';
import Button from '@/admin/components/Button';
import Input from '@/admin/components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function AddWebinar() {
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

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('judul', values.judul);
        formData.append('foto', values.foto);
        formData.append('deskripsi', values.deskripsi);
        formData.append('narasumber', values.narasumber);
        formData.append('tanggal', values.tanggal);
        formData.append('waktu', values.waktu);
        formData.append('harga', values.harga);
        formData.append('link_daftar', values.link_daftar);

        console.log('Submitting values:', values);
        axios.post('http://localhost:3001/webinar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log('Response:', res);
                navigate('/data-webinar', { state: { alertMessage: `Berhasil menambahkan ${values.judul}` } });
            })
            .catch(err => {
                console.error('Error:', err.response ? err.response.data : err.message);
            });
    }
    return (
        <Layout>
            <div className="py-8 px-4 md:mx-52 max-w-xl lg:py-13">
                <h2 className="mb-5 text-2xl font-semibold font-primary text-gray-900">Tambah Webinar</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-6 sm:gap-6">
                        <Input
                            text="Judul Webinar"
                            name="judul"
                            type="text"
                            placeholder="Masukkan judul webinar"
                            onChange={(e) => setValues({ ...values, judul: e.target.value })} />
                        <Input
                            text="Foto"
                            name="foto"
                            type="file"
                            placeholder="Masukkan URL foto webinar"
                            onChange={(e) => setValues({ ...values, foto: e.target.files[0], })} />
                        <Input
                            text="Deskripsi"
                            name="deskripsi"
                            type="desc"
                            placeholder="Masukkan deskripsi webinar"
                            onChange={(e) => setValues({ ...values, deskripsi: e.target.value })} />
                        <Input
                            text="Narasumber"
                            name="narasumber"
                            type="text"
                            placeholder="Masukkan narasumber webinar"
                            onChange={(e) => setValues({ ...values, narasumber: e.target.value })} />
                        <Input
                            text="Tanggal"
                            name="tanggal"
                            type="date"
                            placeholder="Masukkan tanggal webinar"
                            onChange={(e) => setValues({ ...values, tanggal: e.target.value })} />
                        <Input
                            text="Waktu"
                            name="waktu"
                            type="time"
                            placeholder="Masukkan pukul webinar"
                            onChange={(e) => setValues({ ...values, waktu: e.target.value })} />
                        <Input
                            text="Harga"
                            name="harga"
                            type="text"
                            placeholder="Masukkan harga webinar"
                            onChange={(e) => setValues({ ...values, harga: e.target.value })} />
                        <Input
                            text="Link Daftar"
                            name="link"
                            type="text"
                            placeholder="Masukkan link daftar komunitas"
                            onChange={(e) => setValues({ ...values, link_daftar: e.target.value })} />
                    </div>
                    <div className="mt-6 flex space-x-4 justify-end">
                        <Button
                            classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-red-500 hover:bg-red-700 text-white"
                            type="button"
                            name="batal">
                            <Link to="/data-webinar">Batal</Link>
                        </Button>
                        <Button
                            classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-sky-700 hover:bg-sky-900 text-white"
                            type="submit"
                            name="submit">
                            Tambah
                        </Button>
                    </div>
                </form>
            </div>

        </Layout>
    )
}

export default AddWebinar