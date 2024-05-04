import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button, Input, Typography } from '@material-tailwind/react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { TabelEditPresensi } from './TabelEditPresensi';


export const TabelPresensi = () => {
    const [anggota, setAnggota] = useState([]);
    const [inputValue, setInputValue] = useState({
        tanggal: '',
        pertemuan: '',
        lokasi: '',
    });
    const [checkedStatusHadir, setCheckedStatusHadir] = useState({});
    const [checkedStatusIzin, setCheckedStatusIzin] = useState({});
    const [checkedStatusAlpa, setCheckedStatusAlpa] = useState({});
    const [showTabelEditPresensi, setShowTabelEditPresensi] = useState(false);
    const [showTabelPresensi, setShowTabelPresensi] = useState(true); // State to determine whether the table should be displayed or not

    useEffect(() => {
        fetchAnggota();
    }, []);

    const fetchAnggota = async () => {
        try {
            const response = await fetch('http://localhost:3060/api/data-anggota');
            if (response.ok) {
                const data = await response.json();
                // Initialize checked status for each member as false
                const initialCheckedStatusHadir = {};
                const initialCheckedStatusIzin = {};
                const initialCheckedStatusAlpa = {};
                data.forEach((_, index) => {
                    initialCheckedStatusHadir[index] = false;
                    initialCheckedStatusIzin[index] = false;
                    initialCheckedStatusAlpa[index] = false;
                });
                setAnggota(data);
                setCheckedStatusHadir(initialCheckedStatusHadir);
                setCheckedStatusIzin(initialCheckedStatusIzin);
                setCheckedStatusAlpa(initialCheckedStatusAlpa);
            } else {
                console.error('Gagal mengambil data anggota');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const savePresensi = async () => {
        try {
            const presensiData = anggota.map((data, index) => ({
                // id: data.id,
                namaLengkap: data.namaLengkap,
                hadir: checkedStatusHadir[index] ? 1 : 0,
                izin: checkedStatusIzin[index] ? 1 : 0,
                alpa: checkedStatusAlpa[index] ? 1 : 0,
                tanggal: formattedTanggal,
                pertemuan: inputValue.pertemuan,
                lokasi: inputValue.lokasi
            }));

            const response = await fetch('http://localhost:3060/api/data-presensi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(presensiData)
            });

            if (response.ok) {
                console.log('Data presensi berhasil disimpan.');
            } else {
                console.error('Gagal menyimpan data presensi.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleCheckboxChange = (index, type) => {
        switch (type) {
            case 'hadir':
                setCheckedStatusHadir(prevCheckedStatus => ({
                    ...prevCheckedStatus,
                    [index]: !prevCheckedStatus[index]
                }));
                break;
            case 'izin':
                setCheckedStatusIzin(prevCheckedStatus => ({
                    ...prevCheckedStatus,
                    [index]: !prevCheckedStatus[index]
                }));
                break;
            case 'alpa':
                setCheckedStatusAlpa(prevCheckedStatus => ({
                    ...prevCheckedStatus,
                    [index]: !prevCheckedStatus[index]
                }));
                break;
            default:
                break;
        }
    };

    const handleResetValue = () => {
        setInputValue({
            tanggal: '',
            pertemuan: '',
            lokasi: '',
        });
    };

    const handleShowTabelEditPresensi = () => {
        // Code to show TabelEditPresensi component
        setShowTabelEditPresensi(!showTabelEditPresensi);
        setShowTabelPresensi(false);

    };




    const TABLE_HEAD = ["No", "Nama Anggota", "Hadir", "Izin", "Alpa"];
    const formattedTanggal = inputValue.tanggal ? inputValue.tanggal.replace(/-/g, '/') : '';

    return (
        <div className="">
            {showTabelPresensi && (
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Presensi Anggota UKM
                                </Typography>

                                <Typography color="blue" className="mt-1 font-normal" onClick={handleShowTabelEditPresensi}>
                                    <button>
                                        Lihat data presensi anggota UKM
                                    </button>
                                </Typography>

                            </div>
                        </div>
                    </CardHeader>
                    {showTabelEditPresensi && <TabelEditPresensi />} {/* Tampilkan TabelEditPresensi jika showTabelEditPresensi true */}


                    <CardBody className="">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col gap-2">
                                <Typography variant="small" color="blue-gray">
                                    Pilih Tanggal
                                </Typography>
                                <Input type="date" value={inputValue.tanggal} name='tanggal' onChange={(e) => setInputValue({ ...inputValue, tanggal: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Typography variant="small" color="blue-gray">
                                    Pertemuan Ke
                                </Typography>
                                <Input type="number" min={0} value={inputValue.pertemuan} name='pertemuan' onChange={(e) => setInputValue({ ...inputValue, pertemuan: e.target.value })} />
                            </div>
                            <div className="flex  flex-col gap-2">
                                <Typography variant="small" color="blue-gray">
                                    Lokasi
                                </Typography>
                                <div className="flex gap-2">
                                    <Input type="text" value={inputValue.lokasi} name='lokasi' onChange={(e) => setInputValue({ ...inputValue, lokasi: e.target.value })} />
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
                                                <input
                                                    type="checkbox"
                                                    checked={checkedStatusHadir[index]}
                                                    onChange={() => handleCheckboxChange(index, 'hadir')}

                                                />
                                            </td>
                                            <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedStatusIzin[index]}
                                                    onChange={() => handleCheckboxChange(index, 'izin')}

                                                />
                                            </td>
                                            <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedStatusAlpa[index]}
                                                    onChange={() => handleCheckboxChange(index, 'alpa')}

                                                />
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
                            <Button variant="outlined" size="sm" onClick={savePresensi}>
                                Simpan
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}

            {showTabelEditPresensi && (
                <TabelEditPresensi onSelectChange={setShowTabelEditPresensi} />
            )}
        </div>
    );
};

export default TabelPresensi;
