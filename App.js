import React, { Component, useState} from 'react';
import './App.css';
import './table.css';
import {Button} from 'react-bootstrap';
// import ModalUp from './modal';
import Modal from 'react-modal'
Modal.setAppElement('#root')



class App extends Component {

  constructor(props) {
    super(props);

     this.state = {
    products: [],
      id: '',
      name: '',
      price: '',
      
    
  }
  }
 


//show
componentDidMount(){
  this.getProducts();
}

nameHandler(e) {
  this.setState({ name: e.target.value });
}

priceHandler(e) {
  this.setState({ price: e.target.value });
}

getProducts = _ => {
  fetch('http://localhost:4000/products')
    .then( response => response.json())
    .then(response => this.setState({ products: response.data}))
    .catch(err => console.error(err))
}

// renderProductname = ({id,name}) => <div key={id}>{name}</div> 
// renderProductid = ({id}) => <div key={id}>{id}</div>
// renderProductprice = ({id,price}) => <div key = {id}>{price}</div>


//Add
addProduct = _ => {
 
  fetch(`http://localhost:4000/products/add?id=${this.state.id}&name=${this.state.name}&price=${this.state.price}`)
    .then(response => response.json())
    .then(this.getProducts)
    .catch(err => console.error.err)
}




//delete

deleteProduct(userid) {
  const { products } = this.state;
  fetch(`http://localhost:4000/products/delete?id=${userid}`)
    .then(response => response.json())
    .then(this.getProducts)
    .then(result=>{
      this.setState({
        response:result,
        products:products.filter(product=>product.Uid !== userid)
      })
    })
  
    
}


//Edit

updateProduct(userid) {
  const { products } = this.state;
  fetch(`http://localhost:4000/products/update?id=${userid}&name=${this.state.name}&price=${this.state.price}`)
    .then(response => response.json())
    .then(this.getProducts)
    .then(result=>{
      this.setState({
        response:result,
        products:products.filter(product=>product.Uid !== userid)
      })
    })
}

editb = _ => {
  return ( <tr>
   <button variant="info" 
    onClick={()=>{ this.updateProduct();this.refreshPage();}}>update Product</button></tr>)
}

refreshPage = _ => {
  window.location.reload(false);
}

submitData = async () => {

  const obj = {
      id: this.state.dataedit.id,
      name: this.state.dataedit.name,
      price: this.state.dataedit.price,
  };
  console.log("gg", obj)
}

ModalUp() {
    
  const [modalIsOpen, setMadalIsOpen] = useState(false);
  return (
    <div className="App">
       <Button  variant="info" size="sm" onClick={()=> setMadalIsOpen(true)}> Edit</Button>
       
          <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={()=> setMadalIsOpen(false)}
          style={
            {
              overlay: {
                backgroundColor: 'rgba(63, 92, 12, 0.30)',
                top: 30,
                left: 70,
                right: 70,
                bottom: 80,
              },
              content: {
                color : 'orange'
              }
            }
          }
          >
            <h2 className="App">Edit Product</h2>
            <p>
              
              
            
            </p>

            <div className="App">
           
            <input type='text' placeholder="Product"
              value={this.state.name} 
              onChange={e => this.setState( { name: e.target.value})}
              />

              <input placeholder="PRICE"
              value={this.state.price}
              onChange={e => this.setState({   price: e.target.value})}
              />

              <Button variant="danger" onClick={()=> setMadalIsOpen(false)}>Close</Button>

              <Button variant="secondary" 
               onClick={()=>{ if(window.confirm('Are you sure to update this record?'))
               {this.updateProduct();this.refreshPage()};}}>Update</Button>
            </div>
          </Modal>
    </div>
  );
} 

render() {
  const{error,products}=this.state;
 
        if(error){
            return(
                <div>Error:{error.message}</div>
            )
        }
        else
        {
            return(
         <div className="App"> 

        <div class="header">
            <h1>The Markets</h1>
        </div>
                  <table  id='customers'>
                    <thead className="btn-primary">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          
                          <td>
                        
                            {/* <Button variant="info" onClick={() => {this.fromalert(product.id);}}>Edit</Button>  */}
                        
                            
                        <this.ModalUp/>
                        <Button variant="danger" size="sm"
                         onClick={() => {if(window.confirm('Are you sure to delete this record?'))
                         {this.deleteProduct(product.id);this.refreshPage()};}}>Delete</Button>
                       
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
<br></br><br></br>
                  <div> 
              <input type='text' placeholder="ID"
              value={this.state.id} 
              onChange={e => this.setState( { id: e.target.value})}
             />

             <input type='text' placeholder="Product"
              value={this.state.name} 
              onChange={e => this.setState( { name: e.target.value})}
              />

              <input placeholder="PRICE"
              value={this.state.price}
              onChange={e => this.setState({   price: e.target.value})}
              />

              <Button variant ='primary' size="sm"
               onClick={()=>{ if(window.confirm('Are you sure to add this record?'))
               {this.addProduct();this.refreshPage()};}}>Add Product</Button>
       
          </div>
          
      </div>
              )
        }
}




// render() {
//   const { products,product, } = this.state;
//   return (
//       <div className="App">
           
        // <div class="header">
        //     <h1>The Markets</h1>
        // </div>
//               <table id='customers'>
//                 <tr>
//                     <th>ID</th>
//                     <th>Products</th>
//                     <th>Price</th>
//                     <th>delete</th>
//                     <th>edite</th>
//                 </tr>
//                 <tr> 
//                     <td>{products.map(this.renderProductid)}</td>
//                     <td>{products.map(this.renderProductname)}</td>
//                     <td>{products.map(this.renderProductprice)}</td>
//                     <td>{products.map(this.deleteF)}</td> 
//                     <td>{products.map(this.editb)}</td> 
//                 </tr>
      
//               </table>     
       
// <br></br><br></br>

//           <div> 

//              <input type='text' placeholder="ID"
//               value={product.id} 
//               onChange={e => this.setState({ product: {...product, id: e.target.value}})}
//              />

//              <input type='text' placeholder="Product"
//               value={product.name} 
//               onChange={e => this.setState({ product: { ...product,name: e.target.value}})}
//               />

//               <input placeholder="PRICE"
//               value={product.price}
//               onChange={e => this.setState({ product: { ...product,price: e.target.value}})}
//               />

//               <button 
//                onClick={()=>{ if(window.confirm('Are you sure to add this record?')){this.addProduct();this.refreshPage()};}}>Add Product</button>

//           </div>

// <br></br>
         
//       </div>
//   );
// }
}

export default App;
