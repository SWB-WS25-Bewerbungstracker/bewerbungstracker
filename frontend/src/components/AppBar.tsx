import * as React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Menu,
    SvgIcon,
} from "@mui/material";
import { Menu as MenuIcon, Business as BusinessIcon} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import keycloak from "../keycloak";
import MyLittleDrawer from "./Drawer";

// Tabs und Links dazu
const pages = [
  { name: "Home", path: "/" },
  { name: "Termine", path: "/termine" },
  { name: "Bewerbungen", path: "/bewerbungen" },

];


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const actualLocation = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
//  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//    setAnchorElUser(event.currentTarget);
//  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 // const handleCloseUserMenu = () => {
  //  setAnchorElUser(null);
 // };
    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

  // Logout-Funktion (später hier einfügen)
  const handleLogout = () => {
    // Hier Logout-Logik einfügen, z.B.:
    // - Entfernen des Tokens aus localStorage
    //      localStorage.removeItem('authToken');
    // - Zurücksetzen des Auth-Status im Zustand
    // - Weiterleitung zur Login-Seite
    keycloak.logout();
    navigate("/login");
    console.debug("User logged out");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        //boxShadow: 'none'
        backgroundColor: (theme) => theme.palette.primary.main, // KI: Hintergrundfarbe explizit setzen
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SvgIcon
            component={BusinessIcon}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BEWERBUNGSTRACKER
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
                //boxShadow: 'none'
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                  //boxShadow: 'none'
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SvgIcon
            component={BusinessIcon}
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              //boxShadow: 'none'
            }}
          />
          <Typography
            variant="h5"
            component={Link}
            to={"/"}
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              //boxShadow: 'none'
            }}
          >
            BEWERBUNGSTRACKER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
                const isActive = actualLocation.pathname === page.path;
                return(
                <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        boxShadow: "none",
                        backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                    }}
                >
                    {page.name}
                </Button>
                )
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Einstellungen öffnen">
              <IconButton onClick={handleDrawerOpen} sx={{ p: 0 }}>
                <Avatar sx={{color:"black"}} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <MyLittleDrawer open={drawerOpen} onClose={handleDrawerClose}/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
