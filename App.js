import { Button, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Create from './screens/Create';
import Detail from './screens/Detail';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const {authState, onLogout} = useAuth()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          authState.authenticated ? (
            <>
              <Stack.Screen name='homePage' component={Home} options={{
                headerRight : () => {
                  return(
                    <>
                      <TouchableOpacity style={{backgroundColor: 'red', borderRadius:6, width:60, height:25}} onPress={onLogout}>
                        <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Logout</Text>
                      </TouchableOpacity>
                    </>
                  )
                },
                title: 'Offers'
              }}></Stack.Screen>
              <Stack.Screen name='createPage' options={{title: 'Create Offer'}} component={Create}></Stack.Screen>
              <Stack.Screen name='detailPage' options={{title: 'Offer Detail'}} component={Detail}></Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name='loginPage' options={{title: 'Login Page'}} component={Login}></Stack.Screen>
            </>
          )
        }
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
  )
}
