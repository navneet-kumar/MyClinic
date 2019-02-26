import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Title
} from "native-base";
import React from "react";
import { WebView } from "react-native";
import ActivityProgress from "../components/ActivityProgress";
import Constant from "../components/Constants";
import { ShowOkAlert } from "../components/Helpers";
import Styles from "../components/Style";

export default class Website extends React.Component {
  static navigationOptions = {
    tapBarLabel: "Website"
  };

  constructor(props) {
    super(props);
    this.state = {
      showActivityIndicator: true
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
            renderError={err => {
              ShowOkAlert("Error occured while loading your website..! ");
            }}
            onLoadEnd={() => {
              this.setState({ showActivityIndicator: false });
            }}
          />
          <ActivityProgress
            showActivityIndicator={this.state.showActivityIndicator}
          />
        </Content>
      </Container>
    );
  }
}
