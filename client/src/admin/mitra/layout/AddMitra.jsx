import React, { useState } from 'react';
import Layout from '@/admin/layout';
import Button from '@/admin/components/Button';
import Input from '@/admin/components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddMitra() {
    const [values, setValues] = useState({
        nama: "",
        logo: "",
        deskripsi: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama', values.nama);
        formData.append('deskripsi', values.deskripsi);
        formData.append('logo', values.logo);

        console.log('Submitting values:', values);
        axios.post('http://localhost:3001/mitra', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log('Response:', res);
                navigate('/data-mitra', { state: { alertMessage: `Berhasil menambahkan ${values.nama}` } });
            })
            .catch(err => {
                console.error('Error:', err.response ? err.response.data : err.message);
            });
    }

    return (
        <Layout>
            <div className="py-8 px-4 md:mx-52 max-w-xl lg:py-13">
                <h2 className="mb-5 text-2xl font-semibold font-primary text-gray-900">Tambah Mitra</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-6 sm:gap-6">
                        <Input
                            text="Nama Mitra"
                            name="nama"
                            type="text"
                            placeholder="Masukkan nama mitra"
                            onChange={(e) => setValues({ ...values, nama: e.target.value })} />
                        <Input
                            text="Logo Mitra"
                            name="logo"
                            type="file"
                            placeholder="Masukkan URL logo mitra"
                            onChange={(e) => setValues({ ...values, logo: e.target.files[0], })} />
                        <Input
                            text="Deskripsi Mitra"
                            name="deskripsi"
                            type="desc"
                            placeholder="Masukkan deskripsi mitra"
                            onChange={(e) => setValues({ ...values, deskripsi: e.target.value })} />
                    </div>
                    <div className="mt-6 flex space-x-4 justify-end">
                        <Button
                            classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-red-500 hover:bg-red-700 text-white"
                            type="button"
                            name="batal">
                            <Link to="/data-mitra">Batal</Link>
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
    );
}

export default AddMitra;
