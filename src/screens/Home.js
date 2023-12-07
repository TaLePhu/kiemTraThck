import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { TouchableOpacity } from 'react-native-web';
import { addUser, deleteUser } from '../redux/reducer';

export default function Home() {
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState([]);

    const state = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [dataList, setData] = useState([])

    const APIurl = `https://6555d54484b36e3a431e6fc2.mockapi.io/apick1`

    
    const fetchData= async()=>{
      try{
        const response = await fetch(APIurl, {
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        })
        if(!response.ok){
          throw new Error('fetch fail')
        }
        const data = await response.json();
        console.log(data)
        setData(data)
      }catch(error){
        throw new Error('Error',error)
      }
    }

    const viewList=async()=>{
      fetchData();
    }
    //role state
    const renderRoles = (roles) => {
      return roles.map((role, index) => (
        <View key={index}>
          <Text>Role {index + 1}:</Text>
          <Text>ABC: {role.abc}</Text>
          <Text>XYZ: {role.xyz}</Text>
        </View>
      ));
    };
    //
    const renderRolesFromApi = (roles) => {
      console.log(roles); // Kiểm tra dữ liệu roles từ API
      return roles.map((role, index) => (
        <View key={index}>
          <Text>Role {index + 1}:</Text>
          <Text>ABC: {role.abc}</Text>
          <Text>XYZ: {role.xyz}</Text>
        </View>
      ));
    };
    //add
    // const add = async (id, username, password, role) => {
    //   const userInfo = { id, username, password, role };
    //   dispatch(addUser(userInfo));
    
    //   try {
    //     const response = await fetch(APIurl, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         id: id,
    //         username: name,
    //         password: pass,
    //         role: role
    //       })
    //     });
    
    //     if (!response.ok) {
    //       throw new Error('add fail');
    //     }
    
    //     const data = await response.json();
    //     setData(data);
    //   } catch (error) {
    //     throw new Error('Error', error);
    //   }
    // };
    //delete
  const deletee=async(id) => {
    dispatch(deleteUser(id))
    try{
      const APIurl=`https://6555d54484b36e3a431e6fc2.mockapi.io/apick1/${id}`
      const response= await fetch(APIurl, {
        method: 'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
      })
      if(!response.ok){
        throw new Error('delete fail')
      }
      const data = await response.json();
      setData(data)
    }catch(error){
      throw new Error("Error", error)
    }
  }
    
    
    
    
    
  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <View>
          <Text>ID:</Text>
          <TextInput
            placeholder='Nhap ID'
            onChangeText={setId}
            style={styles.input}
          />
        </View>
        <View>
          <Text>UserName:</Text>
          <TextInput
            placeholder='Nhap username'
            onChangeText={setName}
            style={styles.input}
          />
        </View>
        <View>
          <Text>PassWord:</Text>
          <TextInput
            placeholder='Nhap Pass'
            onChangeText={setPass}
            style={styles.input}
          />
        </View>
        <View>
          <Text>Role:</Text>
          <TextInput
            placeholder='Nhap role'
            onChangeText={(text)=>setRole(text)}
            style={styles.input}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.btn} 
          onPress={()=>add(id,name,pass,role)} >
            <Text style={styles.txtBtn}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* view */}
      <View>
        <ScrollView>
        <FlatList
          data={state}
          renderItem={({item})=>(
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text>Id: {item.id}</Text>
                <Text>UserName: {item.username}</Text>
                <Text>PassWord: {item.password}</Text>
                {renderRoles(item.role)}
              </View>
              <View>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.txtBtn}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                onPress={()=>deletee(item.id)}>
                  <Text style={styles.txtBtn}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        </ScrollView>
      </View>

      {/* View */}
      <View>
        <TouchableOpacity style={styles.btn} 
          onPress={()=>viewList()}
        >
          <Text style={styles.txtBtn}>View</Text>
        </TouchableOpacity>
      </View>
      {/* render APi */}
      <View>
        <ScrollView>
          <FlatList
            data={dataList}
            renderItem={({item})=>(
              <View style={{flexDirection: 'row'}}>
                <View>
                <Text>Id: {item.id}</Text>
                <Text>UserName: {item.username}</Text>
                <Text>PassWord: {item.password}</Text>
                {renderRolesFromApi(item.role)}
              </View>
              <View>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.txtBtn}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                onPress={()=>deletee(item.id)}>
                  <Text style={styles.txtBtn}>Delete</Text>
                </TouchableOpacity>
              </View>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10
  },
  input:{
    width:300,
    borderWidth:1,
    borderRadius: 10,
    padding: 10,
    backgroundColor:'gray'
  },
  btn:{
    width:100,
    height:40,
    backgroundColor: 'pink',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems:'center'
  },
  txtBtn:{
    fontSize: 18,
    fontWeight: 'bold'
  }
})