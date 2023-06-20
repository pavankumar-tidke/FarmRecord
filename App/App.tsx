
import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';


const App = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://farmrecord.vercel.app/' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
});

export default App;
