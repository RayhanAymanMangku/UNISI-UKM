import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button, Input, Typography } from '@material-tailwind/react';
import { MapPinIcon } from '@heroicons/react/24/outline';

export const TabelPresensi = () => {
    const [anggota, setAnggota] = useState([]);
    // const [pertemuan, setPertemuan] = useState(0);

    // const handlePertemuan = (e) => {
    //     setPertemuan(e.target.value);
    // };

    useEffect(() => {
        fetchAnggota();
    }, []);

    const fetchAnggota = async () => {
        try {
            const response = await fetch('http://localhost:3060/api/data-anggota');
            if (response.ok) {
                const data = await response.json();
                setAnggota(data);
            } else {
                console.error('Gagal mengambil data anggota');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const TABLE_HEAD = ["No", "Nama Anggota", "Hadir", "Izin", "Alpa"];

    return (
        <div className="">
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Presensi Anggota UKM
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Data Presensi Anggota UKM
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col gap-2">
                            <Typography variant="small" color="blue-gray">
                                Pilih Tanggal
                            </Typography>
                            <Input type="date" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Typography variant="small" color="blue-gray">
                                Pertemuan Ke
                            </Typography>
                            <Input type="number" min={0} />
                        </div>
                        <div className="flex  flex-col gap-2">
                            <Typography variant="small" color="blue-gray">
                                Lokasi
                            </Typography>
                            <div className="flex gap-2">
                                <Input type="text" />
                                <MapPinIcon className="h-6 w-6 text-blue-gray-500 mt-2" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-4">
                        <table className='mt-4 w-full min-w-max table-auto text-left border border-gray-300'>
                            <thead>
                                {TABLE_HEAD.map((item, index) => (
                                    <th className="border border-blue-gray-100 bg-blue-gray-50/50 p-4 font-medium">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {item}
                                        </Typography>
                                    </th>
                                ))}
                            </thead>
                            <tbody>
                                {anggota.map((data, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                            <Typography

                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {index + 1}
                                            </Typography>
                                        </td>
                                        <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {data.namaLengkap}
                                            </Typography>
                                        </td>
                                        <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                            <input type="checkbox" />
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm">
                            Hapus
                        </Button>
                        <Button variant="outlined" size="sm">
                            Simpan
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};
