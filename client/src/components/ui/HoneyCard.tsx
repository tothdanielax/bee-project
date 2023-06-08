import {memo, useCallback} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Typography,} from "@mui/material";
import {toast} from "react-toastify";
import {useAppDispatch} from "@context/store.ts";
import {addElement} from "@features/cart/cartSlice.ts";

type CardProps = {
    imgUrl: string;
    alt: string;
    title: string;
    description: string;
    className?: string;
};

function HoneyCard({
                       imgUrl,
                       alt,
                       title,
                       description,
                       className,
                   }: CardProps) {

    const dispatch = useAppDispatch();

    const handleAddToCart = useCallback(() => {

        dispatch(addElement({
            honey: title,
            quantity: 1,
        }));

        toast.success("Added to cart!");

    }, [title]);

    return (
        <Card className={`${className} mx-auto`}>
            <CardMedia component="img" height="140" src={imgUrl} alt={alt} loading='lazy'/>
            <CardContent className="flex flex-col justify-between">
                <div>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign="center"
                        fontWeight="bold"
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </div>
                <CardActions className="flex self-end mt-5">
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default memo(HoneyCard);
