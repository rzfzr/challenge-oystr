import { TablePagination } from "@mui/material"

export default function CustomPagination({
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage
}: {
    page: number,
    setPage: (page: number) => void,
    rowsPerPage: number,
    setRowsPerPage: (rowsPerPage: number) => void
}) {

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return <TablePagination
        style={{ margin: 'auto' }}
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[12, 24, 48]}
    />


}