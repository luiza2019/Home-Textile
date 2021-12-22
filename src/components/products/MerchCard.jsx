import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditMerchModal from "./EditMerchModal";
import { merchContext } from "../../contexts/MerchContext";
import { useNavigate } from "react-router-dom";
import { FavoriteBorderOutlined } from "@material-ui/icons";

const MerchCard = ({ item }) => {
  const {
    addAndDeleteMerchInCart,
    checkMerchInCart,
    addAndDontDeleteMerchInCart,
  } = useContext(merchContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  let admin = localStorage.getItem("admin");
  let editBtn;
  if (admin === "true") {
    editBtn = (
      <Button variant="contained" onClick={handleOpen}>
        Edit
      </Button>
    );
  } else {
    editBtn = <div></div>;
  }

  function handleABuy() {
    addAndDontDeleteMerchInCart(item);
    navigate("/cart");
  }

  return (
    <Card
      sx={{
        maxWidth: 250,
        marginRight: "20px",
        minWidth: 250,
        height: 350,
        marginTop: 5,
        bgcolor: "fcf1ed",
      }}
    >
      <CardMedia
        component="img"
        height="250"
        object-fit="cover"
        image={item.imageURL}
        alt=""
      />

      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: "teal",
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          {item.title}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "teal", fontSize: "18px", fontWeight: 700 }}
        >
          price: {item.price}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ height: 0, display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          // onClick={(e) => handleAddToCart(e)}
          onClick={() => addAndDeleteMerchInCart(item)}
        >
          <ShoppingCartIcon
            color={checkMerchInCart(item.id) ? "error" : "white"}
          />
        </Button>

        <Button
          onClick={() => handleABuy()}
          sx={{ marginLeft: "10px" }}
          variant="contained"
        >
          Buy
        </Button>
        {editBtn}
      </CardActions>
      <EditMerchModal item={item} handleClose={handleClose} open={open} />
    </Card>
  );
};

export default MerchCard;
