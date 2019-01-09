import React from "react";
import Constants from "../components/Constants";
import Styles from "../components/Style";
import { CalendarList } from "react-native-calendars";
import TimePicker from "react-native-datepicker";
import {
  Container,
  Header,
  Content,
  Title,
  Icon,
  Left,
  Right,
  Body,
  Button,
  Text
} from "native-base";

export default class SetDateTime extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      title: Constants.date_time,
      endDate: this.addMonthsTo(
        Constants.today,
        Constants.appointment_booking_range
      ),
      markedDate: { [this.timeToString(Constants.today)]: { selected: true } },
      markedTime: null
    };
  }

  /**
   * Add months to current date
   * @param {*} toDate
   * @param {*} byMonths
   */
  addMonthsTo(toDate: Date, byMonths: Number) {
    let tempDate = new Date(toDate);
    tempDate = new Date(tempDate.setMonth(toDate.getMonth() + byMonths));
    return tempDate;
  }

  /**
   * Sample Date Object : {"year":2019,"month":1,"day":23,"timestamp":1548201600000,"dateString":"2019-01-23"}
   */
  onDateChange(date) {
    if (typeof date !== undefined && typeof date.dateString !== undefined) {
      this.setState({
        markedDate: { [date.dateString]: { selected: true } },
        title: date.day + "-" + date.month + "-" + date.year
      });
    }
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: Constants.theme_color }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_compliment_color }
                ]}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: Constants.theme_compliment_color }}>
              {this.state.title}
            </Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <CalendarList
            markedDates={this.state.markedDate}
            current={this.timeToString(Constants.today)}
            minDate={this.timeToString(Constants.today)}
            maxDate={this.timeToString(this.state.endDate)}
            horizontal={true}
            pagingEnabled={true}
            onDayPress={this.onDateChange.bind(this)}
          />

          <TimePicker
            style={{ width: 200 }}
            date={this.state.markedTime}
            mode="time"
            format="HH:mm a"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={10}
            onDateChange={time => {
              console.log("time changed - " + JSON.stringify(time));
              this.setState({ markedTime: time });
            }}
          />
        </Content>
      </Container>
    );
  }
}
