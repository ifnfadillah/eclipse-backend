import Button from "./Button";
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

const SearchForm = (props) => {
    const { placeholder, onSearch } = props;
    const [keyword, setKeyword] = useState("");

    const debouncedSearch = useCallback(debounce(onSearch, 500), []);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setKeyword(value);
        debouncedSearch(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(keyword);
    };

    return (
        <div className="w-full md:w-72">
            <form onSubmit={handleSubmit} className="flex items-center" method="POST">
                <div className="relative flex w-full space-x-5">
                    <input
                        type="text"
                        name="keyword"
                        id="simple-search"
                        className="bg-white border border-gray-500 text-gray-900 text-xs font-secondary rounded-lg focus:border-sky-500 block w-full h-10 p-2.5"
                        placeholder={placeholder}
                        value={keyword}
                        onChange={handleInputChange}
                    />
                    <Button
                        classname="h-10 px-6 font-secondary text-sm rounded-md font-medium bg-green-500 hover:bg-green-600 text-white"
                        type="submit"
                        name="search"
                    >
                        Cari
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SearchForm;
