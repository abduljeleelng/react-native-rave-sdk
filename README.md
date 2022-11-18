
# [react-native-rave-sdk](https://developer.flutterwave.com)
### React native Rave SDK 


```bash
npm install react-native-rave-sdk
```
or

```bash
yarn add react-native-rave-sdk
```
### Basic Usage

```bash 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Rave from 'react-native-rave-sdk';

export default function App() {
  const amount = 200
  const getReference = () => {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=';
    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  
  return (
    <View style={styles.container}>
      <Text>React Native Rave SDK</Text>

      <Rave 
        FLW_PUBLIC_KEY="FLWPUBK_TEST-c4f018d0"
        FLW_SECRET_KEY="FLWSECK_TEST-e611eba1"
        tx_ref={"react-native-rave-sdk-test-"+getReference()}
        amount={amount}
        currency="NGN"
        country= "NG"
        payment_options="card"
        email= "abduljeleelng@gmail.com"
        phone_number= "08037358707"
        name= "Rave SDK"
        title= "Rave SDK"
        description= "React native Rave SDK"
        subaccount={{
          id: subaccount_ID
          trx_type: 'subaccount_transaction_type'
          trx_amount: 'amount'
        }}
        useCustomButton={false}
        logo= "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg"
        onCancel={res => {
          console.log({res})
        }}
        onFailed={res => {
          console.log({res})
        }}
        onSuccess={res => {
          console.log({res})
        }}
        onVerifyingError={res => {
          console.log({res})
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


```


## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
