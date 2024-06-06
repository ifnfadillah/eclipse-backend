import React, { useState } from 'react';
import Layout from '@/admin/layout';
import Button from '@/admin/components/Button';
import Input from '@/admin/components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddArtikel() {
    const [values, setValues] = useState({
        judul: "",
        author: "",
        foto: "",
        tanggal: "",
        isi: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('judul', values.judul);
        formData.append('author', values.author);
        formData.append('foto', values.foto);
        formData.append('tanggal', values.tanggal);
        formData.append('isi', values.isi);

        console.log('Submitting values:', values);
        axios.post('http://localhost:3001/artikel', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log('Response:', res);
                navigate('/data-artikel', { state: { alertMessage: `Berhasil menambahkan ${values.judul}` } });
            })
            .catch(err => {
                console.error('Error:', err.response ? err.response.data : err.message);
            });
    }
    return (
        <Layout>
            <div className="py-8 px-4 md:mx-52 max-w-xl lg:py-13">
                <h2 className="mb-5 text-2xl font-semibold font-primary text-gray-900">Tambah Artikel</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-6 sm:gap-6">
                        <Input
                            text="Judul Artikel"
                            name="judul"
                            type="text"
                            placeholder="Masukkan judul artikel"
                            onChange={(e) => setValues({ ...values, judul: e.target.value })} />
                        <Input
                            text="Author"
                            name="author"
                            type="text"
                            placeholder="Masukkan nama author"
                            onChange={(e) => setValues({ ...values, author: e.target.value })} />
                        <Input
                            text="Foto"
                            name="foto"
                            type="file"
                            placeholder="Masukkan URL foto artikel"
                            onChange={(e) => setValues({ ...values, foto: e.target.files[0], })} />
                        <Input
                            text="Tanggal"
                            name="tanggal"
                            type="date"
                            placeholder="Masukkan tanggal artikel"
                            onChange={(e) => setValues({ ...values, tanggal: e.target.value })} />
                        <Input
                            text="Isi"
                            name="isi"
                            type="desc"
                            placeholder="Masukkan isi artikel"
                            onChange={(e) => setValues({ ...values, isi: e.target.value })} />
                    </div>
                    <div className="mt-6 flex space-x-4 justify-end">
                        <Button
                            classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-red-500 hover:bg-red-700 text-white"
                            type="button"
                            name="batal">
                            <Link to="/data-artikel">Batal</Link>
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

export default AddArtikel