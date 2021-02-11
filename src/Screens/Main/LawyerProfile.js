import { Icon, List, ListItem, Separator} from "native-base";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { connect } from "react-redux";
import Header from "../../components/Header";
import { mapStateToProps, ToastError } from "../../config/config";
import { LightGray, Pink } from "../../config/Theme";
import * as f from "firebase";
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import { color } from "react-native-reanimated";
import { getLawyers, setLawyer } from "../../redux/actions/HomeActions";
import { WebView } from "react-native-webview";
const faqs = [
  {
    "qs":`Why should I fight my ticket(s)?`,
    "ans":`If you don’t fight your ticket(s), you can end up with points with your motor vehicle agency, points accruing on your license toward suspension, motor vehicle surcharges, increased insurance premiums, violation fines, court costs, motor vehicle assessments, issues with employment, and more! Even when insurance goes up, it goes up for an average of 5 years which can cost thousands over the years!`,
  "collapsed":false},
  {
    "qs": `How will my Lawyer communicate with me?`,
    "ans": `After you hire your attorney, they will communicate with you about the status of your ticket by telephone, email, or via in-app messaging with the assistance of our support team. You can also see the status of your ticket directly in our mobile app which will be updated as progress occurs. Our support team also helps to ensure smooth open communication between you and your attorney. If you have any questions, you can call us at 1-866-348-4253, email us at info@myticketdefense.com, or message us in our mobile app.`,
    "collapsed": false
  },
  {
    "qs": `What will my Lawyer do?`,
    "ans": `Your attorney will respond to your ticket(s), file an appearance in your case, request evidence regarding your case if necessary, negotiate with the prosecutor when applicable, and attend your traffic hearing to resolve your matter.`,
    "collapsed": false
  },
  {
    "qs": `What type of outcome can I expect?`,
    "ans": `MyTicketDefense lawyers obtain an improved outcome for drivers approximately 98% of the time. This is one of the reasons we consistently maintain a 5 star rating and drivers confidently use our platform over and over again. Every lawyer on our platform is vetted and have proven, consistent, and effective step-by-step methods which work great. This is why we stand by the results you obtain and offer a 100% Secure Money Back Guarantee!`,
    "collapsed": false
  },
  {
    "qs": `How long will the process take?`,
    "ans": `This depends on which court your case is pending in. Some courts can resolve matters in weeks, some in months, and some in years. Sometimes, lawyers use delay tactics as a strategy to get you a better outcome. Sometimes, lawyers use a quicker strategy if they determine that to be better. Every lawyer has their own methods which are consistently proven effective!`,
    "collapsed": false
  },
  {
    "qs": `Do I need to show up in Court?`,
    "ans": `This depends. Some courts allow a driver’s appearance to be waived if they have a lawyer. Some courts require drivers to still show up next to their lawyer. Some courts may require a virtual appearance or telephonic appearance by the driver. Your lawyer will let you know if you need to be present at the hearing with them or if your appearance is not required!`,
    "collapsed": false
  },
  {
    "qs": `What is your success rate?`,
    "ans": `Drivers who use the MyTicketDefense platform consistently have a 98% Satisfaction Rating on the results their lawyers obtained for them.`,
    "collapsed": false
  },
  {
    "qs": `What is your Lowest Rate In State Guarantee?`,
    "ans": `Quite simple. We offer the absolute lowest total rate in your entire state which and we have already pre-negotiated lawyer rates on behalf of drivers. If you come across a lower rate, we guarantee to match it or even beat it in most scenarios!`,
    "collapsed": false
  },
  {
    "qs": `What is your 100% Secure Money Back Guarantee?`,
    "ans": `If your attorney cannot dismiss or amend your ticket, reduce points, avoid suspension points, or obtain you a plea bargain, you are eligible for a full refund. You are always guaranteed that your lawyer will obtain an improved outcome by using our platform and its attorneys.`,
    "collapsed": false
  },
  {
    "qs": `How experienced are the traffic lawyers?`,
    "ans": `Very experienced! Every lawyer is fully vetted and is highly qualified and experienced in handling all types of traffic tickets. Most lawyers on our platform handle thousands and thousands of tickets so yes, they know what they are doing!`,
    "collapsed": false
  },
  {
    "qs": `Should I handle my traffic ticket on my own?`,
    "ans": `Good luck if you do! Most drivers who handle their own traffic tickets are not able to obtain similar or successful results compared with the results an experienced traffic lawyer can obtain for them. Trust us, we have seen too many examples of drivers calling us after they handled their own ticket wondering if somebody can fix the mistakes they made! Don’t be foolish and risk your license, points, insurance, etc., hire an experienced lawyer to handle it properly the first time around!`,
    "collapsed": false
  },
  {
    "qs": `Do I get a receipt and contract?`,
    "ans": `Yes, all receipts are emailed to you immediately. Your legal services agreement, our terms and conditions, and privacy policy are contained in the links above. Simply click on them to view, print, or save, for your records if you would like.`,
    "collapsed": false
  },
  {
    "qs": `What is included in my payment?`,
    "ans": `Your payment includes your attorney’s pre-negotiated rate and usage of our mobile app, platform, support team, and access to our platform attorneys.`,
    "collapsed": false
  },
  {
    "qs": `Are there any hidden fees?`,
    "ans": `No hidden fees. We keep it simple!`,
    "collapsed": false
  },
  {
    "qs": `Is my lawyer’s fee a flat-rate?`,
    "ans": `Yes, all the lawyers charge a flat-rate and do not charge hourly or in any other manner.`,
    "collapsed": false
  },
  {
    "qs": `Do you offer anything for referrals?`,
    "ans": `Yes, for every driver you refer that uses our mobile app or platform, we offer a $25 Gift Card to you! Simply contact us and let us know every time you are referring someone.`,
    "collapsed": false
  },
  {
    "qs": `Do the lawyers handle tickets for CDLs and other commercial drivers?`,
    "ans": `Yes, they do handle tickets for CDLs and commercial drivers very frequently!`,
    "collapsed": false
  },
  {
    "qs": `Do the lawyers handle tickets for Uber, Lyft, Taxi Cab, and Bus Drivers?`,
    "ans": `Yes, they do handle tickets for Uber, Lyft, Taxi Cab, and Bus Drivers very frequently!`,
    "collapsed": false
  },
  {
    "qs": `Do the lawyers handle tickets while riding a motorcycle?`,
    "ans": `Yes, they do handle tickets for someone riding a motorcycle very frequently!`,
    "collapsed": false
  }
]
class LawyerProfile extends Component {
  state = {
    lawyer: {},
    isPrice: false,
    faqs : faqs
  };

