import React, { useState, useEffect } from 'react';
import TableKidspedia from '../components/TableKidspedia';
import SearchForm from '@/admin/components/SearchForm';
import { Link } from 'react-router-dom';
import Button from '@/admin/components/Button';
import axios from 'axios';
function ListKidspedia() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [searchKeyword]);

    const fetchData = () => {
        axios.get('http://localhost:3001/kidspedia/', {
        })
        axios.get('http://localhost:3001/kidspedia/search', {
            params: {
                keyword: searchKeyword
            }
        })
            .then(res => setData(res.data))
            .catch(err => { console.log(err); });
    };

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const handleDelete = (kidspediaId) => {
        axios.delete(`http://localhost:3001/kidspedia/delete/${kidspediaId}`)
            .then(() => {
                fetchData();
            })
            .catch(err => console.log(err));
    };

    const handleAdd = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h1 className="text-2xl font-primary font-medium mb-3 md:mb-0">
                    Data Kidspedia
                </h1>
                <div className="flex items-center space-x-5">
                    <SearchForm
                        placeholder="Masukkan Judul Kidspedia"
                        onSearch={handleSearch}
                    />
                    <Button
                        classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-sky-500 hover:bg-sky-700 text-white"
                        type="add"
                        name="tambah"
                    >
                        <Link to="/data-kidspedia/add">Tambah</Link>
                    </Button>
                </div>
            </div>
            <TableKidspedia data={data} onDelete={handleDelete} />
        </>
    );
}

export default ListKidspedia;