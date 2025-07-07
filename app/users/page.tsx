"use client";

import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import { DynamicButton } from "../components/button";
import { TablePage } from "../components/tablePage";
import { LoadingPage } from "../components/LoadingPage";
import { SearchInputText } from "../components/searchInputText";

import Layout from "./layout";
import { useAppContext } from "../context/store";
import { useDelayUnmount, useFirstLoading } from "../hooks/customHooks";
import { useUsers } from "../hooks/useUsers";

export const columnAllUsers = [
  { id: 1, field: "name", header: "Account Name" },
  { id: 2, field: "email", header: "Email Address" },
];

type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const users: NextPageWithLayout<any> = () => {
  const { isLoading, getListAllUsers, listUsers } = useUsers();
  const [isFirstLoading] = useFirstLoading();
  const shouldRender = useDelayUnmount(!isFirstLoading, 500);
  const { globalState, setState } = useAppContext();
  const [filterUser, setFilterUser] = useState({
    page: 1,
    paginate: 10,
  });

  console.log(listUsers);

  const handleChangePage = (page: number) => {
    setFilterUser((prevState) => ({
      ...prevState,
      page,
    }));
    setState({
      filterUser: {
        ...globalState?.filterUser,
        page,
      },
    });
  };

  const handleSearch = (text: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = text?.target?.value;

    setState({
      filterUser: {
        ...globalState?.filterUser,
        search: searchText,
      },
    });
  };

  useEffect(() => {
    if (globalState?.filterUser) {
      getListAllUsers(globalState.filterUser);
    } else {
      getListAllUsers(filterUser);
    }
  }, [filterUser]);

  console.log(globalState.filterUser);

  if (isFirstLoading) {
    return <LoadingPage />;
  }

  return shouldRender ? (
    <Box
      sx={{ overflow: "hidden", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    >
      <Typography color="inherit" variant="h4" m={2}>
        All Users
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fdfdfd",
          borderRadius: "7px",
          padding: "20px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" gap={2}></Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          ></Stack>
        </Stack>

        <Box>
          <TablePage
            column={columnAllUsers}
            limit={filterUser.paginate}
            handleLimit={(e: any) => {
              setFilterUser({ ...filterUser, paginate: e.target.value });
              setState({
                filterUser: {
                  ...globalState?.filterUser,
                  paginate: e.target.value,
                },
              });
            }}
            data={listUsers}
            handlePage={handleChangePage}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  ) : null;
};

users.getLayout = (page) => <Layout title="Users">{page}</Layout>;

export default users;
