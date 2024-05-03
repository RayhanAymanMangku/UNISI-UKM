import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";


function SimpleRegistrationForm() {
    const [formData, setFormData] = useState({
        namaLengkap: "",
        prodi: "",
        nim: "",
        telepon: "",
    });

    const handleChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3060/api/data-anggota", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include", // Include credentials (cookies) in the request
            });

            if (response.ok) {
                console.log("Data Anggota berhasil ditambahkan!");
                // Reset form if needed
                setFormData({
                    namaLengkap: "",
                    prodi: "",
                    nim: "",
                    telepon: "",
                });
            } else {
                console.error("Gagal menambahkan data anggota", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Card color="transparent" shadow={false}>
            <div className="text-center mt-[150px] mb-[-150px]">
                <Typography className="text-blue-900" variant="h3">
                    Daftar Anggota Baru
                </Typography>
            </div>
            <form className="mb-2 w-80 max-w-screen-lg sm:w-96 mt-[180px] mx-auto h-[400px]" action="/add" method="post" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Nama Lengkap
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        className=" !border-t-blue-gray-200 focus:!border-blue-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => handleChange("namaLengkap", e.target.value)}
                        value={formData.namaLengkap}
                        name="namaLengkap"
                        id="namaLengkap"
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Prodi
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        className=" !border-t-blue-gray-200 focus:!border-blue-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => handleChange("prodi", e.target.value)}
                        value={formData.prodi}
                        name="prodi"
                        id="prodi"

                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        NIM
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        className=" !border-t-blue-gray-200 focus:!border-blue-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => handleChange("nim", e.target.value)}
                        value={formData.nim}
                        name="nim"
                        id="nim"
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        No Telepon
                    </Typography>
                    <Input
                        type="text"
                        size="lg"
                        className=" !border-t-blue-gray-200 focus:!border-blue-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => handleChange("telepon", e.target.value)}
                        value={formData.telepon}
                        name="telepon"
                        id="telepon"
                    />
                </div>
                <button type='submit' className="mt-8 w-full bg-blue-900 text-center text-white rounded-md py-[18px] px-[170px] hover:bg-blue-800 transition-colors duration-300" fullWidth>
                    Daftar
                </button>

            </form>
        </Card>
    );
}



export default function FormDaftarAnggota() {
    return (
        <>

            <SimpleRegistrationForm />
        </>
    )
}