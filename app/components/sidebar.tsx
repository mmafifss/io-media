"use client";

//svg
import {
  AccountCircle,
  ArrowBackIos,
  ArrowForwardIos,
  Category,
  EditLocationAlt,
  Event,
  ExpandLess,
  ExpandMore,
  Gavel,
  Groups,
  Inventory,
  Lock,
  PersonAdd,
  PersonAddAlt1,
  Policy,
  Reorder,
  ReportOff,
  Sell,
  Tune,
  Settings,
  TextSnippet,
} from "@mui/icons-material";

import React, { JSX, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  ALL_MODULES,
  ROUTES_DETAIL_HI_FELLA,
  ROUTES_PROFILE,
} from "../constant/routes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import styles from "../styles/modules/Sidebar.module.scss";
import { splitPathname } from "../utils/splitPathname";
import Image from "next/image";
import { useAppContext } from "../context/store";
import { ClickAwayListener, Popper } from "@mui/base";
import { deleteToken, getToken } from "../utils/storage";
import toastMessage from "./toast";
import { ModalConfirm } from "./modalConfirm";
import { CustomTooltip } from "./customTooltip";
import { imageRegistry } from "../utils/images";

interface ServiceItem {
  id: number;
  label: string;
  icon: JSX.Element;
  link: string;
  isSelected?: any;
  title?: string;
  subSidebar?: any;
  permission?: string;
  children?: any;
}

interface MenuItems {
  dashboard: ServiceItem[];
  profile: ServiceItem[];
  children?: any;
}

