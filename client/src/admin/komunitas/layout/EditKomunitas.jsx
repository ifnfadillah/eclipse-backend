import React, { useEffect, useState } from 'react';
import Layout from '../../layout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditKomunitas() {
    const { id } = useParams();
    const [values, setValues] = useState({
        nama: "",
        foto: "",
        deskripsi: "",
        link_daftar: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/komunitas/${id}`)
            .then(res => {
                console.log('Response:', res);
                const responseData = res.data;
                if (responseData) {
                    setValues({ ...values, nama: responseData.nama, foto: responseData.foto, deskripsi: responseData.deskripsi, link_daftar: responseData.link_daftar });
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
        formData.append('nama', values.nama);
        formData.append('foto', values.foto);
        formData.append('deskripsi', values.deskripsi);
        formData.append('link_daftar', values.link_daftar);

        axios.put(`http://localhost:3001/komunitas/update/${id}`, formData)
            .then(res => {
                console.log('Update success:', res);
                navigate('/data-komunitas');
            })
            .catch(err => {
                console.error('Update error:', err.response ? err.response.data : err.message);
            });
    };

    return (
        <Layout>
            <div className="py-8 px-4 md:mx-52 max-w-xl lg:py-13">
                <h2 className="mb-5 text-2xl font-semibold font-primary text-gray-900">Ubah Komunitas</h2>
                <form onSubmit={handleUpdate}><div className="grid gap-4 grid-cols-2 lg:grid-cols-6 sm:gap-6">
                    <Input
                        text="Nama Komunitas"
                        name="nama"
                        type="text"
                        placeholder="Masukkan nama komunitas"
                        value={values.nama}
                        onChange={(e) => setValues({ ...values, nama: e.target.value })} />
                    <Input
                        text="Foto"
                        name="foto"
                        type="file"
                        placeholder="Masukkan URL foto komunitas"
                        value={values.foto}
                        onChange={(e) => setValues({ ...values, foto: e.target.files[0], })} />
                    <Input
                        text="Deskripsi"
                        name="deskripsi"
                        type="desc"
                        placeholder="Masukkan deskripsi komunitas"
                        value={values.deskripsi}
                        onChange={(e) => setValues({ ...values, deskripsi: e.target.value })} />
                    <Input
                        text="Link Daftar"
                        name="link"
                        type="text"
                        placeholder="Masukkan link daftar komunitas"
                        value={values.link_daftar}
                        onChange={(e) => setValues({ ...values, link_daftar: e.target.value })} />
                </div>
                    <div className="mt-6 flex space-x-4 justify-end">
                        <Button
                            classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-red-500 hover:bg-red-700 text-white"
                            type="button"
                            name="batal">
                            <Link to="/data-komunitas">Batal</Link>
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
    );
}

export default EditKomunitas