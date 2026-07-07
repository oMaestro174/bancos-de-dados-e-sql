// src/components/TabelaAlunos.jsx
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "nome",
    label: "Nome",
    numeric: false,
    disablePadding: false,
    hidden: null,
  },
  {
    id: "email",
    label: "E-mail",
    numeric: false,
    disablePadding: false,
    hidden: { xs: "none", md: "table-cell" },
  },
  {
    id: "nome_turma",
    label: "Turma",
    numeric: false,
    disablePadding: false,
    hidden: { xs: "none", sm: "table-cell" },
  },
  {
    id: "turno",
    label: "Turno",
    numeric: false,
    disablePadding: false,
    hidden: { xs: "none", md: "table-cell" },
  },
  {
    id: "data_matricula",
    label: "Matrícula",
    numeric: false,
    disablePadding: false,
    hidden: { xs: "none", sm: "table-cell" },
  },
  {
    id: "media",
    label: "Média",
    numeric: true,
    disablePadding: false,
    hidden: null,
  },
];

function CabecalhoTabela({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={headCell.hidden ? { display: headCell.hidden } : {}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc"
                    ? "ordenado decrescente"
                    : "ordenado crescente"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

CabecalhoTabela.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default function TabelaAlunos({ alunos }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nome");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - alunos.length) : 0;

  const linhasVisiveis = React.useMemo(
    () =>
      [...alunos]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [alunos, order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: 2, overflow: "hidden" }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div">
            Alunos matriculados
          </Typography>
        </Toolbar>
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table aria-labelledby="tableTitle">
            <CabecalhoTabela
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {linhasVisiveis.map((aluno) => (
                <TableRow hover tabIndex={-1} key={aluno.email}>
                  <TableCell component="th" scope="row">
                    {aluno.nome}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {aluno.email}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {aluno.nome_turma}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {aluno.turno}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {new Date(aluno.data_matricula).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color:
                        aluno.media != null
                          ? aluno.media >= 6
                            ? "success.main"
                            : "error.main"
                          : "text.disabled",
                    }}
                  >
                    {aluno.media != null ? aluno.media.toFixed(2) : "—"}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={alunos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

TabelaAlunos.propTypes = {
  alunos: PropTypes.array.isRequired,
};
