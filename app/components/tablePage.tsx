import React, { Fragment, ReactNode } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  styled,
  tableCellClasses,
  Stack,
  Skeleton,
  IconButton,
  Checkbox,
  SelectChangeEvent,
  TableProps,
} from "@mui/material";
import { Pagination } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import Link from "next/link";
import EmptyState from "./emptyState";
import DropdownPaginate from "./dropdownPaginate";

type SortDirection = "asc" | "desc" | null;

interface ITableColumn {
  id: number;
  field: string;
  header: string;
}

interface ITablePage extends TableProps {
  /**
   * Disabled row table
   */
  disabled?: boolean;
  /**
   * Give color in table head
   */
  isColor?: boolean;
  /**
   * List data
   */
  data?: any;
  /**
   * List column
   */
  column?: ITableColumn[];
  /**
   * Custom component in 1 column
   */
  customComponent?: Record<
    string,
    (val: any, index: number) => React.ReactNode
  >;
  /**
   * Onclick row
   */
  onClickCell?: (row: Record<string, any>) => void;
  /**
   * Handle change page
   */
  handlePage?: (newPage: number) => void;
  /**
   * Hide pagination
   */
  noPaginate?: boolean;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Limit row per page
   */
  limit?: number;
  /**
   * Hanlde change limit
   */
  handleLimit?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
  /**
   * Url detail row
   */
  urlDetail?: (row: Record<string, any>) => string;
  /**
   * Chexbox in table
   */
  hasCheckbox?: boolean;
  /**
   * Handlecheck on checkbox
   */
  onSelectedRowsChange?: (selectedRows: Record<string, any>[]) => void;
  /**
   * State selected rows by index
   */
  selectedRows?: number[];
  /**
   * Handle state selected rows by index
   */
  setSelectedRows?: (selectedRows: number[]) => void;
  /**
   * State selected all row by index
   */
  selectAll?: boolean;
  /**
   * Hanlde state selected all row by index
   */
  setSelectAll?: (selectAll: boolean) => void;
  /**
   * Has delete selected rows
   */
  hasDelete?: boolean;
  /**
   * Rounded table
   */
  isRounded?: boolean;
  /**
   * Multiple checkbox
   */
  isMultipleCheck?: boolean;
  /**
   * Disabled rows by index
   */
  disabledRows?: Record<string, any>;
  /**
   * Editable row
   */
  editRow?: Record<string, any>;
}

