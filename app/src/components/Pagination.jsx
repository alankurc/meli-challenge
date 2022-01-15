import React from "react";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const Paginator = ({alertsPerPage, totalAlerts, paginate}) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalAlerts / alertsPerPage); i++){
        pageNumber.push(i);
    }

    return (
        <Pagination className="mt-3">
            {pageNumber.map(number => (
                <PaginationItem key={number}>
                    <PaginationLink onClick={() => paginate(number)}>{number}</PaginationLink>
                </PaginationItem>
            ))}
        </Pagination>
    );
}

export default Paginator;