import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid} from '@material-ui/core';
import {NavLink} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    maxWidth: 345,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
const Home = ()=> {
  const classes = useStyles();

  const [productData, setProductData] = useState([]);

  
  const addToCart = async(_id, title, price, discount,image ) =>{
    // alert(title) data._id, data.title, data.price, data.discount, data.image
    // console.log(_id, title, price, discount,  image)

  //   const res = await fetch(`api/cart/cart/${_id}`,{
  //     method : "PUT",
  //     headers : {
  //         "Content-Type" : "application/json"
  //     },
  //     body : JSON.stringify({
  //       productId: _id, title , price, discount, image, totalPrice : price 
  //     })
  // })

                    const res = await fetch('api/cart/cart',{
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({
                          productId: _id, title , price, discount, image, totalPrice : price 
                        })
                    })
  
                    const data = await res.json();
                    if(data.status === 422){
                      window.alert("invalid data")
                    }
                    console.log(data, " cart data save")
    }
  const Data = () =>{
    fetch("/api/product")
    .then(response => response.json())
    .then(result => {
        console.log("resullllllllll",result)
        setProductData(result.data) 
          
    });
    }
      useEffect(() => {
        Data()
      },[])

  return (
      <>
        <Container style={{marginTop : "85px"}}>
        <Grid item container direction="row"spacing={3}>
        { 
          productData.map((data,ind)=>{
            return(
                <>
                 <Grid item xs={12} sm={12}  md={3}  direction="row">

                   <Card className={classes.root}>
                  <CardActionArea>
                   
                   <div style={{textAlign : "center"}}>
                   <img src={data.image} alt =""  style ={{height : 200, width:200}}/>
                     
                   </div>
                   
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     {data.discription}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small"  color="primary">
                    <h3> Rs {data.price} </h3>
                  </Button>
                  <Button size="small" color="secondary">
                  Dis - {data.discount} %
                  </Button>
                  <NavLink to="/cart" style={{textDecoration : "none"}}>
                  <Button size="small" variant="contained" color="primary" onClick={()=>addToCart(data._id, data.title, data.price, data.discount, data.image )}>
                  Add to Cart
                  </Button>
                  </NavLink>

                 
                </CardActions>
    </Card>
              
                 </Grid>
        
                </>
              )
           })
        }

</Grid>
        </Container>
      </>
     );
}


export {Home}