export const Sidebar = () => {
  const pathname = usePathname();
  const route = useRouter();
  const { globalState, setState } = useAppContext();

  const [signOut, setSignOut] = useState(false);
  const [permission, setPermission] = useState([]);
  const [notif, setNotif] = useState<number>(globalState?.notifAmmount);
  useEffect(() => {
    const listPermission = getToken("permission");
    const parsedPermission = listPermission ? JSON.parse(listPermission) : [];
    setPermission(parsedPermission);
  }, []);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [openSubmenus, setOpenSubmenus] = useState<any>({});

  const toggleSubmenu = (id: any) => {
    setOpenSubmenus((prev: any) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleHover = (event: any, children: any) => {
    if (children && children.length > 0) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
      setSubmenuItems(children);
    } else {
      setAnchorEl(null);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setState({ isSidebarVisible });
    setOpenSubmenus({});
  };

  const unreadNotif = getToken("unread_notif");

  useEffect(() => {
    setNotif(parseInt(unreadNotif));
  }, [notif, unreadNotif]);

  const handleSignOut = () => {
    deleteToken("access_token");
    deleteToken("socket_token");
    deleteToken("employee_id");
    deleteToken("permission");
    deleteToken("unread_notif");
    setSignOut(false);
    toastMessage("You have been logged out.", "success");
    route.push("/auth/login");
  };

  const menuItems: MenuItems = {
    dashboard: [
      {
        id: 1,
        label: "Users",
        icon: <AccountCircle />,
        link: ALL_MODULES.USERS,
        isSelected: ALL_MODULES.USERS === pathname,
        permission: "manage notification",
      },
      {
        id: 2,
        label: "Invetaris",
        icon: <AccountCircle />,
        link: ALL_MODULES.INVENTARIS,
        isSelected: ALL_MODULES.INVENTARIS === pathname,
        permission: "manage notification",
      },
    ],

    profile: [
      {
        id: 1,
        label: "Sign out",
        icon: <AccountCircle />,
        link: "",
        isSelected: splitPathname({
          url: ROUTES_PROFILE.SIGN_OUT,
          level: 1,
          pathname: pathname,
        }),
      },
    ],
  };

  const userPermissionsSet = new Set(
    permission?.map((value: any) => value.permission)
  );

  const filterMenuItemsProfile = menuItems?.profile.filter((value) => {
    if (value.permission) {
      return userPermissionsSet.has(value.permission);
    }
    return true;
  });

  const SubMenu = ({ value }: any) => (
    <div className={styles.submenu}>
      {value?.children?.map((child: any) => (
        <Link
          key={child.id}
          href={child.link}
          style={{
            textDecoration: "none",
            color: "#323232",
          }}
        >
          <MenuItem
            className={
              child.isSelected
                ? styles.subSidebarListMenuSelected
                : styles.subSidebarListMenu
            }
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            <Stack direction="row" gap={1}>
              {child.icon}
              {isSidebarVisible && (
                <h4 className={styles.sidebarListLabel}>{child.label}</h4>
              )}
            </Stack>
          </MenuItem>
        </Link>
      ))}
    </div>
  );

  return (
    <Box
      className={`${
        isSidebarVisible ? styles.sidebarContainer : styles.hideSidebarContainer
      }`}
    >
      <Box className={styles.sidebarSubContainer}>
        <Box display="block" m="0 auto" p="20px">
          <Image
            src={imageRegistry.not_found}
            alt="not found"
            width={isSidebarVisible ? 120 : 25}
          />
        </Box>
        <Box className={styles.sidebarList}>
          {menuItems.dashboard.map((value) => {
            return (
              <Link
                key={value.id}
                href={value.link}
                style={{ textDecoration: "none", color: "#323232" }}
                onMouseEnter={(event) => handleHover(event, value.children)}
              >
                <CustomTooltip
                  title={
                    !value.children || value.children.length === 0
                      ? value.label
                      : ""
                  }
                  placement="right"
                  arrow
                >
                  <MenuItem
                    LinkComponent={Link}
                    href={value.link}
                    key={value.id}
                    className={
                      value.isSelected
                        ? styles.sidebarListMenuSelected
                        : styles.sidebarListMenu
                    }
                  >
                    <Stack direction="row" gap={1}>
                      {value.icon}
                      {isSidebarVisible ? (
                        <h4 className={styles.sidebarListLabel}>
                          {value.label}
                        </h4>
                      ) : (
                        <></>
                      )}
                    </Stack>

                    {value?.id !== 1 && isSidebarVisible && (
                      <Badge
                        color="warning"
                        variant="dot"
                        invisible={value?.id === 2 && notif === 0}
                      />
                    )}
                  </MenuItem>
                </CustomTooltip>
              </Link>
            );
          })}

          {isSidebarVisible ? (
            <Typography className={styles.subtitles}>Profile</Typography>
          ) : (
            <Typography className={styles.subtitles}>P</Typography>
          )}
          {filterMenuItemsProfile.map((value) => {
            return (
              <div key={value.id}>
                <Link
                  key={value.id}
                  href={value.link}
                  style={{
                    textDecoration: "none",
                    color: "#323232",
                  }}
                >
                  <MenuItem
                    key={value.id}
                    onClick={() => {
                      value.children &&
                        isSidebarVisible &&
                        toggleSubmenu(value.id);
                      if (value?.id === 4) {
                        setSignOut(true);
                      }
                    }}
                    className={
                      value.isSelected
                        ? styles.sidebarListMenuSelected
                        : styles.sidebarListMenu
                    }
                    onMouseEnter={(event) => handleHover(event, value.children)}
                  >
                    <Stack direction="row" gap={1}>
                      {value.icon}
                      {isSidebarVisible && (
                        <h4 className={styles.sidebarListLabel}>
                          {value.label}
                        </h4>
                      )}
                    </Stack>
                    {isSidebarVisible &&
                      value.children &&
                      (openSubmenus[value.id] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </MenuItem>
                </Link>
                {isSidebarVisible &&
                  value.children &&
                  openSubmenus[value.id] && <SubMenu value={value} />}
              </div>
            );
          })}
          <Box className={styles.toggleButtonBox} onClick={toggleSidebar}>
            {isSidebarVisible ? (
              <ArrowBackIos className={styles.iconToogleBox} />
            ) : (
              <ArrowForwardIos className={styles.iconToogleBox} />
            )}
          </Box>
        </Box>
        <ModalConfirm
          open={signOut}
          isError
          title="Sign Out"
          textBody="Are you sure to Sign Out?"
          textBtn="Sure"
          handleClose={() => setSignOut(false)}
          handleContinue={() => handleSignOut()}
        />
      </Box>
      {!isSidebarVisible && open && (
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="right-start"
          transition
          style={{ zIndex: 9999 }}
        >
          {({ TransitionProps }: any) => (
            <Grow {...TransitionProps}>
              <Paper
                sx={{
                  backgroundColor: "#fdfdfd",
                  ml: 1,
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {submenuItems.map((child: any, index: number) => (
                      <Link
                        key={index + 1}
                        href={child?.link}
                        style={{ textDecoration: "none", color: "#323232" }}
                      >
                        <MenuItem
                          key={child?.id}
                          onClick={handleClose}
                          className={
                            child.isSelected
                              ? styles.subSidebarListMenuSelected
                              : styles.subSidebarListMenu
                          }
                        >
                          <Stack direction="row" gap={1}>
                            {child?.icon}
                            {child?.label}
                          </Stack>
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </Box>
  );
};
