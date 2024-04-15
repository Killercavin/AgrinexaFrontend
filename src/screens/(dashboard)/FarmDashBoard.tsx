import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';
import { withExpoSnack } from 'nativewind';
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import StatusCard from './cards/StatusCard';
import InfoCard from './cards/InfoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const FarmDashboard = () => {
    const pageRef = useRef<PagerView | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 0 && pageNumber <= 2) {
            setCurrentPage(pageNumber);
        }
    };
    const goToNextPage = () => {
        if (currentPage < 2) {
            handlePageChange(currentPage + 1);
            pageRef.current?.setPage(currentPage + 1);
        }
    };
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            handlePageChange(currentPage - 1);
            pageRef.current?.setPage(currentPage - 1);
        }
    };

    const [selectedField, setSelectedField] = useState<any>(null);
    console.log(selectedField)
    useEffect(() => {
        const retrieveSelectedField = async () => {
            try {
                // Retrieve the saved field object from local storage
                const savedFieldJSON = await AsyncStorage.getItem('selectedField');
                if (savedFieldJSON !== null) {
                    const savedField = JSON.parse(savedFieldJSON);
                    setSelectedField(savedField);
                }
            } catch (error) {
                console.error('Error retrieving field data from local storage:', error);
            }
        };
        retrieveSelectedField();
        return () => {
        };
    }, []);

    return (
        <SafeAreaView className="px-[2vh] bg-[#F5FDFB] h-[100vh]">
            <View className="h-[15vh] pt-[3vh] flex flex-row items-center justify-between">
                <Text className="text-[#111111] text-[21px] max-w-7/12 font-medium">
                    {selectedField?.name} 🌿
                </Text>
                <View className="p-2 rounded-full bg-[#F3F9F6]">
                    <Ionicons name="settings" size={28} color="#0DFF4D" />
                </View>
            </View>
            <PagerView style={{ flex: 1 }} initialPage={0} ref={pageRef}>
                <View key={1}>
                    <Slide1 next={goToNextPage} />
                </View>
                <View key={2}>
                    <Slide2 next={goToNextPage} back={goToPreviousPage} />
                </View>
                <View key={3}>
                    <Slide3 back={goToPreviousPage} />
                </View>
            </PagerView>
            <Text className="text-[#111111] text-[21px] max-w-7/12 font-medium text-center">
                {selectedField?.name}
            </Text>
            <ScrollView style={{ maxHeight: '53%' }} className='mx-[-2vh]'>
                <View className="mt-5 px-[2vh]">
                    <View
                        className=""
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View className="w-[31%]">
                            <StatusCard icon={<MaterialCommunityIcons name="longitude" size={28} color="#0DFF4D" />} iconName='Longitude' value={selectedField?.long} />
                        </View>
                        <View className="w-[31%]">
                            <StatusCard icon={<MaterialCommunityIcons name="latitude" size={28} color="#0DFF4D" />} iconName='Latitude' value={selectedField?.lat} />
                        </View>
                        <View className="w-[31%]">
                            <StatusCard icon={<MaterialIcons name="photo-size-select-large" size={28} color="#0DFF4D" />} iconName='Farm size' value={selectedField?.size} />
                        </View>
                    </View>
                    <View
                        className=""
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            marginTop: 12
                        }}
                    >
                        <View className="w-[31%]">
                            <StatusCard icon={<FontAwesome5 name="temperature-high" size={28} color="#0DFF4D" />} iconName='Temperature' />
                        </View>
                        <View className="w-[31%]">
                            <StatusCard icon={<Entypo name="drop" size={28} color="#0DFF4D" />} iconName='Moisture' />
                        </View>
                        <View className="w-[31%]">
                            <StatusCard icon={<MaterialIcons name="waves" size={28} color="#0DFF4D" />} iconName='Humidity' />
                        </View>
                    </View>
                    <View
                        className="mb-28"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'stretch',
                            marginTop: 12
                        }}
                    >
                        <View className="w-8/12">
                            <InfoCard />
                        </View>
                        <View className="w-[31%]">
                            <StatusCard icon={<MaterialIcons name="sensors" size={28} color="#0DFF4D" />} iconName='Sensor status' value='ON' />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default withExpoSnack(FarmDashboard);