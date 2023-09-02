    /********      Load previous data with async/await     ******/
    window.addEventListener("DOMContentLoaded",async ()=>{

        let response =  await axios.get("http://localhost:3000/user/get-users")
              .then((response)=>{
                console.log(response);
                  for(var i=0;i<response.data.allUsers.length;i++){
                  show(response.data.allUsers[i])
                  }                
              })
          .catch((error)=>{
              console.log('first error');
              document.getElementById('error').innerHTML = `!!${error.message}`;
          })
      });
  

  let bookingId = null;    
  /***********      Save       ************/
  const save = async(event)=>{ 
  try{
  event.preventDefault(); 

  const name = event.target.username.value;
  const number = event.target.number.value;
  const email = event.target.email.value;

  const obj = {
      name,number,email
  }
      console.log('booking == ',bookingId);
      let response;
      if(bookingId == null){
            response =  await axios.post("http://localhost:3000/user/add-user",obj);
      }
      else{
           response =  await axios.put(`http://localhost:3000/user/update-user/${bookingId}`,obj);
      }
             
          console.log('obj => ',response.data.userDetail);
          show(response.data.userDetail); 
      }
      catch(error){
          document.getElementById('error').innerHTML = `${error.message}`;
      }
  }
  
  /**********       Show    ************/
  function show(obj){
      
      const parent = document.getElementById('list');
      const child = document.createElement('li');
      
      child.textContent = obj.name+' - '+obj.phonenumber+' - '+obj.email+' ';


      /*********       Edit      **********/
      const editbtn = document.createElement('button');
      editbtn.className = 'btn btn-primary btn-sm edit';
      editbtn.textContent=' Edit ';
      editbtn.onclick=()=>{
        parent.removeChild(child); 

        document.getElementById('username').value= obj.name;
        document.getElementById('number').value = obj.phonenumber;
        document.getElementById('email').value = obj.email; 
        console.log(obj.id);
        bookingId = obj.id;
        }
  

      
      /*********       Delete      **********/
      const dltbtn = document.createElement('button');
      dltbtn.className = 'btn btn-danger btn-sm  delete';
      dltbtn.textContent=' Delete ';
      dltbtn.onclick=()=>{
          
          axios.delete(`http://localhost:3000/user/delete-user/${obj.id}`);
          parent.removeChild(child);
      }
      
      child.appendChild(editbtn);
      child.appendChild(dltbtn);
      parent.appendChild(child);
  }
