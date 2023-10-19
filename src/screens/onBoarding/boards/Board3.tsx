import React from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import ButtonOne from '../../../components/buttons/buttonOne';

interface onBoardingProps {
    back: () => void;
}

const Board3: React.FC<onBoardingProps> = ({ back }) => {

    const linkTo = useLinkTo();

    return (
        <View className='h-[100vh] bg-white flex justify-between'>
            <ImageBackground className='h-[76] w-full' source={require('../../../assets/onBoarding/bgImageTop.png')}>
            </ImageBackground>
            <View className='main-view px-[35] mt-[-65px]'>
                <Ionicons onPress={back} name="arrow-back" size={28} color="black" />
                <View className='flex flex-row items-center justify-center mt-5'><Image source={require("../../../assets/onBoarding/trackCrops.png")} /></View>
                <Text className='font-bold text-[24px] text-center mt-8'>Track your daily soil &{"\n"}crops life with us!</Text>
                <Text className='text-base text-center text-textMainColor mt-6'>Achieve your crop's health goals with a {"\n"}simple tap!</Text>
                <View className='flex flex-row gap-x-1 items-center justify-center mt-12'>
                    <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-[#979797]' ></TouchableOpacity>
                    <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-[#979797]' ></TouchableOpacity>
                    <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-subMainColor' ></TouchableOpacity>
                </View>
            </View>
            <ButtonOne name='NEXT' onPress={()=>linkTo("/personalize")} />
        </View>
    );
};

export default Board3;