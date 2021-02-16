import { Icon, Picker, Textarea } from "native-base";
import React, { Component } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  Linking,
} from "react-native";
import * as f from "firebase";
import { LightGray, Pink } from "../../../config/Theme";
import Header from "../../../components/Header";
import call from "react-native-phone-call";
import * as MailComposer from "expo-mail-composer";
import { ToastError, ToastSuccess, mapStateToProps } from "../../../config/config";
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";

class Contact extends Component {
  state = {
   message:'',
   currentUser: ""
  };
  constructor(props) {
    super(props);
    // this.setState({
    //   currentUser: this.props.auth?.user,
    // });
    this.setState({
      currentUser: this.props.auth?.user
    });
    this._sendMessage = this._sendMessage.bind(this);
    // Keyboard.addListener('keyboardDidShow', () => {
    //   this.setState({ keyboardOpen: true });
    // });
    // Keyboard.addListener('keyboardDidHide', () => {
    //   this.setState({ keyboardOpen: false });
    // });
  }
  componentDidMount() {
    
    // alert(JSON.stringify(this.props.auth?.user))

    this.setState({
        currentUser: this.props.auth?.user,
    });
  }
  _sendMessage = () =>{
    if(this.state.message == "")
    {
      ToastError("Error!", "Please write your message.");
      return;
    }
    const currentUser = this.state.currentUser;
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        f.default
          .database()
          .ref("contacts")
          // .child(this.state.data.id)
          .push({
            user: { name: currentUser.Name, email:currentUser.Email, phone:currentUser.Phone},
            message: this.state.message,
            date: moment().format()
           })
          .then(() => {
            this.setState({ message: "" });
            ToastSuccess("Success", "Your message has been sent to our team!");
          })
          .catch(() => {
            ToastError("Error", "Unable to send the message...!");
          });
      } else {
        ToastError("Network Error!", "Kindly check your internet connection");
      }
    });
  }
  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
          alignItems: "center",
          backgroundColor: LightGray,
        }}
      >
        <Header navigation={this.props.navigation} />
        <View
          style={{
            width: "90%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
              Contact Us
            </Text>
          </View>
        </View>

        <View style={{ width: "90%", flex: 1, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Send us a message
          </Text>
          <Textarea
            style={{
              width: "100%",
              borderRadius: 10,
              backgroundColor: "white",
              borderWidth: 0.5,
              paddingTop:8,
              marginTop: 10,
            }}
            value={this.state.message}
            onChangeText={(text)=>{this.setState({message:text})}}
            placeholder={`Enter your message here`}
            rowSpan={5}
          />
          <TouchableOpacity
            style={{
              width: "100%",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Pink,
              marginTop: 20,
            }}
            onPress={()=>{this._sendMessage()}}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Send Message
            </Text>
          </TouchableOpacity>

          <View style={{ width: "100%", marginTop: 30 }}>
            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>
              Email Us!
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ width: 40 }}>
                <Icon
                  name="mail"
                  type="Entypo"
                  style={{ color: "gray", fontSize: 20 }}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  MailComposer.composeAsync({
                    recipients: ["info@myticketdefense.com"],
                  })
                }
              >
                <Text style={{ color: Pink, textDecorationLine: "underline" }}>
                  info@myticketdefense.com
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: "100%", marginTop: 30 }}>
            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>
              Call Us!
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ width: 40 }}>
                <Icon
                  name="phone"
                  type="Entypo"
                  style={{ color: "gray", fontSize: 20 }}
                />
              </View>
              <TouchableOpacity onPress={() => call("1-866-34-TICKET")}>
                <Text style={{ color: Pink, textDecorationLine: "underline" }}>
                  1-866-34-TICKET
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 30 }}>
            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>
              Write a Review!
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ width: 40 }}>
                <Icon
                  name="web"
                  type="MaterialCommunityIcons"
                  style={{ color: "gray", fontSize: 20 }}
                />
              </View>
              <TouchableOpacity onPress={() => Linking.openURL("https://www.myticketdefense.com/post.php")}>
                <Text style={{ color: Pink, textDecorationLine: "underline" }}>
                 Click Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(Contact);

