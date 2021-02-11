import { Icon } from "native-base";
import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Image
} from "react-native";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { mapStateToProps } from "../../config/config";
import { stateList } from "../../config/states";
import { setUSState } from "../../redux/actions/HomeActions";
import Autocomplete from 'react-native-autocomplete-input';
import { LightGray, Pink } from "../../config/Theme";

class StateList extends Component {
  state = {
    states: [],
    query:'',
    selectedState : '',
    keyboardOpen:false
  };
  constructor(props){
    super(props);
    Keyboard.addListener('keyboardDidShow',()=>{
      this.setState({ keyboardOpen: true });
    });
    Keyboard.addListener('keyboardDidHide',()=>{
      this.setState({ keyboardOpen: false });
    });
  }
  componentDidMount() {
    this.setState({
      states: [],
    });
  }
  _keyboardDidHide = () =>{
    this.setState({keyboardOpen:false});
  }

  _keyboardDidShow = () =>{
    this.setState({ keyboardOpen:true });
  }

  search = (text) => {
    const keyword = text?.toLowerCase();
    const realData = stateList;
    const finalData = realData.filter((item) =>
      item.text?.toLowerCase()?.includes(keyword)
    );

    this.setState({ states: finalData });
  };

  render() {
    let {keyboardOpen} = this.state;
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Header navigation={this.props.navigation} />
        <ScrollView style={{ width: "100%", backgroundColor: LightGray }}>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Image 
            style={{ width: "100%", height: 200,marginTop:keyboardOpen ? -200 : 0, resizeMode: "stretch"}}
          source={require('../../../assets/america_map.jpeg')}
          />
          <View style={{ width: "90%", flex: 1, alignItems: "center",marginTop:24 }}>
            {/* <View style={{ width: "100%" }}> */}
            <Text style={{ fontSize: 22,textAlign:'center', color: "black", fontWeight: "bold" }}>
                In What State Did You Receive Your Ticket(s)?
            </Text>
            {/* </View> */}
            <View style={{marginTop:12,width:"90%",height:200}}>
              <Autocomplete
                renderTextInput={(props)=>{
                  return(
                    <View style={{display:'flex',flexDirection:'row',padding:4,alignItems:'center'}}>
                      <TextInput {...props} style={{flex:1,fontSize:16}}/>
                      <Icon type="AntDesign" name={"downcircle"} style={{ "color": Pink ,fontSize:20}} />
                    </View>
                  )
                }}
                containerStyle={{ width: "100%"}}
                listContainerStyle={{width:"100%"}}
                listStyle={{width:"100%",backgroundColor:"#fff",zIndex:-1000,marginTop:-6,marginLeft:0,paddingVertical:4,paddingHorizontal:12}}
                inputContainerStyle={{borderRadius:4,borderColor:Pink,fontSize:14,paddingHorizontal:12,borderWidth:2}}
                data={this.state.states}
                // data={["karachi","hyderabad","lahore"]}
                defaultValue={this.state.query}
                onChangeText={text =>{
                  let finalData;
                  if(text != "")
                  {
                    const keyword = text?.toLowerCase();
                    const realData = stateList;
                    finalData = realData.filter((item) =>

                      (item.text?.toLowerCase() == keyword.toLowerCase() ||
                      item.value?.toLowerCase() == keyword.toLowerCase())
                    //  (item.text?.toLowerCase()?.includes(keyword) ||
                      //item.value?.toLowerCase()?.includes(keyword)) 
                    )
                  }
                  this.setState({ query: text, selectedState:"", states: text == "" ? [] : finalData })
                }
              }
                renderItem={({ item, i }) => (
                  <TouchableOpacity style={{paddingVertical:6,display:'flex',flexDirection:'row',justifyContent:'space-between'}} onPress={() => this.setState({ query: item.text,states:[],selectedState:item.text})}>
                    <Text style={{fontSize:14,color:"#303030"}}>{item.text}</Text>
                    <Text style={{ fontSize: 14, color: "#303030",marginRight:6 }}>{item.value}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            {this.state.selectedState != "" ? (<View style={{ width: "90%", flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity
              onPress={()=>{
                  this.props.setUSState(this.state.selectedState);
                  this.props.navigation.navigate("TicketImage");
              }}
              style={{ backgroundColor: Pink, borderRadius: 6, paddingVertical: 12, marginBottom: 24 }}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14, textAlign: 'center' }}>Proceed</Text>
              </TouchableOpacity>
            </View>):(null)}
            
            {/* <View style={{ width: "100%", marginTop: 20 }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderWidth: 0.5,
                  borderColor: "gray",
                  borderRadius: 10,
                  borderStyle: "solid",
                  height: 50,
                  alignItems: "center",
                  paddingHorizontal: 10,
                  backgroundColor: "#F8F8F8",
                  overflow: "hidden",
                }}
              >
                <Icon name="search" type="EvilIcons" style={{ fontSize: 25 }} />

                <TextInput
                  onChangeText={(val) => this.search(val)}
                  placeholder="Search"
                  style={{ marginLeft: 10, flex: 1 }}
                  placeholderTextColor="gray"
                />
              </View>
            </View> */}

            {/* states */}
            {/* <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              {this.state.states.map((item, i) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.setUSState(item.text);
                    // this.props.navigation.navigate("Lawyers");
                    // just for lawyer profile, will roll it back
                    this.props.navigation.navigate("TicketImage");
                  }}
                  key={i}
                  style={{
                    width: "100%",
                    height: 50,
                    flexDirection: "row",
                    borderColor: "gainsboro",
                    borderStyle: "solid",
                    borderBottomWidth: 0.5,
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "black" }}>{item.text}</Text>
                  <Text>{item.value}</Text>
                   <Icon
                    name="arrow-forward-ios"
                    type="MaterialIcons"
                    style={{ fontSize: 15, color: "gray" }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView> */}
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, { setUSState })(StateList);
