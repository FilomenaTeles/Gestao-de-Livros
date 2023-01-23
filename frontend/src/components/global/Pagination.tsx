import ReactPaginate from "react-paginate";

export function Pagination(props: any){
   return(
    <ReactPaginate 
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'} 
        forcePage={props.forcePage}
        pageCount={props.pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={4}
        onPageChange={props.handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
  />
   )
}