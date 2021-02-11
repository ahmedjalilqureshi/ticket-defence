import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import Header from "../../components/Header";
import { Pink,LightGray } from "../../config/Theme";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import uuid from "uuid";
import * as f from "firebase";
import { mapStateToProps, ToastError } from "../../config/config";
import { setImage,setImage2,setImage3,setImage4,setImage5,setImage6 } from "../../redux/actions/HomeActions";
import { connect } from "react-redux";

class TicketImage extends Component {
  state = {
    imageModal: false,
    TicketImage: "",
    imageLoading: false,
  };

  async componentDidMount() {
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  }

  openGallery = () => {
    this.setState({ imageModal: false });
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      aspect: [4, 5],
      allowsMultipleSelection: false,
    })
      .then(async (res) => {
        this.setState({ imageLoading: true });

        if (!res.cancelled) {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", res.uri, true);
            xhr.send(null);
          });

          f.default
            .storage()
            .ref("Tickets")
            .child(this.uniqueId())
            .put(blob)
            .then(async (res) => {
              if (this.props.auth?.ticket && !this.props.auth.ticket.image)
              {
                this.props.setImage(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image2)
              {
                this.props.setImage2(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image3) {
                this.props.setImage3(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image4) {
                this.props.setImage4(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image5) {
                this.props.setImage5(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image6) {
                this.props.setImage6(await res.ref.getDownloadURL());
              }
              // else if (!this.props.auth?.ticket?.image3.length) {
              //   this.props.setImage3(await res.ref.getDownloadURL());
              // }
              // else if (!this.props.auth?.ticket?.image4.length) {
              //   this.props.setImage4(await res.ref.getDownloadURL());
              // }
              // else if (!this.props.auth?.ticket?.image5.length) {
              //   this.props.setImage5(await res.ref.getDownloadURL());
              // }
              this.setState({
                imageLoading: false,
                TicketImage: await res.ref.getDownloadURL(),
              });
              blob.close();
            })
            .catch((e) => {
              ToastError(
                "Error!",
                e.message ? e.message : "Some error occoured, please try again later"
              );
              this.setState({ imageLoading: false });
              console.log(e);
            });
        } else {
          this.setState({ imageLoading: false, TicketImage: "" });
        }
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "Unable to access your galley, provide permission from app settings"
        );
      });
  };

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  };

  uniqueId = () => {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  };

  openCamera = () => {
    this.setState({ imageModal: false });
    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      aspect: [4, 5],
      allowsMultipleSelection: false,
    })
      .then(async (res) => {
        this.setState({ imageLoading: true });

        if (!res.cancelled) {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", res.uri, true);
            xhr.send(null);
          });

          f.default
            .storage()
            .ref("Tickets")
            .child(this.uniqueId())
            .put(blob)
            .then(async (res) => {
              console.log("file-->");
              if (this.props.auth?.ticket && !this.props.auth.ticket.image) {
                this.props.setImage(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image2) {
                this.props.setImage2(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image3) {
                this.props.setImage3(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image4) {
                this.props.setImage4(await res.ref.getDownloadURL());
              }
              else if (this.props.auth?.ticket && !this.props.auth.ticket.image5) {
                this.props.setImage5(await res.ref.getDownloadURL());
              }
              this.setState({
                imageLoading: false,
                TicketImage: await res.ref.getDownloadURL(),
              });
              blob.close();
            })
            .catch((e) => {
              ToastError(
                "Error!",
                "Some error occoured, please try again later"
              );
              this.setState({ imageLoading: false });
              console.log(e);
            });
        } else {
          this.setState({ imageLoading: false, TicketImage: "" });
        }
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          "Error",
          "Unable to access your camera, provide permission from app settings"
        );
        this.setState({ imageLoading: false });
      });
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
        <Modal
          visible={this.state.imageModal}
          transparent
          animated
          animationType="slide"
          onRequestClose={() => this.setState({ imageModal: false })}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "white",
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ imageModal: false })}
              >
                <Text
                  style={{ color: "tomato", textDecorationLine: "underline" }}
                >
                  Back
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  flexDirection: "row",
                  height: 100,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "50%",
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => this.openCamera()}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../../../assets/camera.png")}
                  />
                  <Text
                    style={{ fontSize: 13, fontWeight: "bold", marginTop: 10 }}
                  >
                    CAMERA
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "50%",
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => this.openGallery()}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../../../assets/gallery.png")}
                  />
                  <Text
                    style={{ fontSize: 13, fontWeight: "bold", marginTop: 10 }}
                  >
                    GALLERY
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Header navigation={this.props.navigation} />
        <ScrollView style={{ width: "100%", height:"100%",backgroundColor: LightGray }}>
        <View
          style={{
            width: "100%",
            paddingHorizontal:20,
            height:"100%",
            flex: 1,
            alignItems: "center",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Upload Your Ticket(s) Here!
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                color: "gray",
                // textAlign: "center",
                width: "100%",
              }}
            >
              You may also upload any other additional documents, driver’s
              license, evidence, or photos you have which your lawyer can use.
            </Text>
          </View>

            {this.state.imageLoading ? (
            <View style={{width:'100%',alignItems:'center'}}>
              <ActivityIndicator size="large" color={Pink} />
            </View>
            ) : (
                <View style={{ width: "100%", display: 'flex',flexWrap:'wrap',
                 justifyContent: 'center',alignSelf:'center',alignItems:'center', flexDirection: 'row' }}>
              <Image
                  style={{ borderWidth: this.props.auth.ticket?.image?.length > 0 ? 2:0, borderColor: Pink, borderRadius: 4,width: 100, height: 100, marginTop: 12,marginRight:12 }}
                source={
                  this.props.auth.ticket?.image?.length > 0
                    ? { uri: this.props.auth.ticket?.image }
                    : require("../../../assets/ticket.png")
                }
              />
                  <Image
                  style={{ borderWidth: this.props.auth.ticket?.image2?.length > 0 ? 2 : 0,borderColor:Pink,borderRadius:4, width: 100, height: 100, marginTop: 12, marginRight: 12 }}
                    source={
                      this.props.auth.ticket?.image2?.length > 0
                        ? { uri: this.props.auth.ticket?.image2 }
                        : require("../../../assets/ticket.png")
                    }
                  />
                  <Image
                  style={{ borderWidth: this.props.auth.ticket?.image3?.length > 0 ? 2 : 0, borderColor: Pink, borderRadius: 4,width: 100, height: 100, marginTop: 12, marginRight: 12 }}
                    source={
                      this.props.auth.ticket?.image3?.length > 0
                        ? { uri: this.props.auth.ticket?.image3 }
                        : require("../../../assets/ticket.png")
                    }
                  />
                  <Image
                  style={{ borderWidth: this.props.auth.ticket?.image4?.length > 0 ? 2 : 0, borderColor: Pink, borderRadius: 4, width: 100, height: 100, marginTop: 12, marginRight: 12}}
                    source={
                      this.props.auth.ticket?.image4?.length > 0
                        ? { uri: this.props.auth.ticket?.image4 }
                        : require("../../../assets/ticket.png")
                    }
                  />
                  <Image
                  style={{ borderWidth: this.props.auth.ticket?.image5?.length > 0 ? 2 : 0, borderColor: Pink, borderRadius: 4, width: 100, height: 100, marginTop: 12, marginRight: 12 }}
                    source={
                      this.props.auth.ticket?.image5?.length > 0
                        ? { uri: this.props.auth.ticket?.image5 }
                        : require("../../../assets/ticket.png")
                    }
                  />
                <Image
                  style={{ borderWidth: this.props.auth.ticket?.image6?.length > 0 ? 2 : 0, borderColor: Pink, borderRadius: 4, width: 100, height: 100, marginTop: 12, marginRight: 12 }}
                  source={
                    this.props.auth.ticket?.image6?.length > 0
                      ? { uri: this.props.auth.ticket?.image6 }
                      : require("../../../assets/ticket.png")
                  }
                />
              </View>
            )}
          <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              color: "gray",
              // textAlign: "center",
              width: "100%",
            }}
          >Additional Tickets and Evidence can be uploaded via in-app messaging later.</Text>

          <View
            style={{ width: "100%", marginBottom: 30, alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ imageModal: true })}
              style={{
                width: "100%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Pink,
                borderRadius: 10,
                marginTop: 20,
              }}
              disabled={this.state.imageLoading}
            >
              <Text
                style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
              >
                SNAP A PHOTO ({
                              this.props.auth.ticket?.image6?.length > 0 ? "6" :
                              this.props.auth.ticket?.image5?.length > 0 ? "5":
                              this.props.auth.ticket?.image4?.length > 0 ? "4" :
                              this.props.auth.ticket?.image3?.length > 0 ? "3" :
                              this.props.auth.ticket?.image2?.length > 0 ? "2" :
                              this.props.auth.ticket?.image?.length > 0 ? "1" :"0"})
              </Text>
            </TouchableOpacity>

            {this.props.auth.ticket?.image?.length > 0 ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("MoreTicketDetails")
                }
                style={{
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: Pink,
                  borderRadius: 10,
                  marginTop: 20,
                  borderWidth: 2,
                  borderStyle: "solid",
                }}
                disabled={this.state.imageLoading}
              >
                <Text style={{ color: Pink, fontSize: 17, fontWeight: "bold" }}>
                  Next
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, { setImage,setImage2,setImage3,setImage4,setImage5,setImage6 })(TicketImage);
