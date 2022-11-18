
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/abduljeleelng"><img src="https://avatars.githubusercontent.com/u/46464883?v=4?s=100" width="100px;" alt="Abduljeleel Yusuff"/><br /><sub><b>Abduljeleel Yusuff</b></sub></a><br /><a href="https://github.com/abduljeleelng/react-native-rave-sdk/commits?author=abduljeleelng" title="Documentation">📖</a> <a href="https://github.com/abduljeleelng/react-native-rave-sdk/commits?author=abduljeleelng" title="Code">💻</a> <a href="#maintenance-abduljeleelng" title="Maintenance">🚧</a> <a href="#ideas-abduljeleelng" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!