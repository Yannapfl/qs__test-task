import './Pagination.css';
import { useState } from "react";
import IconButton from '../../components/IconButton/IconButton';

export default function Pagination({ countVisibleRows, dataLength, onStartIndexChange }) {
    const [startIndex, setStartIndex] = useState(0);
    const totalPages = Math.ceil(dataLength / countVisibleRows);
    const currentPage = Math.ceil((startIndex + 1) / countVisibleRows);
    const startIndexLastPage = Math.ceil(((totalPages - 1) * countVisibleRows));

    const nextSlide = () => {
        const newIndex = startIndex + countVisibleRows;
        if (newIndex < dataLength) {
            setStartIndex(newIndex);
            onStartIndexChange(newIndex);
        }
    };

    const prevSlide = () => {
        const newIndex = startIndex - countVisibleRows;
        if (newIndex >= 0) {
            setStartIndex(newIndex);
            onStartIndexChange(newIndex);
        }
    };

    const firstSlide = () => {
        setStartIndex(0);
        onStartIndexChange(0);
    };

    const lastSlide = () => {
        setStartIndex(startIndexLastPage);
        onStartIndexChange(startIndexLastPage);
    };

    const goToPage = (pageNumber) => {
        const newIndex = (pageNumber - 1) * countVisibleRows;
        if (newIndex >= 0 && newIndex < dataLength) {
            setStartIndex(newIndex);
            onStartIndexChange(newIndex);
        }
    };

    const getPageButtons = () => {
        let pageButtons = [];

        if (totalPages <= 2) {
            if (totalPages === 2) {
                return pageButtons = [1, 2]
            }
            return pageButtons = [totalPages]
        }

        if (totalPages === 3) {
            return pageButtons = [1, 2, 3]
        }
        
        if (currentPage === 1) {
           pageButtons = [1, 2, '...', totalPages];
        }

        if ((currentPage === totalPages) || (currentPage === (totalPages - 1)) || (currentPage === totalPages - 2)) {
            pageButtons = ['...', totalPages - 2, totalPages - 1, totalPages];
            return pageButtons;
        }

        if (currentPage > 1)  {
            pageButtons = [currentPage, currentPage + 1, '...', totalPages ];
            return pageButtons;
        }

        return pageButtons;
    };

    return (
        <div className='btn-group'>
            <IconButton 
                direction='first'
                onClick={firstSlide}
                disable={ startIndex < countVisibleRows }
            />
            <IconButton 
                direction='left'
                onClick={prevSlide}
                disable={ startIndex < countVisibleRows }
            />
            <div className='btn-numbers'>
                {getPageButtons().map((page, index) => (
                <button 
                        className={ (page === currentPage) ? 'page-active': 'page'} 
                        key={index} 
                        onClick={() => page !== '...' && goToPage(page)}
                    >{page}</button>               
                ))}
            </div>
            <IconButton 
                direction='right'
                onClick={nextSlide}
                disable={ startIndex === startIndexLastPage }
            />
            <IconButton 
                direction='last'
                onClick={lastSlide}
                disable={ startIndex === startIndexLastPage }
            />
        </div>
    )
}