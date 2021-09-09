import {Button, Container, Fab} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {useSelector,useDispatch} from 'react-redux'
import swal from 'sweetalert';
import axios from "axios";
import {decNumber, incNumber} from '../../actions/index'
import { notify } from '../Product';
import { useParams } from 'react-router-dom';



const deleteProduct = (_id) =>{
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
    
      axios.delete(`/api/cart/cart/${_id}`)
        
        window.location.reload(); 
      
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
}


var sum = 0
export const Cart = () => {
  const [productData, setProductData] = useState([]);
  const myState = useSelector(state => state.changeTheNumber);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#3F51B5',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const useStyles = makeStyles((theme) => ({
        
        table: {
            minWidth: 650,
          },
          tableRow:{
              background:'#3F51B5',
              color : 'white'
          },
          margin: {
            margin: theme.spacing(1),
          },
          extendedIcon: {
            marginRight: theme.spacing(1),
          }
      }));
  const classes = useStyles();
  
  
  const updateCartProduct = async(_id, qty, totalPrice) =>{
    // alert(totalPrice)
    if(qty == 0)
    {
      swal("Sorry", "At least 1 product is required", "warning");
      return; 
    }

    else{
          const res = await fetch(`api/cart/cart/${_id}`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
             qty, totalPrice
            })
        })

        const data = await res.json();

        if(data)
        {notify(" cart product quantity has updated")
          console.log(data, " update cart data")
          // history.push('/product')
          // setOpen(false);
          window.location.reload(); 
          notify(" cart product quantity has updated")
        }
       else  if(data.status === 422){
          window.alert("invalid cart data")
        }
      }
  }
  const Data = async() =>{
        await fetch("/api/cart/cart")
        .then(response => response.json())
        .then(result => {
            console.log("resullllllllll",result)
            setProductData(result.data) 
              
        });
        }
   useEffect(() => {
   Data()
   },[])
          
          // console.log("Products data", productData)


          const dispatch = useDispatch();
  return(
    <>

<Container fixed style={{marginTop : '70px'}}>
<Paper className={classes.paper}>
  <h1> Add to Cart </h1>
  <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
           <TableRow>
             <StyledTableCell >SN</StyledTableCell>
             <StyledTableCell >PurchaseId</StyledTableCell>
             <StyledTableCell >Title</StyledTableCell>
             <StyledTableCell >Price</StyledTableCell>
             <StyledTableCell >Quantity</StyledTableCell>
             <StyledTableCell >discount</StyledTableCell>
             <StyledTableCell >discountedPrice</StyledTableCell>
             <StyledTableCell >images</StyledTableCell>
             <StyledTableCell align="center">Actions</StyledTableCell>
             <StyledTableCell align="center">Total</StyledTableCell>
           </TableRow>
      </TableHead>
      <TableBody>
        { 
          productData.map((data,ind)=>{
            {sum = sum + data.discountedPrice * data.qty}
            return(
                <>
                 
                   <TableRow key={ind}>
                      <TableCell component="th" scope="row">
                        {ind+1}
                      </TableCell>
                      <TableCell >{data._id}</TableCell>
                      <TableCell >{data.title}</TableCell>
                      <TableCell >{data.price}</TableCell>
                      <TableCell >{data.qty}</TableCell>
                      <TableCell >{data.discount}</TableCell>
                      <TableCell >{data.discountedPrice}</TableCell>
                      <TableCell> 
                      <img src={data.image} alt={data.image} style={{width: 100, height : 100}}/>
                        </TableCell>
                      <TableCell align="center" >
                     
                      <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick={()=>{
                        dispatch(decNumber())
                        updateCartProduct(data._id, parseInt(data.qty)-myState, data.discountedPrice * data.qty)
                      }}>
                        <RemoveIcon />
                    </Fab> 
                    <Fab size="small" color="primary" aria-label="add" className={classes.margin}  onClick={()=>{
                      dispatch(incNumber())
                      updateCartProduct(data._id, myState+parseInt(data.qty), data.discountedPrice * data.qty)
                      }} >
                        <AddIcon />
                    </Fab>
                      <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick ={()=>deleteProduct(data._id)}>
                        <DeleteIcon />
                    </Fab>
                      </TableCell>
                      <TableCell >  <Button size="small" variant="contained"  >{data.discountedPrice * data.qty}</Button></TableCell>
                  </TableRow>
                </>
              )
          })
         } 

         
        </TableBody>

        <TableRow>
             <StyledTableCell ></StyledTableCell>
             <StyledTableCell ></StyledTableCell>
             <StyledTableCell ></StyledTableCell>
             <StyledTableCell ></StyledTableCell>
             <StyledTableCell ></StyledTableCell>
             <StyledTableCell ></StyledTableCell>
             <StyledTableCell ></StyledTableCell>
             <StyledTableCell ></StyledTableCell>
             <StyledTableCell align="center"><h1>Total</h1></StyledTableCell>
             <StyledTableCell align="center">
             <Button size="small" variant="contained"  color="primary">{sum}</Button>
               </StyledTableCell>
           </TableRow>
    </Table>
  </TableContainer>
</Paper>
</Container>
    </>
   )
  }








