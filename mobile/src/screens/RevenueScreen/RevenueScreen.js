import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Button, FlatList, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RevenueItem from './RevenueItem';

import { useUser } from '../../models/userContext';
import { api } from '../../constants/api';


// import {} from '../../constants/api';


const getRevenue = async (token, year) => {
    year = parseInt(year);


    // nếu không nhập tháng thì lấy profit 1 năm
    try {
        // Lấy profit 1 năm
        const res = await fetch(`${api.getProfitOfaYear}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ year }),
        });
        const jsonRes = await res.json();
        if (jsonRes.success !== 200) {
            console.log('Error in getting profit of a year: ', jsonRes.message);
        }

        return jsonRes.list;

    } catch (error) {
        console.log('Error when get revenue: ', error);
        throw (error);
    }


}

const getYear = async (token) => {

    try {
        const res = await fetch(`${api.getYears}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const jsonRes = await res.json();
        if (jsonRes.success !== 200) {
            console.log('Error in getting years', jsonRes.message);
        }
        console.log('Success years', jsonRes.years);
        // Nó sẽ trả về list [2021, 2022, 2023]
        setYears(jsonRes.years);

    } catch (error) {
        console.log('Error when get years for modal: ', error);
        throw (error);
    }
}

const Revenue = ({ navigation }) => {
    const [filterColor, setFilterColor] = useState('#B2B2B2');
    const [showOptions, setShowOptions] = useState(false);
    // const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [years, setYears] = useState([]); // [2021, 2022, 2023

    const { user } = useUser();
    const [data, setData] = useState([]);

    // console.log('user context token: ', user.jwt);

    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    // const years = ['2022', '2023']; // Tạm thời lấy cứng
    const getYear = async (token) => {

        try {
            const res = await fetch(`${api.getYears}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const jsonRes = await res.json();
            if (jsonRes.success !== 200) {
                console.log('Error in getting years', jsonRes.message);
            }
            console.log('Success years', jsonRes.years);
            // Nó sẽ trả về list [2021, 2022, 2023]
            setYears(jsonRes.years);
    
        } catch (error) {
            console.log('Error when get years for modal: ', error);
            throw (error);
        }
    }
    getYear(user.jwt);

    console.log('Res years', years);
    const applyFilter = async () => {
        if (selectedYear) {
            setFilterColor('#279CD2');
            setAppliedFilters([{ year: selectedYear }]);

            // console.log('Month, year', selectedMonth, selectedYear);
            // Lấy profit theo năm và tháng
            try {
                const dataFromDB = await getRevenue(user.jwt, selectedYear);
                console.log('Revenue: ', dataFromDB);
                setData(dataFromDB);
            } catch (error) {
                console.log('Error in revenue: ', error);
                throw (error);
            }


        }
        setModalVisible(false);
    };




    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Doanh Thu',
            headerStyle: {
                backgroundColor: '#4554DC',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'left',
        });
    }, [navigation]);

    const renderItem = ({ item }) => {
        return <RevenueItem item={item} />;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={{ backgroundColor: filterColor, padding: 10, borderRadius: 25 }}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.text}>Filter</Text>

                </TouchableOpacity>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {appliedFilters.map((filter, index) => (
                        <View key={index} style={{ flexDirection: 'row', marginRight: 10, marginLeft: 20 }}>
                            {/* <View style={[styles.filterResult, { backgroundColor: '#279CD2' }]}>
                                <Text style={styles.text}>{`${filter.month}`}</Text>
                            </View> */}
                            <View style={[styles.filterResult, { backgroundColor: '#279CD2' }]}>
                                <Text style={styles.text}>{`${filter.year}`}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Picker
                                selectedValue={selectedYear}
                                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                            >
                                <Picker.Item label="Chọn năm" value="" />
                                {years.map((year, index) => (
                                    <Picker.Item key={index} label={year.toString()} value={year.toString()} />
                                ))}
                            </Picker>

                            <Button title="Áp dụng" onPress={applyFilter} />
                        </View>
                    </View>
                </Modal>


            </View>
            <View style={styles.container}>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                // numColumns={3}
                />
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',

    },
    text: {
        color: '#ffffff',
        // textAlign: 'left',
        fontFamily: 'Monsterrat',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 2,
    },
    modalContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        elevation: 10,
        // alignItems: 'center',
        width: '80%'
    },
    filterContainer: {
        marginVertical: 10,
        alignItems: 'center',
        width: 100,
        height: 'fit-content',


    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterResult: {
        marginTop: 5,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        width: 'fit-content',
        height: 30,
        borderRadius: 25,
    }
});

export default Revenue;