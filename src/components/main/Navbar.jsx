import { FavoriteBorderOutlined, ShoppingCartOutlined, Search } from '@mui/icons-material';
import React, { useContext } from 'react';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import { useNavigate } from 'react-router';
import { authContext } from '../../contexts/AuthContext';
import { Button } from '@mui/material';
import { userContext } from '../../contexts/UserContext';
import { mobile } from '../../responsive';
import { tablett } from '../../responsive';
import { merchContext } from '../../contexts/MerchContext';


const Container = styled.div`
  height: 60px;
  margin-bottom: 5px;
  ${mobile({ height: "50px" })}

`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}


`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}

`;


const Input = styled.input`
border:none;
  ${mobile({ width: "50px", display: "none" })}

`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: black;
${mobile({ fontSize: "16px" })}
  ${tablett({ fontSize: "16px" })}


`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center" })}

`;
const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "black",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));


const Navbar = () => {

    const navigate = useNavigate();

    const { logOut, user, loginUserWithEmail } = useContext(authContext);
    const { getAUser, username } = useContext(userContext);
    const { getAllMerch, getItemsByCategory, merchCountInCart } = useContext(merchContext)
    let object = new URLSearchParams(window.location.search)

    function filterMerch(key, value) {
        object.set(key, value);
        let newUrl = `${window.location.pathname}?${object.toString()}`
        navigate(newUrl);
        getAllMerch();
    }
    function handleLogOut() {
        logOut();
        localStorage.clear();
        navigate("/auth");
    }

    let uid = localStorage.getItem("uid");

    let logout;
    if (user) {
        if (!uid) {
            localStorage.setItem("uid", user.uid);
        }

        logout = (
            <div className="btn-logOut">

                <Button variant="contained" onClick={() => handleLogOut()}>
                    Log Out
                </Button>
            </div>
        );
    } else {
        logout = (
            <Button variant="contained" onClick={() => handleLogOut()}>
                Sign up
            </Button>
        );
    }

    function userLogedIn() {
        uid = localStorage.getItem("uid");
        if (!uid) {
            navigate("/auth");
        }
    }

    function getUsr() {
        let usrname = localStorage.getItem("username");
        if (uid && !usrname) {
            getAUser(uid);
        }
    }

    function setusr() {
        if (username) {
            let profileIMG = localStorage.getItem("profileIMG");
            let usrname = localStorage.getItem("username");
            let admin = localStorage.getItem("admin");
            let userID = localStorage.getItem("userID");
            if (!profileIMG) {
                localStorage.setItem("profileIMG", username[0].imageURL);
            }
            if (!usrname) {
                localStorage.setItem("username", username[0].username);
                localStorage.setItem(
                    "following",
                    JSON.stringify(username[0].following)
                );
            }
            if (!userID) {
                localStorage.setItem("userID", username[0].id);
            }
            if (!admin) {
                localStorage.setItem("admin", username[0].admin);
            }
        }
    }
    setTimeout(userLogedIn, 1600);
    setTimeout(() => getUsr(), 1600);
    setTimeout(() => setusr(), 2100);




    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>
                        <Language>EN</Language>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={(e) => filterMerch("q", e.target.value)}
                                placeholder="Search..."
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Left>

                    <Link to="/products/:category" style={{ textDecoration: "none" }}>
                        <Center>
                            <Logo>AILIN'S HOME</Logo>

                        </Center>
                    </Link>
                    <Right>

                        <MenuItem>
                            <Badge badgeContent={merchCountInCart} color="primary">
                                <Link to="/cart" style={{ textDecoration: "none" }}>
                                    <ShoppingCartOutlined style={{ color: "black" }} />

                                </Link>
                            </Badge>
                            <Badge badgeContent={merchCountInCart} color="error">
                                <FavoriteBorderOutlined sx={{ fontSize: 28, color: "black" }} />
                            </Badge>
                            <MenuItem style={{ color: "black" }} >LOGIN</MenuItem>


                        </MenuItem>
                        <Badge size="large"
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"

                            color="inherit">

                            <MenuItem style={{ color: "black" }}
                                variant="h6"
                                component="div"
                                style={{ display: "flex", alignItems: "center" }}>{logout}
                            </MenuItem>
                        </Badge>

                    </Right>
                </Wrapper>
            </Container>
        </div >
    );
};

export default Navbar;


