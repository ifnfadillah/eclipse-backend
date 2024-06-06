import React, { useState, useEffect } from 'react';
import Layout from '@/admin/layout';
import Button from '@/admin/components/Button';
import Input from '@/admin/components/Input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditArtikel() {
    const { id } = useParams();
    const [values, setValues] = useState({
        judul: "",
        author: "",
        foto: "",
        tanggal: "",
        isi: "",
    });
    useEffect(() => {
        axios.get(`http://localhost:3001/artikel/${id}`)
            .then(res => {
                console.log('Response:', res);
                const responseData = res.data;
                if (responseData) {
                    setValues({ ...values, judul: responseData.judul, author: responseData.author, foto: responseData.foto, tanggal: responseData.tanggal, isi: responseData.isi });
                } else {
                    console.error('Data not found');
                }
            })
            .catch(err => {
                console.error('Error:', err.response ? err.response.data : err.message);
            });
    }, [id]);

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('judul', values.judul);
        formData.append('author', values.author);
        formData.append('fotourl', values.foto);
        formData.append('tanggal', values.tanggal);
        formData.append('isi', values.isi);

        axios.put(`http://localhost:3001/artikel/update/${id}`, formData)
            .then(res => {
                console.log('Update success:', res);
                navigate('/data-artikel', { state: { alertMessage: `Berhasil mengubah ${values.judul}` } });
            })
            .catch(err => {
                console.error('Update error:', err.response ? err.response.data : err.message);
            });
    };
    return (
        <Layout>
            <div className="py-8 px-4 md:mx-52 max-w-xl  lg:py-13">
                <h2 className="mb-5 text-2xl font-semibold font-primary text-gray-900">Ubah Artikel</h2>
                <form onSubmit={handleUpdate}>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-6 sm:gap-6">
                        <Input
                            text="Judul Artikel"
                            name="judul"
                            type="text"
                            placeholder="Masukkan judul artikel"
                            value={values.judul}
                            onChange={(e) => setValues({ ...values, judul: e.target.value })} />
                        <Input
                            text="Author"
                            name="author"
                            type="text"
                            placeholder="Masukkan nama author"
                            value={values.author}
                            onChange={(e) => setValues({ ...values, author: e.target.value })} />
                        <Input
                            text="Foto"
                            name="foto"
                            type="file"
                            placeholder="Masukkan URL foto artikel"
                            value={values.foto}
                            onChange={(e) => setValues({ ...values, foto: e.target.files[0], })} />
                        <Input
                            text="Tanggal"
                            name="tanggal"
                            type="date"
                            placeholder="Masukkan tanggal artikel"
                            value={values.tanggal}
                            onChange={(e) => setValues({ ...values, tanggal: e.target.value })} />
                        <Input
                            text="Isi"
                            name="isi"
                            type="desc"
                            placeholder="Masukkan isi artikel"
                            value={values.isi}
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
                            name="update">
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default EditArtikel