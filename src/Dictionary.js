/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,Platform,StyleSheet,Text,View,Image,Button,Alert,ScrollView,WebView,ActivityIndicator, ListView, TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

/*class DictionaryMain extends Component<{}> {
  _onButtonClick(){
    Alert.alert('You Tapped the button!')
  }
  render() {
    let pic = {
        uri: 'https://www.whatsappstatus007.com/wp-content/uploads/2017/12/Happy-new-Year-WhatsApp-Status-2018-1024x604.jpg'
    };
    let jsCode = "document.querySelector('.ads').style.display = 'none'; document.querySelector('#media-element').autoplay = true;";
    return (
//        <ScrollView style={{flex: 1, backgroundColor: 'powderblue'}}>
            <WebView
                    source={{uri: 'http://speedwatch.us/embed-olscc9ci3tmz.html'}}
                    injectedJavaScript={jsCode}
                    javaScriptEnabledAndroid={true}
                    style={{marginTop: 20}}
                    mediaPlaybackRequiresUserAction={false}
                    startInLoadingState={true}
                  />
//        </ScrollView>
    );
  }
}*/

const SelectableButton = selectable(Button);

 class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Channels'
   };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://yo-desi-scraper-api.herokuapp.com/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            distinctFieldName: 'channelName'
      })})
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
        Alert("Error getting data!");
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

   return (
        <View>
        <SelectableContainer>
            <ScrollView>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) =>
//                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>

                    <SelectableButton onPress={() => navigate('TVShows', { channel: rowData.channelName })} title={rowData.channelName}/>
                      /*<Text style={{padding: 10,fontSize: 18,height: 44}} onPress={() => navigate('TVShows', { channel: rowData.channelName })}>{rowData.channelName}</Text>
                      <View
                        style={{
                          height: 1,
                          width: "100%",
                          backgroundColor: "#607D8B",
                        }}
                      />*/
//                    </View>
                  }
                />
            </ScrollView>
            </SelectableContainer>
        </View>


    );
  }
}

 class TVShows extends React.Component {
    // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({ navigation }) => ({
        title: 'TV Shows'
    });
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      }
    }

    //const { channel } = this.props.navigation.state.params.channel;

    componentDidMount() {
      return fetch('http://yo-desi-scraper-api.herokuapp.com/api/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                channelName: this.props.navigation.state.params.channel,
                distinctFieldName: 'showName'
        })})
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson),
          }, function() {
            // do something with new state
          });
        })
        .catch((error) => {
          console.error(error);
          Alert("Error getting data!");
        });
    }

    render() {
      const { navigate } = this.props.navigation;
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

     return (
          <View>
              <ScrollView>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Button onPress={() => navigate('ShowDates', { showInfo: rowData })} title={rowData.showName}/>
                        <TouchableHighlight onPress={() => navigate('ShowDates', { showInfo: rowData })}>
                        <Image
                          style={{width: undefined, height: 200, resizeMode: 'stretch'}}
                          source={{uri: rowData.showImageUrl}}
                        />
                        </TouchableHighlight>
                      </View>
                    }
                  />
              </ScrollView>
            </View>
      );
    }
}

class ShowDatesScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({ navigation }) => ({
        title: 'Show Dates'
    });
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      }
    }


    componentDidMount() {
      return fetch('http://yo-desi-scraper-api.herokuapp.com/api/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                showName: this.props.navigation.state.params.showInfo.showName,
                distinctFieldName: 'showDate'
        })})
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson),
          }, function() {
            // do something with new state
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render() {
      const { navigate } = this.props.navigation;
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

     return (
          <View>
              <ScrollView>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                      /*<View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Button onPress={() => navigate('ShowSources', { showDate: rowData.showDate, showName: this.props.navigation.state.params.showName  })}
                        title={rowData.showDate}/>
                      </View>*/

                      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Text style={{padding: 10,fontSize: 18,height: 44}} onPress={() => navigate('ShowSources', { channel: rowData.showDate, showName: this.props.navigation.state.params.showInfo.showName  })}>{rowData.showDate}</Text>
                        <View
                          style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#607D8B",
                          }}
                        />
                      </View>
                    }
                  />
              </ScrollView>
            </View>
      );
    }
}

class ShowSourcesScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({ navigation }) => ({
        title: 'Show Sources'
    });
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      }
    }


    componentDidMount() {
      return fetch('http://yo-desi-scraper-api.herokuapp.com/api/search/sources', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                showName: this.props.navigation.state.params.showName,
                showDate: this.props.navigation.state.params.showDate
        })})
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson),
          }, function() {
            // do something with new state
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render() {
      const { navigate } = this.props.navigation;
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

     return (
          <View>
              <ScrollView>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
//                        <Text>{JSON.stringify(rowData)}</Text>
                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                            <Text style={{padding: 10,fontSize: 18,height: 44}} onPress={() => navigate('ShowLinks', { source: rowData})}>{rowData.sourceName}</Text>
                            <View
                              style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: "#607D8B",
                              }}
                            />
                        </View>
                    }
                  />
              </ScrollView>
            </View>
      );
    }
}

class ShowLinksScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({ navigation }) => ({
        title: 'Show Links'
    });

    render() {
      const { navigate } = this.props.navigation;
     return (
                <View>
                    {Object.entries(this.props.navigation.state.params.source).map(([key,v])=>{
                        if(key != "sourceName"){
                            return (
//                                <View key={key} style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                                    <Button key={key} style={{padding: 10,fontSize: 18,height: 44}} onPress={() => navigate('ShowParts', { link: v })} title={key} />
                                    /*<View
                                      style={{
                                        height: 1,
                                        width: "100%",
                                        backgroundColor: "#607D8B",
                                      }}
                                    />
                                 </View>*/
                            );
                        }
                    })}
                </View>
      );
    }
}

class ShowPartsScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({ navigation }) => ({
        title: 'Show Parts'
    });

    render() {
      const { navigate } = this.props.navigation;
     return (
         <WebView source={{uri: this.props.navigation.state.params.link}} javaScriptEnabledAndroid={true} mediaPlaybackRequiresUserAction={false} startInLoadingState={true} />
      );
    }
}

const  RootNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  TVShows: { screen: TVShows },
  ShowDates: {screen: ShowDatesScreen },
  ShowSources: {screen: ShowSourcesScreen },
  ShowLinks: {screen: ShowLinksScreen },
  ShowParts: {screen: ShowPartsScreen }
});

const AppNavigation = () => (
  <RootNavigator  />
);

export class App extends React.Component {
  render() {
    return (
        <AppNavigation />
    );
  }
}

AppRegistry.registerComponent('Dictionary', () => RootNavigator);