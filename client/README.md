import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button, Input, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import { CheckIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/20/solid';

const TABLE_HEAD = ['Tanggal', 'Keterangan', 'Jumlah', 'Bukti Nota', 'Aksi'];

const TabelDataKeuangan = () => {
const [data, setData] = useState([]);
const [inputVisible, setInputVisible] = useState(false);
const [inputValue, setInputValue] = useState({
tanggal: '',
keterangan: '',
jumlah: '',
file: null
});

    useEffect(() => {
        // Tarik data dari database saat komponen dimuat
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3060/api/data-keuangan");
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                console.error("Gagal mengambil data keuangan:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id, index) => {
        try {
            const response = await fetch(`/api/data-keuangan/${id}`, { // Menggunakan ID dalam URL
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                const newData = [...data];
                newData.splice(index, 1);
                setData(newData);
                console.log("Data berhasil dihapus!");
            } else {
                console.error("Gagal menghapus data:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleAddData = () => {
        setInputVisible(true);
    };

    const isValidDate = (dateString) => {
        const dateObject = new Date(dateString);
        return !isNaN(dateObject.getTime());
    };

    const handleSaveData = async () => {
        try {
            if (!inputValue.file) {
                console.error("Anda harus memilih sebuah file bukti nota.");
                return;
            }

            const [tahun, bulan, tanggal] = inputValue.tanggal.split('-');
            const formattedTanggal = `${tahun}-${bulan}-${tanggal.padStart(2, '0')}`;

            // Ubah format harga menjadi "Rp."
            const formattedJumlah = `Rp. ${inputValue.jumlah}`;

            const response = await fetch("http://localhost:3060/api/data-keuangan", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tanggal: formattedTanggal,
                    keterangan: inputValue.keterangan,
                    jumlah: formattedJumlah, // Menggunakan harga yang sudah diformat
                    file: inputValue.file
                }),
                credentials: "include",
            });

            if (response.ok) {
                console.log("Data Keuangan berhasil ditambahkan!");
                const newData = await response.json();
                setData([...data, newData]);
                setInputValue({
                    tanggal: '',
                    keterangan: '',
                    jumlah: '',
                    file: null
                });
                setInputVisible(false);
            } else {
                console.error("Gagal menambahkan data keuangan", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };



    // const handleSaveData = async () => {
    //     try {
    //         if (!inputValue.tanggal || !isValidDate(inputValue.tanggal)) {
    //             console.error("Tanggal tidak valid atau kosong.");
    //             return;
    //         }

    //         // Memisahkan tanggal, bulan, dan tahun dari string tanggal
    //         const [tahun, bulan, tanggal] = inputValue.tanggal.split('-');
    //         // Membentuk tanggal dengan format 'YYYY-MM-DD'
    //         const formattedTanggal = `${tahun}-${bulan}-${tanggal}`;

    //         const formData = new FormData();
    //         formData.append('tanggal', formattedTanggal);
    //         formData.append('keterangan', inputValue.keterangan);
    //         formData.append('jumlah', inputValue.jumlah);
    //         formData.append('file', inputValue.file);

    //         const response = await fetch("http://localhost:3060/api/data-keuangan", {
    //             method: "POST",
    //             body: formData,
    //             credentials: "include",
    //         });

    //         if (response.ok) {
    //             console.log("Data Keuangan berhasil ditambahkan!");
    //             const newData = await response.json();
    //             setData([...data, newData]);
    //             setInputValue({
    //                 tanggal: '',
    //                 keterangan: '',
    //                 jumlah: '',
    //                 file: null
    //             });
    //             setInputVisible(false);
    //         } else {
    //             console.error("Gagal menambahkan data keuangan", response.status, response.statusText);
    //             console.error(await response.text());
    //             console.log("Data yang dikirim:", formData)
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };






    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'file') {
            setInputValue({
                ...inputValue,
                file: files[0]
            });
        } else {
            setInputValue({
                ...inputValue,
                [name]: value
            });
        }
    };


    return (
        <>
            <div className="p-28">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Data Keuangan
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Data Keuangan UKM
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="w-full md:w-72 flex gap-2">
                                <Input
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                />
                                <Button color="lightBlue" ripple="light" className='h-10 w-24 bg-blue-500 flex justify-center items-center' onClick={handleAddData} >
                                    <p className=''>Tambah Data</p>
                                </Button>
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
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-4 border-b border-blue-gray-50">{item.tanggal}</td>
                                        <td className="p-4 border-b border-blue-gray-50">{item.keterangan}</td>
                                        <td className="p-4 border-b border-blue-gray-50">{item.jumlah}</td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <a href={item.file} target="_blank" rel="noopener noreferrer">Lihat Bukti</a>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Tooltip content="Hapus">
                                                <IconButton variant="text" onClick={() => handleDelete(index)}>
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                                {inputVisible && (
                                    <tr>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <input type="date" value={inputValue.tanggal} onChange={handleChange} name='tanggal' className='w-[150px] h-[40px] border rounded-md border-blue-gray-200 px-2' />
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Input value={inputValue.keterangan} onChange={handleChange} name="keterangan" />
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Input type="text" placeholder='Rp.' value={inputValue.jumlah} onChange={handleChange} name="jumlah" />
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Input type="file" onChange={handleChange} name="file" className='text-gray-700' />
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <div className="flex gap-2">
                                                <Tooltip content="Simpan">
                                                    <IconButton variant="text" onClick={handleSaveData}>
                                                        <CheckIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Batal">
                                                    <IconButton variant="text" onClick={() => handleDelete(item._id, index)}>
                                                        <TrashIcon className="h-4 w-4" />
                                                    </IconButton>

                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
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
            </div>
        </>
    );

};

export default TabelDataKeuangan;
