import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Typography, IconButton, CardFooter } from '@material-tailwind/react';

export const TabelEditPresensi = ({ onSelectChange }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [pertemuanList, setPertemuanList] = useState([]);
    const [presensiAnggota, setPresensiAnggota] = useState([]);
    const [showTable, setShowTable] = useState(false); // State untuk menentukan apakah tabel harus ditampilkan atau tidak

    useEffect(() => {
        fetchPertemuanList();
        fetchPresensiAnggota();
    }, []);

    const fetchPertemuanList = async () => {
        try {
            const response = await fetch('http://localhost:3060/api/data-presensi');
            if (response.ok) {
                const data = await response.json();
                const maxMeetingNumber = Math.max(...data.map(item => item.pertemuan));
                const meetingOptions = Array.from({ length: maxMeetingNumber }, (_, index) => index + 1);
                setPertemuanList(meetingOptions);
            } else {
                console.error('Failed to fetch meeting data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchPresensiAnggota = async () => {
        try {
            const response = await fetch('http://localhost:3060/api/data-presensi');
            if (response.ok) {
                const data = await response.json();
                setPresensiAnggota(data);
            } else {
                console.error('Failed to fetch attendance data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCloseTabelEdit = () => {
        onSelectChange(false);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        // Setelah mengklik tombol "Submit", tampilkan tabel
        setShowTable(true);

        // Filter data presensi berdasarkan pertemuan yang dipilih
        const selectedData = presensiAnggota.filter(item => item.pertemuan.toString() === selectedOption);
        console.log('Selected Data:', selectedData);
    };


    const handleSubmitEdit = async () => {
        try {
            // Kirim data presensi yang telah diubah ke server
            const response = await fetch('http://localhost:3060/api/data-presensi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(presensiAnggota), // Mengirim data presensiAnggota yang telah diubah ke server
            });

            // Periksa apakah permintaan berhasil
            if (response.ok) {
                console.log('Data presensi berhasil diperbarui');
            } else {
                console.error('Gagal memperbarui data presensi');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };





    const TABLE_HEAD = ['No', 'Nama Anggota', 'Hadir', 'Izin', 'Alpa'];

    return (
        <>
            <Card className='h-full w-full z-50'>
                <CardHeader floated={false} shadow={false} className='rounded-none'>
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Presensi Anggota UKM
                            </Typography>

                            <select
                                value={selectedOption}
                                onChange={handleSelectChange}
                                className="py-2 px-3 border rounded-md flex mt-2"
                            >
                                <option value="">Pilih Pertemuan</option>
                                {pertemuanList.map((pertemuan, index) => (
                                    <option key={index} value={pertemuan}>
                                        Pertemuan Ke {pertemuan}
                                    </option>
                                ))}
                            </select>
                            <button
                                type='button'
                                className='px-[20px] py-[6px] text-center bg-blue-900 rounded-md text-white mt-4 hover:bg-blue-800'
                                onClick={handleSubmit}
                            >
                                Cari
                            </button>
                        </div>

                        <IconButton onClick={handleCloseTabelEdit} className="modal-close cursor-pointer z-50">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </IconButton>
                    </div>
                </CardHeader>

                {showTable && ( // Tampilkan tabel hanya jika showTable bernilai true
                    <CardBody>
                        <div className="flex items-center justify-between gap-4 mt-4">
                            <table className='mt-4 w-full min-w-max table-auto text-left border border-gray-300'>
                                <thead>
                                    {TABLE_HEAD.map((item, index) => (
                                        <th key={index} className="border border-blue-gray-100 bg-blue-gray-50/50 p-4 font-medium">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                {item}
                                            </Typography>
                                        </th>
                                    ))}
                                </thead>
                                <tbody>
                                    {presensiAnggota
                                        .filter(data => data.pertemuan.toString() === selectedOption) // Filter data sesuai dengan pertemuan yang dipilih
                                        .map((data, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {index + 1}
                                                    </Typography>
                                                </td>
                                                <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {data.namaLengkap}
                                                    </Typography>
                                                </td>
                                                {/* Tampilkan status hadir, izin, alpa sesuai data */}
                                                <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                                    <input type="checkbox" checked={data.hadir} />
                                                </td>
                                                <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                                    <input type="checkbox" checked={data.izin} />
                                                </td>
                                                <td className="px-4 py-2 p-4 border border-blue-gray-50">
                                                    <input type="checkbox" checked={data.alpa} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>


                        <button
                            type='button'
                            className='px-[20px] py-[6px] text-center bg-blue-900 rounded-md text-white mt-4 hover:bg-blue-800'
                            onClick={handleSubmitEdit}
                        >
                            Simpan
                        </button>
                        <span className='ml-2 text-sm'>
                            Klik tombol "Simpan" untuk menyimpan perubahan yang telah dilakukan.
                        </span>


                    </CardBody>
                )}




            </Card>
        </>
    );
};
