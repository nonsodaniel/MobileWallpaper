/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button
} from 'react-native';

const App: () => React$Node = () => {
    let [time, setTime] = useState(0);
    const [name, setName] = useState("-");
    const [age, setAge] = useState("-");
    const [info, setInfo] = useState({ school: "-", religion: "-" })
    const [texts, setTexts] = useState("HERE")
    const [people, setPeople] = useState([
        {
            name: "Elvis",
            name: "Nonso",
            name: "Kingsley",
            name: "Nj",
            name: "Bunmi"
        }
    ])
    console.log(people)
    const myTime = () => {
        setTimeout(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000);
    }
    const updateDetails = () => {
        setName("Nonso");
        setAge(21);
        setInfo({ school: "NOUN", religion: "JW" })
    }
    useEffect(() => {
        myTime()
    }, [time])
    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>Hello world, this is my first ever app and the time is {time}</Text>
                    <Text>My name is {name} and I'm {age} year of age</Text>
                    <Text>I'm a member of  {info.religion} and I attend {info.school} </Text>
                </View>
                <View style={styles.body}>
                    <Button title="Get Profile" onPress={updateDetails} />
                </View>
                {/* <Text style={{ color: "green" }}>This text containing my name updates at real time {texts}</Text>
        <TextInput placeholder="Enter your desired text here"
          multiline
          onChangeText={(val) => setTexts(val)} />
        <TextInput placeholder="Enter your desired age here"
          keyboardType="number-pad"
          onChangeText={(val) => setTexts(val)} /> */}
                {
                    people.map(x => {
                        console.log(x.name)
                        return (
                            <View key={x.name}>
                                <Text >{x.name}</Text>
                            </View>
                        )
                    })
                }

            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        backgroundColor: "pink",
        padding: 20,
    },
    body: {
        backgroundColor: "yellow"
    },
    myName: {
        backgroundColor: "green"
    }
})

export default App;
