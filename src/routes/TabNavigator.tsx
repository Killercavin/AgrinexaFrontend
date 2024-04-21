import React, { useEffect, useState } from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp, useLinkTo } from '@react-navigation/native';
import Dashboard from '../screens/(dashboard)/Dashboard';
import Home from '../screens/home/Home';
import Weather from '../screens/weather/Weather';
import FarmDashBoard from '../screens/(dashboard)/FarmDashBoard';
import { getData } from '../utils/storage';
import UserProfile from '../screens/profile/UserProfile';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='Homepage' screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Homepage" component={Home} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Farm" component={FarmDashBoard} />
        </Stack.Navigator>
    );
};

const screenOptions = ({ route }: { route: RouteProp<ParamListBase, string>; navigation: any }): BottomTabNavigationOptions => ({
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        padding: 10,
        width: '100%',
        height: 94,
        zIndex: 0,
    },
    tabBarActiveTintColor: '#5DCCFC',
    tabBarInactiveTintColor: '#000',
});


const TabNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const linkTo = useLinkTo();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await getData("token");
                if (!token) linkTo("/login");
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkLoginStatus();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Tab.Navigator initialRouteName='Homestack' screenOptions={screenOptions}>
                    <Tab.Screen
                        name="Homestack"
                        component={HomeStack}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Feather name="home" size={28} color={focused ? '#5DCCFC' : '#000'} />
                                    <Text style={{ fontSize: 16, color: focused ? '#5DCCFC' : '#000' }}>
                                        Home
                                    </Text>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="weather"
                        component={Weather}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <MaterialCommunityIcons name="google-analytics" size={28} color={focused ? '#5DCCFC' : '#000'} />
                                    <Text style={{ fontSize: 16, color: focused ? '#5DCCFC' : '#000' }}>
                                        Analysis
                                    </Text>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Scan"
                        component={Dashboard}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        position: "absolute",
                                        alignItems: 'center', justifyContent: 'center', shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.29,
                                        shadowRadius: 4.65,
                                        elevation: 7,
                                        top: -20,
                                        backgroundColor: "#fff",
                                        padding: 16,
                                        borderRadius: 50,
                                    }}>
                                    <Ionicons name="alarm-outline" size={42} color={focused ? '#5DCCFC' : '#000'} />
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={Dashboard}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons name="settings-outline" size={28} color={focused ? '#5DCCFC' : '#000'} />
                                    <Text style={{ fontSize: 16, color: focused ? '#5DCCFC' : '#000' }}>
                                        Settings
                                    </Text>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Account"
                        component={UserProfile}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Feather name="user" size={28} color={focused ? '#5DCCFC' : '#000'} />
                                    <Text style={{ fontSize: 16, color: focused ? '#5DCCFC' : '#000' }}>
                                        Profile
                                    </Text>
                                </View>
                            ),
                        }}
                    />
                </Tab.Navigator>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

export default TabNavigator;