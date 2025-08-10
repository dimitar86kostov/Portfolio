import React from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";

import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const profileMenuItems = [
    { label: "My Profile", icon: UserCircleIcon, to: "/profile" },
    { label: "Edit Profile", icon: Cog6ToothIcon },
    { label: "Inbox", icon: InboxArrowDownIcon },
    { label: "Help", icon: LifebuoyIcon },
    { label: "Sign Out", icon: PowerIcon, to: "/logout", danger: true },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="profile avatar"
                        className="border border-gray-900 p-0.5"
                        src="https://plus.unsplash.com/premium_photo-1738590017220-5820f49608cc?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">

                {profileMenuItems.map(({ label, icon, to, danger }) => {
                    const handleClick = () => {
                        closeMenu();
                        if (label === "Sign Out") {
                            logout();
                            navigate("/login");
                        }
                    };

                    return (
                        <MenuItem
                            key={label}
                            onClick={handleClick}
                            className={`flex items-center gap-2 rounded ${danger ? "hover:bg-red-500/10 focus:bg-red-500/10 text-red-500" : ""
                                }`}
                            as={to && label !== "Sign Out" ? Link : "div"}
                            to={to && label !== "Sign Out" ? to : undefined}
                        >
                            {React.createElement(icon, { className: "h-4 w-4" })}
                            <Typography as="span" variant="small" className="font-normal">
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

export default function Header() {
    const { isAuthenticated, email } = useAuthContext();
    const [openNav, setOpenNav] = React.useState(false);


    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 960) setOpenNav(false);
        });
    }, []);

    return (
        <Navbar
            fullWidth
            className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-screen-xl px-6 py-3 bg-white/40 backdrop-blur-md shadow-md rounded-b-xl"
        >
            <div className="flex items-center justify-between text-blue-gray-900">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img
                        src="https://i.ibb.co/R4bfh0Wc/triplogo-vector-JPEG.jpg"
                        alt="Trip Journal Logo"
                        className="w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-md"

                    />
                </Link>


                {/* Desktop nav */}
                <div className="hidden lg:flex items-center gap-6">
                    <Link
                        to="/catalog"
                        className="text-sm font-medium hover:text-blue-500 transition-colors"
                    >
                        Catalog
                    </Link>
                    {isAuthenticated && (
                        <Link
                            to="/create"
                            className="text-sm font-medium hover:text-blue-500 transition-colors"
                        >
                            Create
                        </Link>
                    )}
                    {!isAuthenticated && (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-medium hover:text-blue-500 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-sm font-medium hover:text-blue-500 transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                    {isAuthenticated && <ProfileMenu />}
                </div>

                {/* Mobile menu button */}
                <IconButton
                    variant="text"
                    className="ml-auto lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
            </div>

            {/* Mobile nav */}
            <MobileNav open={openNav} className="mt-4">
                <div className="flex flex-col gap-2">
                    <Link to="/catalog">Catalog</Link>
                    {isAuthenticated && <Link to="/create">Create</Link>}
                    {!isAuthenticated && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                    {isAuthenticated && <ProfileMenu />}
                </div>
            </MobileNav>
        </Navbar>
    );
}