export const TablePage = ({
  disabled = false,
  isColor = false,
  data = [],
  column = [],
  customComponent,
  onClickCell,
  handlePage,
  noPaginate = false,
  isLoading = false,
  limit,
  handleLimit,
  urlDetail,
  hasCheckbox = false,
  onSelectedRowsChange,
  selectedRows,
  setSelectedRows,
  selectAll,
  setSelectAll,
  hasDelete = false,
  isRounded = false,
  isMultipleCheck = false,
  disabledRows = [],
  editRow,
}: ITablePage) => {
  const [page, setPage] = React.useState(1);
  const [sortField, setSortField] = React.useState("");
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle sort direction
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Set new sort field and default sort direction
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...((data?.data || []) ?? [])].sort((a: any, b: any) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === null || aValue === undefined) {
      return 1; // Move null/undefined values to the end
    }
    if (bValue === null || bValue === undefined) {
      return -1; // Move null/undefined values to the end
    }

    if (sortField && sortDirection) {
      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    handlePage?.(newPage);
  };

  const handleSelectAllClick = (event: any) => {
    let newSelectedRows: any = [];
    if (setSelectAll && setSelectedRows) {
      if (event.target.checked) {
        newSelectedRows =
          data.map((row: any, index: number) => index) ||
          data?.data?.map((row: any, index: number) => index);
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      setSelectedRows(newSelectedRows);
      if (onSelectedRowsChange) {
        const selectedData = newSelectedRows?.map(
          (index: number) => data?.[index] || data?.data?.[index]
        );
        onSelectedRowsChange(selectedData);
      }
    }
  };

  const handleCheckMultiple = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (setSelectAll && setSelectedRows && selectedRows) {
      const selectedIndex = selectedRows?.indexOf(index);
      let newSelectedRows: number[] = [];

      if (selectedIndex === -1) {
        newSelectedRows = [...selectedRows, index];
      } else {
        newSelectedRows = selectedRows.filter(
          (rowIndex: number) => rowIndex !== index
        );
      }

      setSelectedRows(newSelectedRows);
      setSelectAll(
        newSelectedRows?.length === data?.length || data?.data?.length
      );

      if (onSelectedRowsChange) {
        onSelectedRowsChange(
          newSelectedRows?.map((index) => data?.[index] || data?.data?.[index])
        );
      }
    }
  };

  const handleCheckSingle = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (setSelectAll && setSelectedRows) {
      const newSelectedRows = [index];
      setSelectedRows(newSelectedRows);
      setSelectAll(
        newSelectedRows?.length === data?.length || data?.data?.length
      );

      if (onSelectedRowsChange) {
        onSelectedRowsChange(
          newSelectedRows?.map((index) => data?.[index] || data?.data?.[index])
        );
      }
    }
  };

  const paginationStyle = {
    display: "flex",
    marginTop: "1.25rem",
    marginBottom: "1rem",

    "& .MuiPagination-ul": {
      margin: "0 auto",
    },

    "& .MuiPaginationItem-root": {
      border: "1px solid #323232",
      color: "#323232",

      "&:hover": {
        color: "#323232",
      },
    },

    "& .MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#323232",
      color: "#fdfdfd",
    },
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#323232",
      cursor: "pointer",
      color: "#fdfdfd",
      fontFamily: "Inter",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      fontFamily: "Inter",
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      fontFamily: "Inter",
      border: 0,
    },
  }));

  const checkData =
    (data.data && data.data.length != 0) || (data && data.length != 0);

  return (
    <TableContainer
      component={Paper}
      sx={isRounded ? { borderRadius: "8px" } : {}}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {checkData && (
          <TableHead>
            <TableRow>
              {hasCheckbox && !isMultipleCheck && (
                <TableCell padding="checkbox">Choose</TableCell>
              )}

              {checkData && hasCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    className="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                    sx={{
                      color: "#323232",
                      "&.Mui-checked": {
                        color: "#323232",
                      },
                    }}
                  />
                </TableCell>
              )}
              {column?.map((value: any) => (
                <Fragment key={value?.id}>
                  {isColor ? (
                    <StyledTableCell
                      key={value?.id}
                      onClick={() => handleSort(value.field)}
                    >
                      {value?.header}
                      {sortField === value.field && (
                        <IconButton size="small" disabled={isLoading}>
                          {sortDirection === "asc" ? (
                            <ArrowUpward fontSize="small" />
                          ) : (
                            <ArrowDownward fontSize="small" />
                          )}
                        </IconButton>
                      )}
                    </StyledTableCell>
                  ) : (
                    <TableCell
                      key={value?.id}
                      sx={{ cursor: "pointer", fontFamily: "Inter" }}
                      onClick={() => handleSort(value.field)}
                    >
                      <Stack direction="row" alignItems="center">
                        {value?.header}
                        {sortField === value.field && (
                          <IconButton size="small" disabled={isLoading}>
                            {sortDirection === "asc" ? (
                              <ArrowUpward fontSize="small" color="inherit" />
                            ) : (
                              <ArrowDownward fontSize="small" />
                            )}
                          </IconButton>
                        )}
                      </Stack>
                    </TableCell>
                  )}
                </Fragment>
              ))}
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {data?.data?.length > 0
            ? sortedData.map((row: any, rowIndex: number) => (
                <Fragment key={row?.id}>
                  {isColor ? (
                    <StyledTableRow
                      key={row?.id}
                      sx={{
                        "&:hover": {
                          bgcolor: disabled ? "transparent" : "#D2E4F8",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {hasCheckbox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            className={`checkbox-${rowIndex}`}
                            checked={selectedRows?.indexOf(rowIndex) !== -1}
                            onChange={(event) =>
                              isMultipleCheck
                                ? handleCheckMultiple(event, rowIndex)
                                : handleCheckSingle(event, rowIndex)
                            }
                            sx={{
                              color: "#323232",
                              "&.Mui-checked": {
                                color: "#323232",
                              },
                            }}
                          />
                        </TableCell>
                      )}
                      {column?.map((col: any, columnIndex: number) => {
                        let customCol =
                          customComponent?.[col.field]?.(
                            row[col.field] ?? row,
                            rowIndex
                          ) ?? null;
                        const isLastColumn = columnIndex === column.length - 1;

                        return (
                          <StyledTableCell
                            key={col.id}
                            onClick={
                              isLastColumn
                                ? undefined
                                : () => onClickCell?.(row)
                            }
                            sx={{
                              cursor: disabled ? "default" : "pointer",
                              maxWidth: 400,
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              backgroundColor:
                                row.reason && hasDelete
                                  ? "#C5242433"
                                  : undefined,
                            }}
                            scope="row"
                          >
                            {isLoading ? (
                              <Stack direction="row">
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem", width: "100%" }}
                                />
                              </Stack>
                            ) : (
                              <Fragment key={row?.id}>
                                {disabled ? (
                                  <Fragment key={row?.id}>
                                    {customCol ?? row[col?.field]}
                                  </Fragment>
                                ) : (
                                  <Link
                                    key={row?.id}
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                      fontWeight: "400",
                                    }}
                                    href={{
                                      pathname: urlDetail?.(row),
                                    }}
                                  >
                                    {customCol ?? row[col?.field]}
                                  </Link>
                                )}
                              </Fragment>
                            )}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  ) : (
                    <TableRow
                      key={row?.id}
                      sx={{
                        "&:hover": {
                          bgcolor: disabled ? "transparent" : "#D2E4F8",
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {hasCheckbox && (
                        <TableCell
                          padding="checkbox"
                          sx={{
                            fontFamily: "Inter",
                          }}
                        >
                          <Checkbox
                            className={`checkbox-${rowIndex}`}
                            checked={selectedRows?.indexOf(rowIndex) !== -1}
                            onChange={(event) =>
                              isMultipleCheck
                                ? handleCheckMultiple(event, rowIndex)
                                : handleCheckSingle(event, rowIndex)
                            }
                            sx={{
                              color: "#323232",
                              "&.Mui-checked": {
                                color: "#323232",
                              },
                            }}
                          />
                        </TableCell>
                      )}
                      {column?.map((col: any, columnIndex: any) => {
                        let customCol =
                          customComponent?.[col.field]?.(
                            row[col.field] ?? row,
                            rowIndex
                          ) ?? null;
                        const isLastColumn = columnIndex === column.length - 1;

                        return (
                          <TableCell
                            key={col.id}
                            onClick={
                              isLastColumn
                                ? undefined
                                : () => onClickCell?.(row)
                            }
                            sx={{
                              cursor: disabled ? "default" : "pointer",
                              maxWidth: 400,
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              backgroundColor:
                                row.reason && hasDelete
                                  ? "#C5242433"
                                  : undefined,
                            }}
                            scope="row"
                          >
                            {isLoading ? (
                              <Stack key={col.id} direction="row">
                                <Skeleton
                                  variant="text"
                                  sx={{ fontSize: "1rem", width: "100%" }}
                                />
                              </Stack>
                            ) : (
                              <Fragment key={col.id}>
                                {disabled ? (
                                  <Fragment key={col.id}>
                                    {customCol ?? row[col?.field]}
                                  </Fragment>
                                ) : (
                                  <Link
                                    key={col.id}
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                      fontWeight: "400",
                                    }}
                                    href={{
                                      pathname: urlDetail?.(row),
                                    }}
                                  >
                                    {customCol ?? row[col?.field]}
                                  </Link>
                                )}
                              </Fragment>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )}
                </Fragment>
              ))
            : data?.length > 0
            ? data?.map((row: any, rowIndex: number) => {
                const isDisableRow = !!disabledRows.find(
                  (value: any) =>
                    (value?.name == row?.name &&
                      editRow?.name != value?.name) ||
                    (value?.feature_name == row?.feature_name &&
                      editRow?.feature_name != row?.feature_name)
                );

                return (
                  <Fragment key={row.id}>
                    {isColor ? (
                      <StyledTableRow
                        key={row.id}
                        sx={{
                          "&:hover": {
                            bgcolor: disabled ? "transparent" : "#D2E4F8",
                          },
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {hasCheckbox && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              className={`checkbox-${rowIndex}`}
                              checked={selectedRows?.indexOf(rowIndex) !== -1}
                              onChange={(event) =>
                                isMultipleCheck
                                  ? handleCheckMultiple(event, rowIndex)
                                  : handleCheckSingle(event, rowIndex)
                              }
                              sx={{
                                color: "#323232",
                                "&.Mui-checked": {
                                  color: "#323232",
                                },
                              }}
                            />
                          </TableCell>
                        )}
                        {column?.map((col: any, columnIndex: number) => {
                          let customCol =
                            customComponent?.[col.field]?.(
                              row[col.field] ?? row,
                              rowIndex
                            ) ?? null;
                          const isLastColumn =
                            columnIndex === column.length - 1;
                          return (
                            <StyledTableCell
                              key={col.id}
                              onClick={
                                isLastColumn
                                  ? undefined
                                  : () => onClickCell?.(row)
                              }
                              sx={{
                                cursor: disabled ? "default" : "pointer",
                                maxWidth: 400,
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                backgroundColor:
                                  row.reason && hasDelete
                                    ? "#C5242433"
                                    : undefined,
                              }}
                              scope="row"
                            >
                              {isLoading ? (
                                <Stack direction="row" key={col.id}>
                                  <Skeleton
                                    variant="text"
                                    sx={{ fontSize: "1rem", width: "100%" }}
                                  />
                                </Stack>
                              ) : (
                                <Fragment key={col.id}>
                                  {customCol ?? row[col?.field]}
                                </Fragment>
                              )}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    ) : (
                      <TableRow
                        key={row.id}
                        sx={{
                          bgcolor: isDisableRow ? "#efefef" : "",
                          "&:hover": {
                            bgcolor: isDisableRow
                              ? "#efefef"
                              : disabled
                              ? "transparent"
                              : "#D2E4F8",
                          },
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {hasCheckbox && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              disabled={isDisableRow}
                              className={`checkbox-${rowIndex}`}
                              checked={
                                isDisableRow
                                  ? true
                                  : selectedRows?.indexOf(rowIndex) !== -1
                              }
                              onChange={(event) =>
                                isMultipleCheck
                                  ? handleCheckMultiple(event, rowIndex)
                                  : handleCheckSingle(event, rowIndex)
                              }
                              sx={{
                                color: "#323232",
                                "&.Mui-checked": {
                                  color: isDisableRow ? "#bfbfbf" : "#323232",
                                },
                              }}
                            />
                          </TableCell>
                        )}
                        {column?.map((col: any, columnIndex: number) => {
                          let customCol =
                            customComponent?.[col.field]?.(
                              row[col.field] ?? row,
                              rowIndex
                            ) ?? null;
                          const isLastColumn =
                            columnIndex === column.length - 1;

                          return (
                            <TableCell
                              key={col.id}
                              onClick={
                                isLastColumn
                                  ? undefined
                                  : () => onClickCell?.(row)
                              }
                              sx={{
                                cursor:
                                  disabled || isDisableRow
                                    ? "default"
                                    : "pointer",
                                maxWidth: 400,
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                backgroundColor:
                                  row.reason && hasDelete
                                    ? "#C5242433"
                                    : undefined,
                              }}
                              scope="row"
                            >
                              {isLoading ? (
                                <Stack direction="row" key={col.id}>
                                  <Skeleton
                                    variant="text"
                                    sx={{ fontSize: "1rem", width: "100%" }}
                                  />
                                </Stack>
                              ) : (
                                <Fragment key={col.id}>
                                  {customCol ?? row[col?.field]}
                                </Fragment>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}
                  </Fragment>
                );
              })
            : null}
        </TableBody>
      </Table>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        {!noPaginate && (
          <React.Fragment>
            {(data && data?.length > 0) ||
            (data?.data && data?.data?.length > 0) ? (
              <Pagination
                sx={paginationStyle}
                page={data.current_page ? data.current_page : page}
                count={data?.last_page}
                variant="outlined"
                onChange={handleChangePage}
              />
            ) : null}
          </React.Fragment>
        )}
        {limit && (
          <React.Fragment>
            {(data && data?.length > 0) ||
            (data?.data && data?.data?.length > 0) ? (
              <DropdownPaginate value={data?.per_page} onChange={handleLimit} />
            ) : null}
          </React.Fragment>
        )}
      </Stack>
      {((data && data?.length === 0) ||
        (data?.data && data?.data?.length === 0)) && (
        <EmptyState
          heightImage={150}
          widthImage={150}
          image=""
          message="We couldn’t find anything matching your criteria. "
          title="No Results Found"
        />
      )}
    </TableContainer>
  );
};
