import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { addMood, removeMood } from './actions/mood';

//moode images path store into variable
import mood_0 from './images/0.png';
import mood_1 from './images/1.png';
import mood_2 from './images/2.png';
import mood_3 from './images/3.png';
import mood_4 from './images/4.png';

class App extends Component {

  //this method used for add mood record into redux.
  saveMood = (type) => {
    this.props.addMood(type);
  }

  //this method used for remove mood record from redux.
  moodRemoveHandler = (key) => {
    this.props.removeMood(key);
  }
  //this method used for convert  timestamp to specific date format
  formateDate = (timStamp) => {
    date = "";
    var d = new Date(timStamp);
    date = this.formatDigit(d.getDay()) + "/" + this.formatDigit(d.getMonth()) + "/" + this.formatDigit(d.getFullYear()) + " " + this.formatDigit(d.getHours()) + ":" + this.formatDigit(d.getMinutes()) + ":" + this.formatDigit(d.getSeconds());
    return date
  }

  //format digit method 
  formatDigit = (digit)=>{
    if(digit>9){
      return digit
    }else{
      return '0'+digit
    }
  }

  //this method used for get mood image from mood value
  getMoodTypeImage = (type) => {
    switch (type) {
      case 0:
        return mood_0
      case 1:
        return mood_1
      case 2:
        return mood_2
      case 3:
        return mood_3
      case 4:
        return mood_4

      default:
        return mood_0
        break;

    }
  }

  //this method used for display list of mood from redux
  moodDisplay = () => {
    return (
      <FlatList contentContainerStyle={{ paddingBottom: '15%' }} style={styles.listContainer}
        data={this.props.moods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Image style={styles.imagesItem} source={this.getMoodTypeImage(item.value)} />

            <Text style={{ alignSelf: 'center' }}>{this.formateDate(item.date)}</Text>
            <View style={{ width: 30, height: 30, position: 'absolute', end: 10, alignSelf: 'center' }}>
              <TouchableOpacity onPress={() => this.moodRemoveHandler(item.key)}>
                <Image style={{ height: 30, width: 30 }} source={require('./images/delete.png')} />
              </TouchableOpacity>
            </View >
          </View>
        )}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ flex: 1 }}>
          {this.moodDisplay()}
        </View>
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
          <TouchableOpacity style={styles.images} onPress={() => this.saveMood(4)}>
            <Image style={styles.images} source={require('./images/4.png')} />
          </TouchableOpacity>
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
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10
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

//mapping add,remove actions 
const mapStateToProps = state => {
  return {
    moods: state.moods.moods
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMood: (name) => {
      dispatch(addMood(name))
    },
    removeMood: (key) => {
      dispatch(removeMood(key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
