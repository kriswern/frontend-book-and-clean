import { useState } from "react";
import RegisterService from "../../services/RegisterService"

export default function RegisterForm(){
    const initialState = {
        name: "",
        email: "",
        password: "",
        address: "",
        type: "",
       
      };
    
      const [formData, setFormData] = useState(initialState);
      
      const handleSubmit = (e) => {
        e.preventDefault();
        if (RegisterService.registerUser(formData)) {
        }
        setFormData(initialState);
      };
      
    return(
        <form onSubmit={handleSubmit}>        
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Name</label>
      <input 
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        type="text"
        class="form-control" 
        id="inputName4" 
        placeholder="Name"/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
    type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div ><br/>
  <div class="form-check" >
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" 
  value="Customer" onChange={(e) => setFormData({ ...formData, type: e.target.value })}/>
  <label class="form-check-label" for="exampleRadios1">
    Cutomer
  </label>
</div>
<div class="form-check" >
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" 
  value="Cleaner" onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
  <label class="form-check-label" for="exampleRadios2">
    Cleaner
  </label>
</div>  <br/>
 
  <button type="submit" class="btn btn-primary">Register</button>
</form>
);

}