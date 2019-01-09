import React from "react";
import Styles from "../components/Style";
import Constants from "../components/Constants";
import { Font, AppLoading } from "expo";
import {
  Container,
  Header,
  Content,
  Title,
  Icon,
  Left,
  Right,
  Body
} from "native-base";

const appointments = [
  {
    name: "brayn",
    mobile: "+91 8090898872",
    gender: "male",
    age: "43",
    description: "RCT week 3",
    appointment: ""
  },
  {
    name: "john",
    mobile: "+91 8090898872",
    gender: "male",
    age: "23",
    description: "Clean up",
    appointment: ""
  },
  {
    name: "Maria",
    mobile: "+91 8090898872",
    gender: "female",
    age: "18",
    description: "Checkup",
    appointment: ""
  },
  {
    name: "kaun",
    mobile: "+91 8090898872",
    gender: "male",
    age: "53",
    description: "No info",
    appointment: ""
  },
  {
    name: "Julie",
    mobile: "+91 8090898872",
    gender: "female",
    age: "35",
    description: " RCT week 3",
    appointment: ""
  }
];

export default class TodaysAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    } else {
      return (
        <Container>
          <Header style={{ backgroundColor: Constants.theme_color }}>
            <Left>
              <Icon
                type="FontAwesome"
                name="bookmark"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_compliment_color }
                ]}
              />
            </Left>
            <Body style={{ flex: 3 }}>
              <Title style={{ color: Constants.theme_compliment_color }}>
                Today's Appointments
              </Title>
            </Body>
            <Right />
          </Header>
          <Content />
        </Container>
        // <SafeAreaView style={Styles.container}>
        //   <ScrollView contentContainerStyle={Styles.form}>
        //     <Text style={Styles.title}>Today's Appointments</Text>
        //     <View style={Styles.card}>
        //       {appointments.map((patient, index) => {
        //         return (
        //           <Card
        //             key={index + 1}
        //             name={patient.name}
        //             age={Number(patient.age)}
        //             mobile={patient.mobile}
        //             gender={patient.gender}
        //             description={patient.description}
        //           />
        //         );
        //       })}
        //     </View>
        //   </ScrollView>
        // </SafeAreaView>
      );
    }
  }
}
