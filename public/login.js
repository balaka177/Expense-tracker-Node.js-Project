async function login_save(e){
    try{
    e.preventDefault();
    const loginDetails={
    gmail:e.target.gmail.value,
    password:e.target.pwd.value,
        }
    const resp=await axios.post('http://localhost:8080/login',loginDetails);
    
    //console.log(resp.data.token);
    localStorage.setItem('token',resp.data.token);
    window.location.href="./expenseTracker.html";

    }catch(err){
        console.log(err);
    }
    }

    document.getElementById('forget_pwd').onclick=async(req,res)=>{
        try{
            window.location.href='./forgot_password.html';
        }catch(err){
            console.log(err)
        }
    }
