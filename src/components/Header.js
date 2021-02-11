import { Icon } from "native-base";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Pink } from "../config/Theme";

export default class Header extends Component {
  render() {
    return (
      <View
        style={{
          width: "100%",
          height: 40,
          justifyContent: "center",
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{ flexDirection: "row", backgroundColor: this.props.border ? Pink:"transparent", borderRadius: this.props.border ? 32:0,padding:this.props.border ? 2 : 0, alignItems: "center" }}
        >{this.props.color ? 
            (<Icon
              name="arrowleft"
              type="AntDesign"
              style={{ fontSize: 20,color:this.props.color}}
            />):(
              <Icon
            name = "arrow-back-ios"
            type = "MaterialIcons"
            style = {{ fontSize: 20 }}
          />
        )}
          {this.props.color ? null : (
            <Text style={{ marginLeft: 0, fontSize: 15 }}>Back</Text>
        )}
        </TouchableOpacity>
      </View>
    );
  }
}
