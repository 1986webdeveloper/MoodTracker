import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { addMood, removeMood } from './actions/mood';


class App extends Component {

  state = {
    mood: '',
    moods: [],
    images: [require('./images/0.png'), require('./images/1.png'), require('./images/2.png'), require('./images/3.png')]
  }

  moodSubmitHandler = (type) => {

    this.props.add(type);
  }
  moodRemoveHandler = (index) => {

    this.props.remove(index);

  }

  moodChangeHandler = (value) => {
    this.setState({
      mood: value
    });
  }
  formateDate = (timStamp) => {
    date = "";
    var d = new Date(timStamp);
    date = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return date
  }

  moodDisplay = () => {
    return (
      <FlatList contentContainerStyle={{ paddingBottom: '15%' }} style={styles.listContainer}
        data={this.props.moods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Image style={styles.imagesItem} source={this.state.images[item.value]} />

            <Text style={{ alignSelf: 'center' }}>{this.formateDate(item.date)}</Text>
            <View style={{ width: 30, height: 30, position: 'absolute', end: 10, alignSelf: 'center' }}>
              <TouchableOpacity onPress={() => this.moodRemoveHandler(index)}>
                <Image style={{ height: 30, width: 30 }} source={require('./images/delete.png')} />
              </TouchableOpacity>
            </View >
          </View>
        )}
      />
    )
  }
  saveMood = (type) => {
    this.moodSubmitHandler(type);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.images} onPress={() => this.saveMood(0)}>
            <Image style={styles.images} source={require('./images/0.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.images} onPress={() => this.saveMood(1)}>
            <Image style={styles.images} source={require('./images/1.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.images} onPress={() => this.saveMood(2)}>
            <Image style={styles.images} source={require('./images/2.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.images} onPress={() => this.saveMood(3)}>
            <Image style={styles.images} source={require('./images/3.png')} />
          </TouchableOpacity>
        </View>
        <View>
          {this.moodDisplay()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },

  images: {
    width: 50,
    height: 50,
    margin: 10
  },
  imagesItem: {
    width: 50,
    height: 50,
    margin: 10
  },
  listContainer: {
    width: '100%'
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#eee'
  }
});

const mapStateToProps = state => {
  return {
    moods: state.moods.moods
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addMood(name))
    },
    remove: (key) => {
      dispatch(removeMood(key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)