interface HtmlRaveInterface {
    FLW_PUBLIC_KEY:string;
    tx_ref:string;
    amount:number
    currency:string;
    country:string;
    payment_options:string;
    redirect_url:string;
    meta:{
        consumer_id:number;
        consumer_mac:string;
    }
    customer:{
        email:string;
        phone_number:string;
        name:string;
    }
    customizations:{
        title:string;
        description:string;
        logo:string;
    }
}

export const HtmlRave = ({FLW_PUBLIC_KEY,tx_ref,amount,currency,country,payment_options,redirect_url,meta,customer,customizations}:HtmlRaveInterface):any => `
<!DOCTYPE html>
<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <!-- Latest compiled and minified CSS -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            <!-- Fonts -->
            <link rel="dns-prefetch" href="//fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
            <title>Fund Wallet | Jtalk NG</title>
            <style>
                body {
                    margin: 0;
                    padding:0,
                    width: 100vw;
                    height: 100vh;
                };
                form{
                    margin: 0;
                    padding:0,
                    width: 100vw;
                    height: 100vh;
                }
            </style>
        </head>
        <body  onload="makePayment()" style="background-color:#fff;height:100vh ">
            <form>
                <script src="https://checkout.flutterwave.com/v3.js"></script>
            </form>
            <script>
                window.onload = makePayment();
                function makePayment() {
                    FlutterwaveCheckout({
                        public_key:"${FLW_PUBLIC_KEY}",
                        tx_ref: "${tx_ref}",
                        amount: "${amount}",
                        currency: "${currency}",
                        country: "${country}",
                        payment_options: "${payment_options}",
                        redirect_url:"${redirect_url}",
                        meta:${meta} ,
                        customer:${customer}  ,
                    callback: function (data) {
                        console.log(data);
                        var txid = data.transaction_id
                        var resp = {event:data.status, transactionRef:data, txid};
                        console.log(JSON.stringify(resp));
                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    },
                    onclose: function() {
                        // close modal
                        var resp = {event:'cancelled'};
                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    },
                    customizations:${customizations} ,
                    });
                }
            </script>
        </body>
</html>`;