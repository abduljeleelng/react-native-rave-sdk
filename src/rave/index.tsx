import React,{useState,useEffect} from 'react';
import { View,Dimensions,StyleSheet, Modal, ActivityIndicator,Text,Button } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { verifyPayment} from '../utils';
import { HtmlRave } from './HtmlRave';


interface RavePropInterface {
    FLW_PUBLIC_KEY:string;
    FLW_SECRET_KEY:string;
    tx_ref:string;
    amount:number
    currency:string;
    country:string;
    payment_options:string;
    redirect_url:string;
    consumer_id:number;
    consumer_mac:string;
    email:string;
    phone_number:string;
    name:string;
    title:string;
    description:string;
    logo:string;
    onCancel?:any;
    onFailed?:any;
    onSuccess?:any;
    onVerifyingError?:any;
    //design
    colour:string;
    buttonText:string;
    // : Type | undefined;
}

export default function Rave(props:RavePropInterface) {
    const {
        FLW_PUBLIC_KEY,tx_ref,amount,currency,country,payment_options,redirect_url,
        consumer_id, consumer_mac,email,phone_number, name,title,description,logo,
        colour,buttonText
    } = props
    const [value, setvalue] = useState<{visible:boolean,loading:boolean,verify:boolean}>({
        visible:false,
        loading:false,
        verify:false,
    })
    const {visible, loading, verify} = value;
    let mounted =  React.useRef(true);

    useEffect(() => {
        //effect
        //messageRecived()
        return () => {
            //cleanup
            mounted.current = false;
        }
    },[])


/*
    useEffect(() => {
        autoStartCheck();
    }, []);
    
    const autoStartCheck = () => {
        if (props.autoStart) {
          setModalVisible(true);
        }
    };
    
    useImperativeHandle(ref, () => ({
        StartTransaction() {
          setModalVisible(true);
        },
    }));
*/
    
    const messageRecived = async ({data}:{data:any}) => {
        var webResponse = JSON.parse(data);
        console.log(JSON.stringify(webResponse));
        switch (webResponse.event) {
            case "cancelled":
              {
                try {
                    setvalue({...value,visible:false,loading:false})
                    props.onCancel({"error":"Transaction was cancelled"});
                } catch (error) {console.log(error)}
              }
            break;
            case "failed":
                {
                    try {
                        setvalue({...value,visible:false,loading:false})
                        //console.log(`Cancelled the Transaction of ${props.amount}`),
                        props.onFailed({"error":"Transaction was Failed", data:webResponse});
                    } catch (error) {console.log(error)}
                }
            break;
            case "successful":
                {
                    try {
                        setvalue({...value,verify:true,visible:false,loading:false})
                        const {FLW_SECRET_KEY}=props;
                        const ref:string = webResponse.txid;
                        const resp = await verifyPayment({FLW_SECRET_KEY,ref})
                        if (resp.data.status === "successful" && resp.data.currency === props.currency && resp.data.amount ===props.amount){ 
                            setvalue({...value,verify:false,loading:false,visible:false})
                            return props.onSuccess({data:resp,deposit:resp.data.amount_settled})
                        }else{
                            setvalue({...value,verify:false,loading:false,visible:false})
                            return props.onVerifyingError({"error":"Error in verifying user payment, However, user may bill"});
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            break;
          default:
              if(!mounted.current){
                  console.log(mounted.current)
                   //setvalue({...value,verify:false,visible:false,loading:false})
                    props.onCancel({"error":"Transaction errors"});
                }else{
                    console.log(mounted.current)
                }
            break;
        }
    };


    const payLoad = {
        FLW_PUBLIC_KEY,
        tx_ref,
        amount,
        currency,
        country,
        payment_options,
        redirect_url,
        meta:{
            consumer_id,
            consumer_mac,
        },
        customer:{
            email,
            phone_number,
            name,
        },
        customizations:{
            title,
            description,
            logo,
        }

    }


    return (
            <View style={styles.container}>
                <Modal
                    style={styles.modalView}
                    visible={visible}
                    animationType="slide"
                    transparent={true}
                    //onRequestClose={()=>setvalue({...value, visible:false})}
                >
                    <AutoHeightWebView
                        source={{ html: HtmlRave(payLoad)}}
                        style={styles.wevView}
                        //scalesPageToFit={true}
                        onMessage={e => { messageRecived(e.nativeEvent.data)}}
                        onLoadStart={() => setvalue({...value, loading:true})}
                        onLoadEnd={() => setvalue({...value, loading:false})}
                        javaScriptEnabled
                        viewportContent={'width=device-width, user-scalable=no'}
                    /> 
                    {
                        loading && <ActivityIndicator size="large" color={colour}  />
                    }
                </Modal>
                <>
                    {
                        verify ?
                            <>
                            <Modal
                                style={styles.modalView}
                                visible={verify}
                                animationType="slide"
                                transparent={true}
                                //onRequestClose={()=>setvalue({...value, visible:false})}
                            >
                                <View
                                    style={{
                                        flex:1,
                                        height,
                                        width,
                                    }}
                                >
                                    <Text h5>Wait !, verifying your payment </Text>
                                    <ActivityIndicator size="large" color={colour} />
                                </View>
                            </Modal>
                            </>
                            :
                            <>
                                <Button 
                                    color={colour}
                                    disabled={loading} 
                                    title={buttonText}
                                    onPress={()=>setvalue({...value, visible:true})}
                                />
                            </>
                    }
                </>
            </View>
        
    )
}

const {height,width} = Dimensions.get('screen');
const styles = StyleSheet.create({
    container:{
    //    marginHorizontal:-30,
    },
    modalView:{
        flex:1,
        height,
        width,
        margin:5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    wevView:{
        height, 
        width, 
        marginVertical:50,
    }
});

Rave.defaultProps = {
    buttonText: "Pay Now",
    color:'#EDB107',
    amount: 10,
    autoStart: false,
    currency:"NGN",
};
