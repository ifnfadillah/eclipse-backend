import React, { useState } from 'react';
import Button from '@/admin/components/Button';
import PopupDelete from '@/admin/components/pop-up/PopupDelete';
import Pagination from '@/admin/components/Pagination';
import { Link } from 'react-router-dom';

const TableKidspedia = ({ data, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleDelete = (kidspediaId, kidspediaJudul) => {
        setItemToDelete({ id: kidspediaId, judul: kidspediaJudul });
        setIsOpen(true);
    };
    const handleConfirm = () => {
        setIsOpen(false);
        if (itemToDelete !== null) {
            onDelete(itemToDelete.id, itemToDelete.judul);
            setItemToDelete(null);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <>
            <div className="bg-white relative shadow-sm sm:rounded-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto" id="searchResults">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-sm text-white font-primary font-medium bg-sky-700">
                            <tr>
                                <th scope="col" className="px-10 py-6 ">No</th>
                                <th scope="col" className="px-12 py-6 ">Judul Bahan Belajar</th>
                                <th scope="col" className="px-12 py-6 ">Kategori</th>
                                <th scope="col" className="px-12 py-6 ">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center p-6 text-gray-500">Tidak ada data yang sesuai</td>
                                </tr>
                            ) : (
                                renderData().map((kidspedia, index) => (
                                    <tr className="border border-gray-200" key={index}>
                                        <td className="font-primary text-xs font-regular text-gray-800 px-10 py-4 max-w-xs truncate">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td className="font-primary text-xs font-regular text-gray-800 px-12 py-4 max-w-xs truncate">{kidspedia.judul}</td>
                                        <td className="font-primary text-xs font-regular text-gray-800 px-12 py-4 max-w-xs truncate">
                                            {kidspedia.kategori_nama}
                                        </td>
                                        <td className="px-12 py-3 flex items-center justify-end space-x-4">
                                            <Link to={`/data-kidspedia/edit/${kidspedia.id}`}>
                                                <Button
                                                    classname="h-9 w-20 font-secondary text-xs rounded-3xl font-medium bg-amber-300 hover:bg-amber-400 text-black"
                                                    type="button"
                                                >
                                                    Ubah
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => handleDelete(kidspedia.id, kidspedia.judul)}
                                                classname="h-9 w-20 font-secondary text-xs rounded-3xl font-medium bg-red-500 hover:bg-red-600 text-white"
                                                type="button"
                                            >
                                                Hapus
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {data.length > 0 && (
                <div className="flex justify-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
            {isOpen && (
                <PopupDelete
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    itemName={data.find(kidspedia => kidspedia.id === itemToDelete?.id)?.judul}
                />
            )}
        </>
    );
}

export default TableKidspedia;
