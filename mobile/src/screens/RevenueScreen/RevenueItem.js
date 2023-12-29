import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'


export default function RevenueItem({ item }) {
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    const getProfitColor = (profit) => {
        return profit < 0 ? '#FF5B5B' : '#28D62F';
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{item.month}/{item.year}</Text>
            <Text style={styles.text}>Tổng thu: {formatCurrency(item.monthProfit.expense)}</Text>
            <Text style={styles.text}>Tổng chi: {formatCurrency(item.monthProfit.income)}</Text>
            <Text style={[styles.profit, { color: getProfitColor(item.monthProfit.profit) }]}>
                {formatCurrency(item.monthProfit.profit)}
            </Text>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 120,
        borderRadius: 25,
        backgroundColor: '#4554DC',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },

    text: {
        color: '#ffffff',
        // textAlign: 'left',
        fontFamily: 'Monsterrat',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 2,
    },
    profit: {
        // color: '#28D62F',
        textAlign: 'right',
        fontFamily: 'Monsterrat',
        fontWeight: 'bold',
        fontSize: 25,
    }

})