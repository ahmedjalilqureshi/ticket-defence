import React, { Component } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { LinearGradient } from 'expo-linear-gradient';
import { Pink } from "../../config/Theme";
import { Container, Tab, Tabs, TabHeading, Icon, Textarea } from "native-base";
import Settings from "./Settings/Settings";
import { connect } from "react-redux";
import { mapStateToProps, ToastError, ToastSuccess } from "../../config/config";
import { getList } from "../../redux/actions/HomeActions";
import moment from "moment";
import Header from "../../components/Header";
import * as f from "firebase";
//stepper
const labels1 = [
 "Not Guilty Entered",
 "Hearing Schedule",
 "Acceptance Required",
 "Driving Abstract",
 "Case Completed"];
const labels2 = [
  "Pending Review","Canceled"
];
const case_status = [,,0,1,2,3,4];
const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 24,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Pink,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: Pink,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Pink,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Pink,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Pink,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: Pink
}
//stepper end
class TicketDetail extends Component {
  state = {
    ticket: {},
    cancelModal: false,
    reason: "",
    loading: false,
  };

  componentDidMount() {
    const ticket = this.props.route.params.ticket;

    this.setState({ ticket });
  }

  cancelCase = () => {
    this.setState({ loading: true });
    f.default
      .database()
      .ref("list")
      .child(this.props.auth?.user?.id)
      .child(this.state.ticket?.id)
      .update({ status: 0, reason: this.state.reason })
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.goBack();
        ToastSuccess("Success", "Your case is cancelled");
      })
      .catch(() => {
        this.setState({ loading: false });
        ToastError("Error", "Some error occoured, please try again later");
      });
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Modal
          visible={this.state.cancelModal}
          animationType="slide"
          transparent
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "90%",
                borderRadius: 10,
                backgroundColor: "white",
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 16, color: "black", fontWeight: "bold" }}
                >
                  We're sorry to see you go!
                </Text>
                <Text style={{ fontSize: 13, color: "gray", marginTop: 10 }}>
                  Please tell us why you are cancelling. This will help us
                  improve our service.
                </Text>
                <Textarea
                  style={{
                    fontSize: 13,
                    color: "black",
                    width: "100%",
                    borderWidth: 0.5,
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                  placeholder="Why are you cancelling?"
                  placeholderTextColor="gray"
                  rowSpan={5}
                  value={this.state.reason}
                  onChangeText={(val) => this.setState({ reason: val })}
                ></Textarea>

                <TouchableOpacity
                  onPress={() => this.cancelCase()}
                  disabled={this.state.loading}
                  style={{
                    width: "100%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "tomato",
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                >
                  {this.state.loading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      Yes, Cancel case
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.setState({ cancelModal: false, reason: "" })
                  }
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{ color: "black", fontSize: 17, fontWeight: "bold" }}
                  >
                    No, don't Cancel my case
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{flex:1,height:"50%"}}>
                  <View style={{height:150}}>
                    <View style={{position:'absolute',zIndex:10000}}>
                      <Header noBack navigation={this.props.navigation} color={"white"} border={true} />
                    </View>
                    <Image
                      style={{ width: "100%", height: 200,marginTop:-50, resizeMode: "stretch" }}
                      source={require("../../../assets/road.png")}
                    />
                  </View>
                  <View style={{flex:1}}>
                      <View style={{alignItems:"center"}}>
                        <Image
                          style={{ width:100,aspectRatio:1, borderRadius: 100,marginTop:-50,borderWidth:3,borderColor:"#fff" }}
                          source={{ uri: this.state.ticket?.lawyer?.image }}
                        />                      
                      </View>
                      <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}>{ 
                      this.state.ticket?.lawyer?.name.length > 20 ? this.state.ticket?.lawyer?.name.substring(0,20)+"..":
                      this.state.ticket?.lawyer?.name}</Text>
              <Text style={{ textAlign: "center", fontSize: 14, margin: 8 }}>{
                this.state.ticket?.lawyer?.description.length > 70 ? this.state.ticket?.lawyer?.description.substring(0, 70) + ".." :
                  this.state.ticket?.lawyer?.description}</Text>
                      <View style={{ marginTop:16,display: "flex",paddingHorizontal:16, flexDirection: 'row', justifyContent:'space-around',marginHorizontal:24 }}>
                        
                        <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate('LawyerProfile', { Lawyer: this.state.ticket?.lawyer})}}
                         style={{borderRadius:24 }}>
                          <View
                          style={{ borderRadius:24,width: '100%', paddingHorizontal: 24, paddingVertical: 6,backgroundColor:Pink}}>
                            <Text style={{ color: "white", fontSize: 18 }}>&nbsp;&nbsp;Profile&nbsp;&nbsp;</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderRadius: 24 }} onPress={()=>{
                            this.props.navigation.navigate("Message", {
                              data: this.state.ticket,
                            })   
                            
                            }}>
                          <View
                          style={{ borderRadius: 24, width: '100%', paddingHorizontal: 24, paddingVertical: 6, backgroundColor: Pink }}>
                          <Text style={{ color: "white", fontSize: 18 }}>Message</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{display:'flex',marginTop:16,borderTopWidth:1,borderBottomWidth:1,borderColor:"#ccc",justifyContent:'center',flexDirection:'row'}}>
                        <View style={{flex:1,padding:16,alignItems:'center',borderColor:'#ccc',borderRightWidth:1}}>
                            <Text style={{marginBottom:4}}>Ticket From</Text>
                            <Text style={{fontWeight:'bold'}}>{moment(this.state.ticket?.date).format("MMMM D, YYYY")}</Text>
                        </View>
                        <View style={{ flex: 1, padding: 16, alignItems: 'center' }}>
                          <Text style={{ marginBottom: 4 }}>State</Text>
                          <Text style={{
                            fontWeight: 'bold', borderWidth: 1, borderRadius: 16, 
                            borderColor: Pink
                              ,
                            padding:2,paddingHorizontal:12 }}>{this.state.ticket?.violation?.state}</Text>
                        </View>
                      </View>
                      <View style={{ display: 'flex', borderBottomWidth: 1, borderColor: "#ccc", justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 1, padding: 16, alignItems: 'center', borderColor: '#ccc', borderRightWidth: 1 }}>
                          <Text style={{ marginBottom: 4 }}>Ticket Points</Text>
                          <Text style={{
                    fontSize: 12,
                    marginLeft: 6,
                    fontWeight: 'bold', borderWidth: 1, borderRadius: 32,
                    borderColor: Pink,
                    justifyContent: 'center',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: 24,
                    width: 24
                          }}>{this.state.ticket?.violation?.points2 ?? 0}</Text>  
                        </View>
                        <View style={{ flex: 1, padding: 16, alignItems: 'center' }}>
                          <Text style={{ marginBottom: 4 }}>Licence Points</Text>
                          <Text style={{
                    fontSize: 12,
                    marginLeft: 6,
                    fontWeight: 'bold', borderWidth: 1, borderRadius: 32,
                    borderColor: Pink,
                    justifyContent: 'center',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: 24,
                    width: 24
                          }}>{this.state.ticket?.violation?.points ?? 0}</Text>
                        </View>
                    </View>
                  </View>
          </View>
          <View style={{ paddingHorizontal: 12,marginTop:12,paddingBottom:32,marginBottom:32 }}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your Story</Text>
              {/* <View>
                <View style={{ alignSelf:'center',alignItems:'center', display: 'flex', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Ticket Points</Text>
                  <Text style={{
                    fontSize:12,
                    marginLeft:6,
                    fontWeight: 'bold', borderWidth: 1, borderRadius: 32,
                    borderColor: Pink,
                    justifyContent: 'center',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: 24,
                    width: 24
                  }}>{10}</Text>
                </View>
              </View> */}
            </View>
            <Text style={{ marginTop:6,borderColor:"#ccc",borderRadius:12,borderWidth:1,minHeight:60,padding:12 }}>
              {this.state.ticket?.violation?.type}
            </Text>
            <Text style={{marginTop:12,marginBottom:6, fontSize: 18, fontWeight: 'bold',textAlign:'center' }}>Status</Text>
              {/* <Text style={{
                fontWeight: 'bold', marginLeft: 12, borderWidth: 1, borderRadius: 16,
                borderColor: Pink,
                padding: 2, paddingHorizontal: 12
              }}>{this.state.ticket?.status == 1
                ? "Pending Review"
                : this.state.ticket?.status == 0
                  ? "Cancelled"
                  : this.state.ticket?.status == 2
                    ? "Not Guilty Entered"
                    : this.state.ticket?.status == 3
                      ? "Hearing Scheduled"
                      : this.state.ticket?.status == 4
                        ? "Acceptance Required"
                        : this.state.ticket?.status == 5
                          ? "Driving Abstract Required"
                          : this.state.ticket?.status == 6
                            ? "Case Completed"
                            : null}</Text> */}
            <StepIndicator
              stepCount={this.state.ticket?.status == 0 ? labels2.length : labels1.length}
              customStyles={customStyles}
              currentPosition={this.state.ticket?.status == 1 ? -1 : case_status[this.state.ticket?.status]}
              labels={this.state.ticket?.status == 0  ? labels2: labels1}
            />
            {/* <Text style={{marginTop:12}}>
                {JSON.stringify(this.state.ticket)}
            </Text> */}
          </View>
          
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(TicketDetail);
