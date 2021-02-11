import React, { Component } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import Header from "../../components/Header";
import { LightGray, Pink } from "../../config/Theme";
import DatePicker from "react-native-datepicker";
import ToggleSwitch from "toggle-switch-react-native";
import { Icon } from "native-base";
import {
  setLicensePoints,
  setLicensePoints2,
  setViolationType,
} from "../../redux/actions/HomeActions";
import { connect } from "react-redux";
import { mapStateToProps } from "../../config/config";

class MoreTicketDetails extends Component {
  state = {
    ticketDate: "",
    courtDate: "",
    accident: false,
    commercialLicense: false,
    commercialLicense2: false,
    drivingCommercialVehicle: false,
    violations: 1,
    violations2: 1,
    typeOfViolation: "",
  };

  continue = () => {
    this.props.setViolationType(this.state.typeOfViolation);

    if (this.state.commercialLicense) {
      this.props.setLicensePoints(this.state.violations);
    } else {
      this.props.setLicensePoints(0);
    }
    if (this.state.commercialLicense2) {
      this.props.setLicensePoints2(this.state.violations);
    } else {
      this.props.setLicensePoints2(0);
    }

    this.props.navigation.navigate("Lawyers");
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
          alignItems: "center",
        }}
      >
        <Header navigation={this.props.navigation} />
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
        <View
          style={{
            paddingTop:0,
            padding:24,
            width: "100%",
            flex: 1,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Tell Us More About Your Ticket(s)
            </Text>
          </View>

          <View style={{ width: "100%", marginTop: 30 }}>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "gainsboro",
                borderStyle: "solid",
                paddingBottom: 20,
              }}
            >
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  Tell us a story
                </Text>
              </View>
              <View style={{ width: "100%", marginTop: 10 }}>
                <TextInput
                  style={{
                    width: "100%",
                    paddingLeft: 10,
                    paddingTop:12,
                    backgroundColor: LightGray,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "gray",
                    textAlignVertical:'top'
                  }}
                  multiline
                  numberOfLines={6}
                  placeholder="Write here!"
                  onChangeText={(val) =>
                    this.setState({ typeOfViolation: val })
                  }
                />
              </View>
            </View>

            {/* <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "gainsboro",
                borderStyle: "solid",
                paddingBottom: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  When did you get your ticket?
                </Text>
              </View>
              <View style={{ width: 110, height: 30, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => this.ticketDatePicker.onPressDate()}
                  style={{
                    width: 90,
                    height: 30,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: this.state.ticketDate ? Pink : "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: this.state.ticketDate
                      ? "white"
                      : "#F8F8F8",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: this.state.ticketDate ? Pink : "gray",
                    }}
                  >
                    {this.state.ticketDate || "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "gainsboro",
                borderStyle: "solid",
                paddingBottom: 20,
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  Do you already have a court date scheduled?
                </Text>
              </View>
              <View style={{ width: 110, height: 30, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => this.courtDatePicker.onPressDate()}
                  style={{
                    width: 90,
                    height: 30,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: this.state.courtDate ? Pink : "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: this.state.courtDate ? "white" : "#F8F8F8",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: this.state.courtDate ? Pink : "gray",
                    }}
                  >
                    {this.state.courtDate || "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "gainsboro",
                borderStyle: "solid",
                paddingBottom: 20,
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  Was there an accident involved?
                </Text>
              </View>
              <View style={{ width: 110, alignItems: "flex-end" }}>
                <ToggleSwitch
                  isOn={this.state.accident}
                  onColor={Pink}
                  offColor="gray"
                  label=""
                  size="small"
                  onToggle={(isOn) => this.setState({ accident: isOn })}
                />
              </View>
            </View> */}

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "gainsboro",
                borderStyle: "solid",
                paddingBottom: 20,
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                How many points do you currently have on your license?
                </Text>
              </View>
              <View style={{ width: 110, alignItems: "flex-end" }}>
                <ToggleSwitch
                  isOn={this.state.commercialLicense}
                  onColor={Pink}
                  offColor="gray"
                  label=""
                  size="small"
                  onToggle={(isOn) =>
                    this.setState({
                      commercialLicense: isOn,
                    })
                  }
                />
              </View>
              
            </View>

            {/* <View style={{ width: "100%", marginTop: 0 }}>
              <Text
                style={{
                  fontSize: 13,
                  color: "gray",
                }}
              >
                (This does not apply to most people. If you don't know or you're
                unsure, select "No")
              </Text>
            </View> */}
          </View>

          {/* {this.state.commercialLicense ? (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // borderBottomWidth: 1,
                // borderColor: "gainsboro",
                // borderStyle: "solid",
                paddingBottom: 20,
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  Were you driving a commercial vehicle when you recieved this
                  ticket?
                </Text>
              </View>
              <View style={{ width: 80, alignItems: "flex-end" }}>
                <ToggleSwitch
                  isOn={this.state.drivingCommercialVehicle}
                  onColor={Pink}
                  offColor="gray"
                  label=""
                  size="small"
                  onToggle={(isOn) =>
                    this.setState({ drivingCommercialVehicle: isOn })
                  }
                />
              </View>
            </View>
          ) : null} */}

          {this.state.commercialLicense ? (
            <>
              {/* <View style={{ width: "100%", marginTop: 12 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  How many points do you currently have on your license?
                </Text>
              </View> */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      violations:
                        this.state.violations == 1
                          ? this.state.violations
                          : this.state.violations - 1,
                    })
                  }
                  style={{
                    width: 32,
                    height: 32,
                    borderColor:Pink,
                    borderStyle: "solid",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={{ fontSize: 20,color:Pink }}
                    name="minus"
                    type="AntDesign"
                  />
                </TouchableOpacity>

                <Text
                  style={{ fontSize: 20, color: "black", fontWeight: "bold",borderBottomWidth:1,borderColor:Pink,width:"50%",textAlign:'center',paddingBottom:12,color:Pink }}
                >
                  {this.state.violations}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      violations: this.state.violations + 1,
                    })
                  }
                    style={{
                      width: 32,
                      height: 32,
                      borderColor: Pink,
                      borderStyle: "solid",
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                  <Icon
                    style={{ fontSize: 20, color: Pink }}
                    name="plus"
                    type="AntDesign"
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : null}
           <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "gainsboro",
                borderStyle: "solid",
                paddingBottom: 20,
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                  }}
                >
                  How many points are you facing with your new ticket(s)                </Text>
              </View>
              <View style={{ width: 110, alignItems: "flex-end" }}>
                <ToggleSwitch
                  isOn={this.state.commercialLicense2}
                  onColor={Pink}
                  offColor="gray"
                  label=""
                  size="small"
                  onToggle={(isOn) =>
                    this.setState({
                      commercialLicense2: isOn,
                    })
                  }
                />
              </View>
            </View>
          {this.state.commercialLicense2 ? (
            <>
              {/* <View style={{ width: "100%", marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                How many points you are facing with your new ticket(s)
                </Text>
              </View> */}
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        violations2:
                          this.state.violations2 == 1
                            ? this.state.violations2
                            : this.state.violations2 - 1,
                      })
                    }
                    style={{
                      width: 32,
                      height: 32,
                      borderColor: Pink,
                      borderStyle: "solid",
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      style={{ fontSize: 20, color: Pink }}
                      name="minus"
                      type="AntDesign"
                    />
                  </TouchableOpacity>

                  <Text
                    style={{ fontSize: 20, color: "black", fontWeight: "bold", borderBottomWidth: 1, borderColor: Pink, width: "50%", textAlign: 'center', paddingBottom: 12, color: Pink }}
                  >
                    {this.state.violations2}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        violations2: this.state.violations2 + 1,
                      })
                    }
                    style={{
                      width: 32,
                      height: 32,
                      borderColor: Pink,
                      borderStyle: "solid",
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      style={{ fontSize: 20, color: Pink }}
                      name="plus"
                      type="AntDesign"
                    />
                  </TouchableOpacity>
                </View>
            </>
          ) : null}

          {/* <DatePicker
            ref={(e) => (this.ticketDatePicker = e)}
            style={{ width: 200, opacity: 0 }}
            date={this.state.ticketDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(date) => {
              this.setState({ ticketDate: date });
            }}
          />

          <DatePicker
            ref={(e) => (this.courtDatePicker = e)}
            style={{ width: 200, opacity: 0 }}
            date={this.state.courtDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(date) => {
              this.setState({ courtDate: date });
            }}
          /> */}
        </View>
        <View style={{ width: "100%",paddingHorizontal:24, marginBottom: 20, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => this.continue()}
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Pink,
              borderRadius: 10,
              marginTop: 20,
            }}
            disabled={this.state.typeOfViolation.length > 0 ? false : true}
          >
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              Continue
            </Text>
          </TouchableOpacity>
          </View></ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, { setLicensePoints,setLicensePoints2, setViolationType })(
  MoreTicketDetails
);
