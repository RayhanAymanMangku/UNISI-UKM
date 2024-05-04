import React from 'react'
import { Link } from 'react-router-dom'
import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import { MagnifyingGlassIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Tooltip, IconButton } from "@material-tailwind/react";

import { useEffect } from "react";


import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,

    CardFooter,
} from "@material-tailwind/react";
import { TabelPresensi } from './TabelPresensi';
export const PresensiMenu = () => {
    const [selectedOption, setSelectedOption] = useState("presensi");
    const [buttonClicked, setButtonClicked] = useState(false);
    const [dataAnggota, setDataAnggota] = useState([]);
    const [dataPresensi, setDataPresensi] = useState([]);

    useEffect(() => {
        if (buttonClicked && selectedOption === "dataAnggota") {
            fetch("http://localhost:3060/api/data-anggota")
                .then((response) => response.json())
                .then((data) => setDataAnggota(data))
                .catch((error) => console.error("Error fetching data anggota:", error));
        } else if (buttonClicked && selectedOption === "presensi") {
            // Fetch data presensi here if needed
        }
    }, [buttonClicked, selectedOption]);

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value); // Mengubah nilai opsi yang dipilih menjadi string
        setButtonClicked(false); // Reset buttonClicked when option is changed
    };

    const handleButtonClick = () => {
        setButtonClicked(true);
    };

    return (
        <div className="w-full absolute mt-[180px] grid place-items-center">
            <h1 className="text-3xl text-blue-900 font-semibold mb-8">
                Badminton Unisi <span className='text-yellow-600'>Presensi</span>
            </h1>
            <SelectDefault selectedOption={selectedOption} onSelectChange={handleSelectChange} />
            <button
                type='button'
                className='px-[20px] py-[6px] text-center bg-blue-900 rounded-md text-white mt-4 hover:bg-blue-800'
                onClick={handleButtonClick}
            >
                Cari
            </button>
            {buttonClicked && selectedOption === "dataAnggota" && (
                <div className='mx-auto gap-8 mt-12'>
                    <MembersTable data={dataAnggota} setData={setDataAnggota} />
                </div>
            )}
            {buttonClicked && selectedOption === "presensi" && (
                <div className='mx-auto gap-8 mt-12'>
                    <TabelPresensi dataPresensi={dataPresensi} setDataPresensi={setDataPresensi} />
                </div>
            )}
        </div>
    );
};

function SelectDefault({ selectedOption, onSelectChange }) {
    return (
        <div className="w-72 select-wrapper">
            <select value={selectedOption} onChange={onSelectChange} className="py-2 px-3 border rounded-md flex mx-auto text-gray-700">
                <option value="presensi" className="text-sm ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block align-middle">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" style={{ margin: '0 0.5rem' }}></path>
                    </svg>
                    Presensi Anggota
                </option>

                <option value="dataAnggota" className="text-sm ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline-block align-middle mx-2">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    Data Anggota
                </option>
            </select>
        </div>



    );
}

const TABLE_HEAD = ["Anggota", "NIM", "Telepon", "Aksi"];


function MembersTable({ data, setData }) {

    const [deletingRowIndex, setDeletingRowIndex] = useState(null);

    if (!Array.isArray(data)) {
        // Handle jika data bukan array
        console.error("Data is not an array:", data);
        return null; // Atau tampilkan pesan kesalahan atau komponen lain yang sesuai
    }

    const handleDelete = async (index) => {
        setDeletingRowIndex(index);

        const idToDelete = data[index].id;

        try {
            // Panggil API untuk menghapus data dari database
            await fetch(`http://localhost:3060/api/data-anggota/${idToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Hapus data dari array lokal
            const newData = [...data];
            newData.splice(index, 1);
            setDeletingRowIndex(null);
            setData(newData);

            console.log(`Data dengan id ${idToDelete} berhasil dihapus.`);
        } catch (error) {
            console.error('Error deleting data:', error);
            setDeletingRowIndex(null);
        }
    };

    return (
        <Card className="h-full w-full mt-4">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            List Anggota
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Lihat Informasi Anggota UKM
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="">
                <table className="mt-4 w-full min-w-max table-auto text-left border border-gray-300">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(
                            ({ namaLengkap, prodi, nim, telepon }, index) => {
                                const isLast = index === data.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={namaLengkap}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {namaLengkap}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {prodi}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {nim}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {telepon}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-4">
                                                <Tooltip content="Edit">
                                                    <IconButton variant="text">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Hapus">
                                                    <IconButton variant="text">
                                                        <TrashIcon className="h-4 w-4" onClick={() => handleDelete(index)} />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

