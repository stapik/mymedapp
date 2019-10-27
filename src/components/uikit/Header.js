import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#cccccc',
  },
  welcome: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    fontSize: 40,
    textAlign: 'center',
  },
});

export {Header};
