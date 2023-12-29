import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const HomeStylesComponent = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
  },
  title: {
    fontSize: width * 0.1,
    marginBottom: 16,
  },
  input: {
    height: height * 0.05,
    width: width * 0.6,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default HomeStylesComponent;
