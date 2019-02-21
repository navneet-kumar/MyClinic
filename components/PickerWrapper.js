import { Icon, Picker } from "native-base";
import React, { Component } from "react";
import Constants from "./Constants";
import Styles from "./Style";

const PickerItems = props => {
  return (
    <Picker.Item
      color={props.color}
      key={props.key}
      label={props.label}
      value={props.value}
    />
  );
};

export default class PickerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.default ? props.default : props.data[0]
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.setState({ selected: this.props.selected });
    }
  }

  render() {
    return (
      <Picker
        mode={this.props.mode ? this.props.mode : undefined}
        iosHeader={this.props.header ? this.props.header : "Pick one"}
        iosIcon={<Icon style={Styles.iconStyle} name="ios-arrow-down" />}
        textStyle={
          this.props.textStyle
            ? this.props.textStyle
            : { color: Constants.theme_color }
        }
        selectedValue={this.state.selected}
        onValueChange={selectedItem => {
          this.props.onValueChange(selectedItem);
        }}
      >
        {this.props.data
          ? this.props.data.map((item, index) => {
              return (
                <PickerItems
                  color={Constants.theme_color}
                  key={index}
                  label={String(item).toUpperCase()}
                  value={item}
                />
              );
            })
          : null}
      </Picker>
    );
  }
}
