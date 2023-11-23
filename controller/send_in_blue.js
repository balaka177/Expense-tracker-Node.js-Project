exports.send_mail=async(req,res)=>{
    try{

        const mail=req.body.gm;

        const Sib=require('sib-api-v3-sdk')
        require('dotenv').config()
        const client=Sib.ApiClient.instance
        const apiKey=client.authentications['api-key']
        apiKey.apiKey=process.env.SEND_IN_BLUE_KEY

        const tranEmailApi=new Sib.TransactionalEmailsApi()

        const sender={
            email:'purushottam.balaka@gmail.com',
            name:'Purushottam'
        }
        const receivers=[
            {
                email:mail,
            },
        ]
        tranEmailApi.sendTransacEmail({
            sender,
            to:receivers,
            subject:'Forget password',
            textContent:'To change your password,use given link below',
            htmlContent:`
            <b>Change password</b>
            <a href='https://www.google.com'>Click here</a>
            `
        })
        .then(console.log)
        .catch(console.log)
}catch(err){
    console.log(err)
}
}