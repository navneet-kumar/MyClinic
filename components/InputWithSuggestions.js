import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Input, Text } from "native-base";
import Constants from "./Constants";

export default class InputWithSuggestions extends Component {
  constructor(props) {
    super(props);

    this._renderSuggestions = this._renderSuggestions.bind(this);
    this._selectItem = this._selectItem.bind(this);

    let { value = "", options = [], zIndex = 1 } = props;
    let optionsMap = options.reduce((r, c) => ({ ...r, [c.id]: c }), {});

    this.state = {
      optionsMap,
      query: props.renderLabel(value) || "",
      isFiltering: false,
      filteredData: [],
      suggestionsLayout: {},
      zIndex
    };
  }

  _renderSuggestions() {
    let {
      zIndex,
      query,
      suggestionsLayout,
      filteredData,
      isFiltering
    } = this.state;
    let { renderLabel, renderKey } = this.props;

    if (Platform.OS === "ios" && !isFiltering) {
      return null;
    }

    let filterContent = () => {
      if (filteredData.length === 0) {
        return <Text style={styles.suggestionText}>No results found</Text>;
      }

      return (
        // If you add in ScrollView, the strange border appears
        // height: Math.max(150, this.state.suggestionsLayout.height)
        // flex: 1 no contentContainerStyle não muda nada
        <ScrollView
        // style={{zIndex: zIndex + 2}}
        >
          <View
            onLayout={({ nativeEvent }) =>
              this.setState({ suggestionsLayout: nativeEvent.layout })
            }
          >
            {filteredData.map(option => (
              <TouchableOpacity
                key={renderKey(option)}
                style={styles.suggestion}
                onPress={() => this._selectItem(option)}
              >
                <Text style={styles.suggestionText}>
                  {this.underline(renderLabel(option))}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      );
    };

    let { content, conditionalLayout } =
      !isFiltering || query.length < 2
        ? {
            conditionalLayout: {},
            content: null
          }
        : {
            conditionalLayout: {
              zIndex: zIndex + 1,
              borderWidth: 0.5,
              elevation: zIndex + 1,
              height: Math.min(150, suggestionsLayout.height)
            },
            content: filterContent()
          };

    return (
      <View style={[styles.suggestionsContainer, conditionalLayout]}>
        {content}
      </View>
    );
  }

  underline(name) {
    let { query } = this.state;
    let index = name.toLowerCase().indexOf(query.toLowerCase());
    return (
      <Text numberOfLines={1}>
        {name.substring(0, index)}
        <Text style={styles.underline}>
          {name.substring(index, index + query.length)}
        </Text>
        {name.substring(index + query.length)}
      </Text>
    );
  }

  _onChangeText(text) {
    let { renderLabel, options } = this.props;

    this.setState({
      isFiltering: true,
      query: text,
      filteredData: options
        .sort((c1, c2) => renderLabel(c1).localeCompare(renderLabel(c2)))
        .filter(
          c =>
            text !== "" &&
            renderLabel(c)
              .toLowerCase()
              .indexOf(text.toLowerCase()) > -1
        )
    });
  }

  _onSubmitEditing() {
    this._selectItem(this.state.filteredData[0]);
  }

  _selectItem(item) {
    this.setState({
      zIndex: this.props.zIndex || 1,
      isFiltering: false,
      query: item ? this.props.renderLabel(item) : ""
    });
    if (item) {
      this.props.onSelectOption(item);
    }
  }

  render() {
    let { query = "", zIndex, containerLayout } = this.state;
    let { placeholder, scrollRef, top, onFocus } = this.props;

    return (
      <View
        style={
          Platform.OS === "ios"
            ? { zIndex: zIndex + (query.length > 0 ? 1 : 0) }
            : {}
        }
        ref="container"
      >
        <View
          style={
            query.length > 0
              ? styles.selectedInputContainer
              : styles.inputContainer
          }
        >
          <Input
            autoCapitalize={"none"}
            returnKeyType="done"
            autoCapitalize="words"
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor={Constants.theme_color}
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={this._onChangeText.bind(this)}
            value={query}
            onFocus={({ nativeEvent }) => {
              onFocus();
              this.setState({ zIndex: zIndex + 2 });
              if (scrollRef) {
                scrollRef.scrollTo({
                  y: top - (Platform.OS === "ios" ? 10 : 15)
                });
              }
            }}
            onSubmitEditing={this._onSubmitEditing.bind(this)}
          />
        </View>

        {this._renderSuggestions()}
      </View>
    );
  }
}

InputWithSuggestions.defaultProps = {
  options: [],
  renderLabel: option => option,
  renderKey: option => option,
  onFocus: () => {}
};

const styles = StyleSheet.create({
  input: {
    height: 22,
    backgroundColor: "transparent",
    padding: 0
    // fontFamily: "Roboto-Thin",
    // fontSize: 20
  },
  inputContainer: {
    borderWidth: 0,
    // borderRadius: 5,
    // borderColor: "#8F2692",
    // padding: 4,
    height: 45,
    justifyContent: "center"
  },
  selectedInputContainer: {
    // borderWidth: 1.5,
    // borderColor: "black",
    // borderRadius: 5,
    // padding: 4,
    height: 45,
    justifyContent: "center",
    elevation: 2
  },
  underline: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline"
  },
  suggestionsContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "red",
    position: "absolute",
    right: 4,
    left: 4,
    borderColor: "#8F2692",
    borderWidth: 0,
    elevation: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  suggestion: {
    padding: 8,
    paddingVertical: 14
  },
  suggestionText: {}
});
