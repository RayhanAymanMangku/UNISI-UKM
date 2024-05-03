import { Link } from "react-router-dom";

export default function DashboardContent() {
    return (
        <>
            <div className="w-full absolute mt-[180px] grid place-items-center">
                <h1 className="text-3xl text-blue-900 font-semibold">Badminton Unisi</h1>
                <div className="grid grid-cols-3 mx-auto gap-8 mt-8">
                    <div className="card-container">
                        <div className="card w-[200px] h-[200px]">
                            <Link to='/Presensi'>
                                <img src="https://s3.uii.ac.id/setting/aplikasi/perkuliahan.png" alt="" />
                            </Link>
                        </div>
                        <h4 className="text-2xl font-sans font-semibold text-yellow-700 mt-4 text-center mb-4">
                            Presensi
                        </h4>
                    </div>
                    <div className="card-container">
                        <div className="card w-[200px] h-[200px]">
                            <Link to='/DataKeuangan'>
                                <img src="https://s3.uii.ac.id/setting/aplikasi/tagihan.png" alt="" />
                            </Link>
                        </div>
                        <h4 className="text-2xl font-sans font-semibold text-yellow-700 mt-4 text-center mb-4">
                            Data Keuangan
                        </h4>
                    </div>
                    <div className="card-container">
                        <div className="card w-[200px] h-[200px]">
                            <Link to='/DaftarAnggota'>
                                <img src="https://s3.uii.ac.id/setting/aplikasi/survey.png" alt="" />
                            </Link>
                        </div>
                        <h4 className="text-2xl font-sans font-semibold text-yellow-700 mt-4 text-center mb-4">
                            Daftar Anggota
                        </h4>
                    </div>
                </div>
            </div>



        </>
    )
}