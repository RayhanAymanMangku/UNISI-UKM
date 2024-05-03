import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Collapse } from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function NavList() {
    return (
        <div className="ml-auto">
            {/* <img src="/assets/logoukm.png" alt="" className="w-[100px] h-[100px]" /> */}
        </div>

    );
}

function DashboardNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const [scrolled, setIsScrolled] = useState(false);

    const handleToggleNav = () => {
        setOpenNav(!openNav);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleWindowResize = () => {
        window.innerWidth >= 960 && setOpenNav(false);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <nav
            className={`fixed z-50 w-full mx-auto px-4 py-4 rounded-none border border-white shadow-none bg-gray-300 transition-all mt-[-1px]`}
        >
            <div className="grid">
                <div className="col-span-1">
                    <img src="/assets/logo.webp" alt="" className="w-[140px] h-[50px] ml-24" />
                    {/* <img src="/assets/logoukm.png" alt="" className='w-[60px] h-[60px] float-right mt-[-50px] rounded-full mr-24' /> */}
                    <img src="/assets/logoukm.png" alt="" className='w-[60px] h-[60px] mt-[-55px] rounded-full ml-[260px]' />

                </div>
                <div className="lg:hidden col-span-2 mr-24 mt-2 text-right">
                    <IconButton
                        variant="text"
                        className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent text-white"
                        ripple={false}
                        onClick={handleToggleNav}
                        id="navbarToggle"
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
            </div>

            <Collapse in={openNav}>
                <NavList />
            </Collapse>
        </nav>
    );
}

export default function NavbarComponents() {
    return (
        <>
            <DashboardNavbar />
        </>
    );
}
