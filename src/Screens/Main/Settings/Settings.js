import { Icon } from "native-base";
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
} from "react-native";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../config/config";
import { Pink } from "../../../config/Theme";
import { removeUser } from "../../../redux/actions/AuthActions";

class Settings extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          //   paddingTop: StatusBar.currentHeight,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
              Settings
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 10 }} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Profile")}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              borderColor: "gainsboro",
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 0,
            }}
          >
            <View style={{display:'flex',flexDirection:'row'}}>
              <Icon
                name="account-circle"
                type="MaterialCommunityIcons"
                style={{ fontSize: 18, color: "gray",marginRight:8 }}
              />
              <Text style={{ color: Pink,fontWeight: "bold" }}>Account</Text>
            </View>
            <Icon
              name="arrow-forward-ios"
              type="MaterialIcons"
              style={{ fontSize: 15, color: "gray" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("PaymentMethods")}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              borderColor: "gainsboro",
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 0,
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Icon
                name="credit-card"
                type="Octicons"
                style={{ fontSize: 18, color: "gray", marginRight: 8 }}
              />
              <Text style={{ color: Pink, fontWeight: "bold" }}>Payment Methods</Text>
            </View>

            <Icon
              name="arrow-forward-ios"
              type="MaterialIcons"
              style={{ fontSize: 15, color: "gray" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Contact")}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              borderColor: "gainsboro",
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 0,
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Icon
                name="customerservice"
                type="AntDesign"
                style={{ fontSize: 18, color: "gray", marginRight: 8 }}
              />
              <Text style={{ color: Pink,fontWeight:"bold" }}>Contact Us</Text>
            </View>
            <Icon
              name="arrow-forward-ios"
              type="MaterialIcons"
              style={{ fontSize: 15, color: "gray" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.removeUser()}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              borderColor: "gainsboro",
              borderStyle: "solid",
              borderBottomWidth: 1,
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 0,
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Icon
                name="sign-out"
                type="FontAwesome"
                style={{ fontSize: 18, color: "gray", marginRight: 8 }}
              />
              <Text style={{ color: Pink,fontWeight:'bold' }}>Logout</Text>
            </View>

            <Icon
              name="arrow-forward-ios"
              type="MaterialIcons"
              style={{ fontSize: 15, color: "gray" }}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, { removeUser })(Settings);
