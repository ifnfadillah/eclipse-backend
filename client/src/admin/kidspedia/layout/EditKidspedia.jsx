import React, { useState, useEffect } from 'react';
import Layout from '@/admin/layout';
import Button from '@/admin/components/Button';
import Input from '@/admin/components/Input';
import InputDropdown from '@/admin/components/InputDropdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditKidspedia() {
    const { id } = useParams();
    const [values, setValues] = useState({
        judul: "",
        kategori_id: "",
        foto: "",
        link: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/kidspedia/${id}`)
            .then(res => {
                console.log('Response:', res);
                const responseData = res.data;
                if (responseData) {
                    setValues({ ...values, judul: responseData.judul, kategori_id: responseData.kategori_id, foto: responseData.foto, link: responseData.link });
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
        formData.append('kategori_id', values.kategori_id);
        formData.append('foto', values.foto);
        formData.append('link', values.link);

        axios.put(`http://localhost:3001/kidspedia/update/${id}`, formData)
            .then(res => {
                console.log('Update success:', res);
                navigate('/data-kidspedia');
            })
            .catch(err => {
                console.error('Update error:', err.response ? err.response.data : err.message);
            });
    };

    return (
        <Layout>
            <div className="py-8 px-4 md:mx-52 max-w-xl  lg:py-13">
                <h2 className="mb-5 text-2xl font-semibold font-primary text-gray-900">Ubah Kidspedia</h2>
                <form onSubmit={handleUpdate}>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-6 sm:gap-6">
                        <Input
                            text="Judul Bahan Belajar"
                            name="judul"
                            type="text"
                            placeholder="Masukkan judul bahan belajar"
                            value={values.judul}
                            onChange={(e) => setValues({ ...values, judul: e.target.value })} />
                        <InputDropdown
                            name="category"
                            text="Kategori Bahan Belajar"
                            options={[
                                { value: "1", label: "Video Belajar" },
                                { value: "2", label: "Lembar Mewarnai" },
                            ]}
                            value={values.kategori_id}
                            onChange={(e) => setValues({ ...values, kategori_id: e.target.value })}
                        />
                        <Input
                            text="Foto"
                            name="foto"
                            type="file"
                            placeholder="Masukkan URL foto kidspedia"
                            value={values.foto}
                            onChange={(e) => setValues({ ...values, foto: e.target.files[0], })} />
                        <Input
                            text="Link Bahan Belajar"
                            name="link"
                            type="text"
                            placeholder="Masukkan link bahan belajar"
                            value={values.link}
                            onChange={(e) => setValues({ ...values, link: e.target.value })} />
                    </div>
                    <div className="mt-6 flex space-x-4 justify-end">
                        <Button
                            classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-red-500 hover:bg-red-700 text-white"
                            type="button"
                            name="batal">
                            <Link to="/data-kidspedia">Batal</Link>
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

export default EditKidspedia;
