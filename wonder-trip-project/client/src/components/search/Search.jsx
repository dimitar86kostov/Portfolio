import React from "react";
import { Input, Spinner, IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid"; // или друга икона за X

export default function Search({ searching, loading }) {
    const [searchValue, setSearchValue] = React.useState("");
    const hasTypedRef = React.useRef(false);

    React.useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (hasTypedRef.current || searchValue !== "") {
                searching(searchValue);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchValue]);

    const handleChange = (e) => {
        if (!hasTypedRef.current) hasTypedRef.current = true;
        setSearchValue(e.target.value);
    };

    const handleClear = () => {
        setSearchValue("");
        searching(""); // изчистване
    };

    return (
        <div className="relative w-full">
            <Input
                type="text"
                label="Search resort..."
                value={searchValue}
                onChange={handleChange}
                className="pr-16"
                containerProps={{ className: "min-w-0" }}
            />
            
            {searchValue && !loading && (
                <IconButton
                    size="sm"
                    variant="text"
                    onClick={handleClear}
                    className="!absolute right-2 top-[6px] z-10"
                >
                    <XMarkIcon className="h-4 w-4 text-gray-600" />
                </IconButton>
            )}

            {loading && (
                <div className="absolute right-2 top-[10px]">
                    <Spinner className="h-5 w-5 text-gray-700" />
                </div>
            )}
        </div>
    );
}
