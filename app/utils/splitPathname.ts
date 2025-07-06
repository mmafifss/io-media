export const splitPathname = ({ pathname, level, url }: any) => {
  const pathSidebar = pathname.split("/").splice(0, 3).join("/");
  const pathSubSidebar = pathname.split("/").splice(0, 4).join("/");

  if (level === 1 && pathSidebar === url) {
    return true;
  } else if (level === 2 && pathSubSidebar === url) {
    return true;
  } else {
    return false;
  }
};
