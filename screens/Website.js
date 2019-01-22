import React from "react";
import { WebView, ActivityIndicator } from "react-native";
import Styles from "../components/Style";
import Constant from "../components/Constants";
import { ShowOkAlert, isAndroid } from "../components/Helpers";
import {
  Container,
  Header,
  Content,
  Title,
  Left,
  Right,
  Body,
  Icon
} from "native-base";

export default class Website extends React.Component {
  static navigationOptions = {
    tapBarLabel: "Website"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Constant.theme_color }}>
          <Left>
            <Icon
              type="Octicons"
              name="browser"
              style={[
                Styles.iconStyle,
                { color: Constant.theme_compliment_color }
              ]}
            />
          </Left>
          <Body style={{ flex: 2 }}>
            <Title style={{ color: Constant.theme_compliment_color }}>
              Website
            </Title>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1
          }}
        >
          <WebView
            source={{ uri: Constant.website_url }}
            onError={() => {
              ShowOkAlert("Error occured while loading your website..!");
            }}
            onLoadEnd={() => {
              this.setState({ isLoaded: true });
            }}
          />
          <ActivityIndicator
            size={isAndroid ? 100 : "large"}
            color={Constant.theme_color}
            animating={!this.state.isLoaded}
            style={Styles.spinnerLoading}
          />
        </Content>
      </Container>
    );
  }
}
