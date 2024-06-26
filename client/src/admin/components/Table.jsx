import React, { useState } from 'react';
import Button from "./Button";
import PopupDelete from './pop-up/PopupDelete';
import Pagination from "./Pagination";
import { Link } from 'react-router-dom';

const Table = ({ headers, data, setData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = (index, itemName) => {
        setItemToDelete(index);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        setIsOpen(false);
        if (itemToDelete !== null) {
            const newData = data.filter((_, index) => index !== itemToDelete);
            setData(newData);
            console.log('Item dihapus', newData);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    return (
        <>
            <div className="bg-white relative shadow-sm sm:rounded-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto" id="searchResults">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-sm text-white font-primary font-medium bg-sky-700">
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className={`${header.className}`}
                                    >
                                        {header.label}
                                    </th>
                                ))}
                                <th scope="col" className="lg:px-12 lg:py-6 px-6 py-3">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={headers.length + 1} className="text-center p-6 text-gray-500">Belum ada data</td>
                                </tr>
                            ) : (
                                renderData().map((row, index) => (
                                    <tr className="border border-gray-200" key={index}>
                                        {row.map((cell, cellIndex) => (
                                            <td
                                                key={cellIndex}
                                                className={`font-primary text-xs font-regular text-gray-800 px-12 py-4 max-w-xs truncate ${headers[cellIndex].className}`}
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                        <td className="px-12 py-3 flex items-center justify-end space-x-4">
                                            <Button
                                                classname="h-9 w-20 font-secondary text-xs rounded-3xl font-medium bg-amber-300 hover:bg-amber-400 text-black"
                                                type="button"
                                            >
                                                <Link to={`${editPath}/${row[0]}`}>
                                                    Ubah
                                                </Link>
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(index, row[1])}
                                                classname="h-9 w-20 font-secondary text-xs rounded-3xl font-medium bg-red-500 hover:bg-red-700 text-white"
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
                />
            )}
        </>
    );
};

export default Table;
