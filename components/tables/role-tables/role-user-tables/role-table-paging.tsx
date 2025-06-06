import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
type PaginatorProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    showPreviousNext: boolean;
}

export default function Paginator({
    currentPage,
    totalPages,
    onPageChange,
    showPreviousNext,
}: PaginatorProps) {

    return (
        <Pagination>
            <PaginationContent>
                {showPreviousNext && totalPages ? (
                    <PaginationItem className={currentPage - 1 < 1 ? "invisible" : ""}>
                        <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                        />
                    </PaginationItem>
                ) : null}
                {generatePaginationLinks(currentPage, totalPages, onPageChange)}
                {showPreviousNext && totalPages ? (
                    <PaginationItem className={currentPage > totalPages - 1 ? "invisible" : ""}>
                        <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                ) : null}
            </PaginationContent>
        </Pagination>
    )
}


const generatePaginationLinks = (
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
) => {
    const pages: JSX.Element[] = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => onPageChange(i)}
                        isActive={i === currentPage}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
    } else {
        for (let i = 1; i <= 2; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => onPageChange(i)}
                        isActive={i === currentPage}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        if (2 < currentPage && currentPage < totalPages - 1) {
            pages.push(<PaginationEllipsis />)
            pages.push(
                <PaginationItem key={currentPage}>
                    <PaginationLink
                        onClick={() => onPageChange(currentPage)}
                        isActive={true}
                    >
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        pages.push(<PaginationEllipsis />)
        for (let i = totalPages - 1; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => onPageChange(i)}
                        isActive={i === currentPage}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
    }
    return pages;
};