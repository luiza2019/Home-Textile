import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import AddMerchModal from "../products/AddMerchModal";
import MerchCardList from "./MerchCardList";
import { useParams } from "react-router";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { merchContext } from "../../contexts/MerchContext";
import "./merch.css";
import { FavoriteBorderOutlined, ShoppingCartOutlined } from "@material-ui/icons";

const MerchRightSide = () => {
  const [open, setOpen] = React.useState(false);
  const { merchCountInCart } = useContext(merchContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  function styleLine(myLoc) {
    if (params.category === myLoc) {
      return {
        textDecoration: "none",
        color: "white",
        borderBottomWidth: "1.5px",
        borderBottomColor: "white",
        borderBottomStyle: "solid",
      };
    } else {
      return { textDecoration: "none", color: "white" };
    }
  }

  function handlePageNext() {
    if (currentPage !== pageCount) {
      let pageN = currentPage + 1;
      setCurrentPage(pageN);
    }
  }

  function handlePagePrev() {
    if (currentPage !== 1) {
      let pageN = currentPage - 1;
      setCurrentPage(pageN);
    }
  }

  let admin = localStorage.getItem("admin");
  let addBtn;
  if (admin === "true") {
    addBtn = (
      <Button
        sx={{
          fontSize: 15,
          height: "32px",
          marginRight: "20px",
          marginTop: "12px",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Add
      </Button>
    );
  } else {
    addBtn = <div></div>;
  }

  return (
    <div className="rightSideMerch">
      <div className="merchNavbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="MerchHeaderText">All Products</h2>
        </Link>
        <div className="m-n">
          {addBtn}

          <Link to="/cart">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={merchCountInCart} color="error">
                <ShoppingCartOutlined sx={{ fontSize: 28, color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/cart">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={merchCountInCart} color="error">
                <FavoriteBorderOutlined sx={{ fontSize: 28, color: "white" }} />
              </Badge>
            </IconButton>
          </Link>
          <AddMerchModal handleClose={handleClose} open={open} />
        </div>
      </div>

      <div className="categories">
        <a href="/products/all" style={styleLine("all")}>
          <h4 className="MerchHeaderText"> All </h4>
        </a>
        <a href="/products/bedding-set" style={styleLine("bedding-set")}>
          <h4 className="MerchHeaderText">Bedding Set</h4>
        </a>
        <a href="/products/blanket" style={styleLine("blanket")}>
          <h4 className="MerchHeaderText">Blanket</h4>
        </a>
        <a href="/products/pillow" style={styleLine("pillow")}>
          <h4 className="MerchHeaderText">Pillow</h4>
        </a>
      </div>

      <div className="merchCard">
        <MerchCardList setPageCount={setPageCount} currentPage={currentPage} />
      </div>
      <div className="pagination">
        {currentPage === 1 ? (
          <Button
            disabled
            onClick={() => handlePagePrev()}
            sx={{ fontSize: 20 }}
          >
            prev
          </Button>
        ) : (
          <Button onClick={() => handlePagePrev()} sx={{ fontSize: 20 }}>
            prev
          </Button>
        )}
        {currentPage === pageCount ? (
          <Button
            disabled
            onClick={() => handlePageNext()}
            sx={{ fontSize: 20 }}
          >
            next
          </Button>
        ) : (
          <Button onClick={() => handlePageNext()} sx={{ fontSize: 20 }}>
            next
          </Button>
        )}
      </div>
    </div >
  );
};

export default MerchRightSide;