  componentDidMount() {
    const lawyer = this.props.route.params.Lawyer;
    const isPrice = this.props.route.params.isPrice;

    this.setState({ lawyer, isPrice });
  }

  shadow = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  };

  continue = () => {
    this.props.setLawyer(this.state.lawyer);
    this.props.navigation.navigate("Checkout");
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: LightGray,
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Header navigation={this.props.navigation} />

        <ScrollView style={{ width: "100%", backgroundColor: LightGray }}>
          <View style={{ width: "100%", flex: 1, alignItems: "center", paddingBottom: 32, marginBottom: 32 }}>
            <View style={{ width: "95%", flex: 1, alignItems: "center" }}>
              <View style={{ width: "100%", marginTop: 20 }}>
                <Image
                  style={{ width: "100%", height: 60 }}
                  source={require("../../../assets/lawyer-background.jpg")}
                />

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: 20,
                    padding: 10,
                    alignItems: "center",
                    ...this.shadow,
                  }}
                >
                  <Text
                    style={{
                      color: Pink,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {this.state.lawyer?.name}
                  </Text>
                  <Text style={{ marginTop: 20 }}>
                    {this.state.lawyer?.state}
                  </Text>

                  <View style={{ width: "100%", marginTop: 20 }}>
                    <Image
                      style={{ width: "100%", height: 200 }}
                      source={{ uri: this.state.lawyer?.image }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: 30,
                    padding: 10,
                    alignItems: "center",
                    ...this.shadow,
                  }}
                >
                  <Text
                    style={{
                      color: Pink,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    Attorney Description
                  </Text>
                  <Text style={{ marginTop: 10 }}>
                    {this.state.lawyer?.description}
                  </Text>
                </View>
                {this.state.isPrice ? (
                  <TouchableOpacity
                    onPress={() => this.continue()}
                    style={{
                      width: "100%",
                      padding: 15,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: Pink,
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      {/* Fight ticket for ${this.state.lawyer?.price} */}
                      HIRE THIS LAWYER!
                    </Text>
                  </TouchableOpacity>
                ) : null}
                  {/* accordion */}
                    <Text
                      style={{
                        color: Pink,
                        fontSize: 20,
                        fontWeight: "bold",
                        width: "100%",
                        marginTop:12,
                        padding:10
                      }}
                    >
                      FAQs
                  </Text>
                    {this.state.faqs.length ? (
                      this.state.faqs.map((item,i)=>{
                        return (
                          <Collapse
                          isCollapsed={this.state.faqs[i].collapsed} 
                          onToggle={(isCollapsed) =>
                          {
                            let faqs = this.state.faqs;
                            let new_faqs = [];
                            faqs.forEach((e,index)=>{
                              if(i==index)
                              {
                                e.collapsed = !e.collapsed;
                              }
                              new_faqs.push(e);
                            })
                            this.setState({ faqs:new_faqs })
                          }}
                          style={{marginBottom:4}}>
                            <CollapseHeader style={{backgroundColor:Pink,borderRadius:4,padding:12,paddingVertical:6,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                              <View style={{display:"flex",flexDirection:"row",justifyContent:'space-between',flex:1,maxWidth:"100%"}}>
                                <View style={{flex:1}}><Text style={{ color: "white", fontSize: 16 }}>{item.qs}</Text></View>
                                <Icon type="MaterialIcons" name={!this.state.faqs[i].collapsed ? "keyboard-arrow-down" : "keyboard-arrow-up"} style={{ "color": "white",width:24 }} />
                              </View>
                            </CollapseHeader>
                            <CollapseBody style={{backgroundColor:"white",padding:12}}>
                              <Text>{item.ans}</Text>
                            </CollapseBody>
                          </Collapse>
                        )
                      })
                    ):null}
                      
                  {/* accordion end */}
                {/* <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: 30,
                    padding: 10,
                    alignItems: "center",
                    ...this.shadow,
                    marginBottom: 20,
                  }}
                >
                  <View style={{ width: "100%", flexDirection: "row" }}> 
                    <Icon
                      name="shield-alt"
                      type="FontAwesome5"
                      style={{ color: Pink, fontSize: 50 }}
                    />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        100% Secure Money-Back Guaranteed
                      </Text>
                      <Text style={{ marginTop: 10, fontSize: 15 }}>
                        If your attorney cannot dismiss or amend your ticket,
                        reduce points, or obtain you a plea bargain, you are
                        eligible for a full refund.
                      </Text>
                    </View>
                  */}
                  
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, { setLawyer })(LawyerProfile);
