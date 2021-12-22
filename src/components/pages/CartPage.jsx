import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { merchContext } from '../../contexts/MerchContext';
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";




const CartPage = ({ item }) => {
    const { cart, getCart, changeCountMerch, addAndDeleteMerchInCart, checkMerchInCart } = useContext(merchContext)
    useEffect(() => {
        getCart()
    }, [])
    return (
        <div>
            {
                cart ? (
                    cart.merch.length > 0 ? (
                        <Card sx={{ maxWidth: 250, minWidth: 250, marginTop: 5 }}>
                            <CardMedia
                                component="img"
                                width="140"
                                // height="140"
                                image={item.imageURL}
                                alt=""
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    // onClick={(e) => handleAddToCart(e)}
                                    onClick={() => addAndDeleteMerchInCart(item.merch)}
                                >
                                    <ShoppingCartIcon color={checkMerchInCart(item.id) ? "error" : "primary"} />

                                </Button>
                                <Button variant="contained">Buy</Button>
                            </CardActions>
                        </Card >
                    ) : (
                        <h2>Корзина пуста</h2>
                    )
                ) : (
                    <h2>Loading...</h2>
                )
            }
        </div>
    );
};

export default CartPage;