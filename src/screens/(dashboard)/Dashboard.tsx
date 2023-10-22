import React, { useRef, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';
import { withExpoSnack } from 'nativewind';


import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';

const Dashboard = () => {
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
    return (
        <SafeAreaView className='px-[2vh] bg-white h-[100vh]'>
            <View className='h-[15vh] flex flex-row items-center justify-between'>
                <Text className='text-[#111111] text-[21px] max-w-7/12 font-medium'>Hello, Peace Ishimwe 🌿</Text>
                <View className='p-2 rounded-full bg-[#F3F9F6]'>
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
            <View>
                
            </View>
        </SafeAreaView>
    )
}

export default withExpoSnack(Dashboard) 