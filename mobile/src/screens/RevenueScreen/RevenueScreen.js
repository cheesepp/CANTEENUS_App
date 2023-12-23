import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Button, FlatList, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RevenueItem from './RevenueItem';

// Tạm thời
const data = [
    {
        time: 'Tháng 1',
        totalRevenue: 1000000,
        totalSpending: 500000,
        profit: 500000,
    },
    {
        time: 'Tháng 2',
        totalRevenue: 1200000,
        totalSpending: 600000,
        profit: 600000,
    },
    {
        time: 'Tháng 3',
        totalRevenue: 900000,
        totalSpending: 400000,
        profit: 500000,
    },
    {
        time: 'Tháng 4',
        totalRevenue: 1100000,
        totalSpending: 550000,
        profit: 550000,
    },
];

const Revenue = ({ navigation }) => {
    const [filterColor, setFilterColor] = useState('#B2B2B2');
    const [showOptions, setShowOptions] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const years = ['2022', '2023'];

    const applyFilter = () => {
        if (selectedMonth && selectedYear) {
            setFilterColor('#279CD2');
            setAppliedFilters([{ month: selectedMonth, year: selectedYear }]);

            // Thêm cái hàm lấy dữ liệu ở đây fetch data
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
                            <View style={[styles.filterResult, { backgroundColor: '#279CD2' }]}>
                                <Text style={styles.text}>{`${filter.month}`}</Text>
                            </View>
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
                                selectedValue={selectedMonth}
                                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                            >
                                <Picker.Item label="Chọn tháng" value="" />
                                {months.map((month, index) => (
                                    <Picker.Item key={index} label={month} value={month} />
                                ))}
                            </Picker>

                            <Picker
                                selectedValue={selectedYear}
                                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                            >
                                <Picker.Item label="Chọn năm" value="" />
                                {years.map((year, index) => (
                                    <Picker.Item key={index} label={year} value={year} />
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