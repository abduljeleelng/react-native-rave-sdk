export interface VerifyPaymentInterface {
    FLW_SECRET_KEY:string;
    ref:string;
}

export interface InResponse {
    status:string;
    message:string;
    data:{
        amount:number
        status:string
        currency:string
        amount_settled:number
    }
}


export const verifyPayment = async(
    {FLW_SECRET_KEY,ref}:VerifyPaymentInterface
    ):Promise<InResponse> =>{
    // const {FLW_SECRET_KEY,ref} = props
    // console.log(`https://api.flutterwave.com/v3/transactions/${ref}/verify`)
    try {
        const response = await fetch(`https://api.flutterwave.com/v3/transactions/${ref}/verify`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json; charset=UTF-8',
                'accept':'application/json',
                'Authorization': `Bearer ${FLW_SECRET_KEY}`
            },
        })
        // .catch(err => {
        //     console.log(err)
        //     return {"status":"error","message":"Server Errors",data:{amount:0,status:"error",currency:"NG",amount_settled:0}};
        // });
        const data = await response.json();
        return data;
    } catch (error) {
        // console.log(error);
        return {"status":"error","message":"Server Errors",data:{amount:0,status:"error",currency:"NG",amount_settled:0}};
    }
};