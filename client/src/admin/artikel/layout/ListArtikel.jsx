import React, { useState, useEffect } from 'react';
import TableArtikel from '../components/TableArtikel';
import SearchForm from '@/admin/components/SearchForm';
import { Link, useLocation } from 'react-router-dom';
import Button from '@/admin/components/Button';
import axios from 'axios';
import Alert from '@/admin/components/Alert';

function ListArtikel() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [data, setData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const location = useLocation();

    useEffect(() => {
        fetchData();
        if (location.state && location.state.alertMessage) {
            setAlertMessage(location.state.alertMessage);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
    }, [searchKeyword, location.state]);

    const fetchData = () => {
        axios.get('http://localhost:3001/artikel/search', {
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

    const handleDelete = (artikelId, artikelJudul) => {
        axios.delete(`http://localhost:3001/artikel/delete/${artikelId}`)
            .then(() => {
                fetchData();
                setShowAlert(true);
                setAlertMessage(`Berhasil menghapus ${artikelJudul}`);
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <h1 className="text-2xl font-primary font-medium mb-3 md:mb-0">
                    Data Artikel
                </h1>
                <div className="flex items-center space-x-5">
                    <SearchForm
                        placeholder="Masukkan Judul Artikel"
                        onSearch={handleSearch}
                    />
                    <Button
                        classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-sky-500 hover:bg-sky-700 text-white"
                        type="add"
                        name="tambah"
                    >
                        <Link to="/data-artikel/add">Tambah</Link>
                    </Button>
                </div>
            </div>
            {showAlert && <Alert message={alertMessage} />}
            <TableArtikel data={data} onDelete={handleDelete} />
        </>
    );
}

export default ListArtikel;