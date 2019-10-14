import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "c6dd74b29fe4d10b815c2a22fc36fb6b";


export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp
    });
    console.log(temp,weather);
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}

/*
export default class extends React.Component {
  state = {
    isLoading:true
  };
  getWeather = async(latitude, longitude) =>{//약간 함수 호출 같은 느낌
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    console.log(temp,weather[0].main);// 함수에서 받기로한 axios 약간 리퀘스트값을 통쨰로 받아오는 듯 함 해당데이터를 data라는 곳에 대입
    //console.log(temp,weather);
    this.setState({//hmm
      isLoading: false,
      condition: weather[0].main,//weather input data to condition
      temp
    });
  };
  getLocation = async () => {

    try{
      //throw Error();에러로 판정해서 패스해서 에러 발생할때 사용할 메세지를 바로 확인 할 수 있
      //const response = await Location.requestPermissionsAsync();
      await Location.requestPermissionsAsync();
      //console.log(response);
      const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
      this.setState({ isLoading: false})//isLoading의 상태를 바꿀수 있음
      //console.log(coords.latitude, coords.longitude);//coords라는 오브젝트로 호출되기 떄문에 이렇게 불러 올 수 있음
      /*const location = await Location.getCurrentPositionAsync();
      console.log(location);*/
/*
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp ,condition} = this.state;
  return isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition} />;//math.round : 해당 함수는 숫자를 반옯림하여 표시해
  }
}*/
