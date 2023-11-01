async function signup(e){
    try{
        console.log('script')
        e.preventDefault();
        const signUpDetails={
            name:e.target.name.value,
            email:e.target.gmail.value,
            password:e.target.pwd.value
        }
        console.log('signup_details',signUpDetails)

        const res=await axios.post("https://localhost:8080/signup",signUpDetails);

        if(res.status==200){
            window.location.href="./login.html";
            console.log('res',res)
        }
        else{   
            throw new error ('Failed to login');
        }
    }catch(err){
            console.log(err)
        }

    
}   