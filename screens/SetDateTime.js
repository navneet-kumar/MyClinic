import moment from "moment";
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Label,
  Left,
  Picker,
  Right,
  Text,
  Title
} from "native-base";
import React from "react";
import { CalendarList } from "react-native-calendars";
import TimePicker from "react-native-datepicker";
import Constants from "../components/Constants";
import Styles from "../components/Style";

export default class SetDateTime extends React.Component {
  static navigationOptions = {
    header: null
  };

  markedSettings = {
    selected: true,
    selectedColor: Constants.theme_color
  };

  constructor(props) {
    super(props);
    let aptmnt = this.props.navigation.getParam("appointment");
    let pastScroll =
      moment(aptmnt.timestamp)
        .toDate()
        .getMonth() -
      moment()
        .toDate()
        .getMonth();
    let futureScroll = Constants.appointment_booking_range - pastScroll;
    this.state = {
      title: Constants.date_time,
      selectedTimestamp: aptmnt.timestamp,
      markedDate: {
        [moment(aptmnt.timestamp).format("YYYY-MM-DD")]: this.markedSettings
      },
      pickedTime: moment(aptmnt.timestamp).format("hh:mm A"),
      pickedDate: moment(aptmnt.timestamp).format("DD/MM/YYYY"),
      duration: aptmnt.duration,
      pastScroll: pastScroll,
      futureScroll: futureScroll
    };
  }

  /**
   * Add months to current date
   * @param {*} toDate
   * @param {*} byMonths
   */
  addMonthsTo(toDate, byMonths) {
    let tempDate = new Date(toDate);
    tempDate = new Date(tempDate.setMonth(toDate.getMonth() + byMonths));
    return tempDate;
  }

  /**
   * Sample Date Object : {"year":2019,"month":1,"day":23,"timestamp":1548201600000,"dateString":"2019-01-23"}
   */
  onDateChange(date) {
    if (typeof date !== undefined) {
      this.setState({
        markedDate: {
          [date.dateString]: this.markedSettings
        },
        pickedDate: moment(new Date(date.dateString)).format("DD/MM/YYYY")
      });
    }
  }

  setAppointmentDuration(duration) {
    if (typeof duration !== undefined) {
      this.setState({
        duration: duration
      });
    }
  }

  /**
   * go back to the parent screen
   */
  backToAddAppointment() {
    this.props.navigation.state.params.updateDateTime(
      this.state.pickedDate,
      this.state.pickedTime,
      this.state.duration
    );
    this.props.navigation.goBack();
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
          <Body style={{ flex: 3 }}>
            <Title style={{ color: Constants.theme_compliment_color }}>
              {Constants.date_time}
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <CalendarList
            theme={{ todayTextColor: Constants.theme_color }}
            horizontal={true}
            pagingEnabled={true}
            showScrollIndicator={true}
            pastScrollRange={this.state.pastScroll}
            futureScrollRange={this.state.futureScroll}
            markedDates={this.state.markedDate}
            current={moment(this.state.selectedTimestamp).format("YYYY-MM-DD")}
            minDate={moment().toDate()}
            onDayPress={this.onDateChange.bind(this)}
          />

          <Item>
            <Icon type="Entypo" name="stopwatch" style={Styles.iconStyle} />
            <Label style={{ color: Constants.theme_color }}>Duration</Label>

            <Item
              style={{
                flex: 1,
                justifyContent: "flex-end",
                borderColor: "transparent"
              }}
            >
              <Picker
                mode="dropdown"
                iosHeader="Duration"
                textStyle={{
                  color: Constants.theme_color
                }}
                selectedValue={this.state.duration}
                onValueChange={this.setAppointmentDuration.bind(this)}
              >
                <Picker.Item
                  color={Constants.theme_color}
                  label="30 min"
                  value={30}
                />
                <Picker.Item
                  color={Constants.theme_color}
                  label="45 min"
                  value={45}
                />
                <Picker.Item
                  color={Constants.theme_color}
                  label="1 hour"
                  value={60}
                />
                <Picker.Item
                  color={Constants.theme_color}
                  label="1 hour 30 mins"
                  value={90}
                />
                <Picker.Item
                  color={Constants.theme_color}
                  label="2 hour"
                  value={120}
                />
                <Picker.Item
                  color={Constants.theme_color}
                  label="2 hour 30 mins"
                  value={150}
                />
                <Picker.Item
                  color={Constants.theme_color}
                  label="3 hour"
                  value={180}
                />
              </Picker>
            </Item>
          </Item>
          <Item>
            <Icon type="Entypo" name="clock" style={Styles.iconStyle} />
            <Label style={{ color: Constants.theme_color }}>Start Time </Label>
            <TimePicker
              date={this.state.pickedTime}
              mode="time"
              format="hh:mm A"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              minuteInterval={10}
              onDateChange={time => {
                this.setState({ pickedTime: time });
              }}
              // timeZoneOffsetInMinutes={Constants.today.getTimezoneOffset() * -1}
              customStyles={{
                dateInput: {
                  borderWidth: 0
                },
                dateText: {
                  color: Constants.theme_color,
                  fontSize: 16,
                  alignSelf: "flex-end"
                }
              }}
              style={{ flexGrow: 1 }}
            />
          </Item>
          <Item style={{ paddingTop: 30, alignSelf: "center" }}>
            <Button
              iconRight
              style={{ backgroundColor: Constants.theme_color }}
              onPress={() => this.backToAddAppointment()}
            >
              <Text>Done</Text>
              <Icon
                type="FontAwesome"
                name="check"
                style={[
                  Styles.iconStyle,
                  { color: Constants.theme_compliment_color }
                ]}
              />
            </Button>
          </Item>
        </Content>
      </Container>
    );
  }
}
