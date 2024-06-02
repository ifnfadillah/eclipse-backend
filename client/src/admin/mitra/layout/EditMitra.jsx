import React, { useEffect, useState } from 'react';
import Layout from '../../layout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function EditMitra() {
    const { id } = useParams();
    const [values, setValues] = useState({
        nama: "",
        logo: "",
        kontak: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/mitra/${id}`)
            .then(res => {
                console.log('Response:', res);
                const responseData = res.data;
                if (responseData) {
                    setValues({ ...values, nama: responseData.nama, logo: responseData.logo, kontak: responseData.kontak });
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
        formData.append('kontak', values.kontak);
        formData.append('logo', values.logo);

        axios.put(`http://localhost:3001/mitra/update/${id}`, formData)
            .then(res => {
                console.log('Update success:', res);
                navigate('/data-mitra');
            })
            .catch(err => {
                console.error('Update error:', err.response ? err.response.data : err.message);
            });
    };

    return (
        <Layout>
            <div className="py-8 px-4 md:mx-52 max-w-xl lg:py-13">
                <h2 className="mb-5 text-2xl font-semibold font-primary text-gray-900">Ubah Mitra</h2>
                <form onSubmit={handleUpdate}>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-6 sm:gap-6">
                        <Input
                            text="Nama Mitra"
                            name="nama"
                            type="text"
                            placeholder="Masukkan nama mitra"
                            value={values.nama}
                            onChange={(e) => setValues({ ...values, nama: e.target.value })} />
                        <Input
                            text="Logo Mitra"
                            name="logo"
                            type="file"
                            placeholder="Masukkan URL logo mitra"
                            value={values.logo}
                            onChange={(e) => setValues({ ...values, logo: e.target.files[0] })} />
                        <Input
                            text="Kontak Mitra"
                            name="kontak"
                            type="text"
                            placeholder="Masukkan kontak mitra"
                            value={values.kontak}
                            onChange={(e) => setValues({ ...values, kontak: e.target.value })} />
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
                            name="update">
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default EditMitra;
