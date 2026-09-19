import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [consejo, setConsejo] = useState('Presiona el botón para recibir un consejo.');
  const [cargando, setCargando] = useState(false);

  const obtenerConsejo = async () => {
    setCargando(true);
    try {
      const respuesta = await axios.get('	https://api.adviceslip.com/advice');
      setConsejo(respuesta.data.slip.advice);
    } catch (error) {
      setConsejo('Hubo un error al obtener el consejo.');
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consejo del Día</Text>
      
      {cargando ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.texto}>{consejo}</Text>
      )}

      <Button 
        title="Ver Consejo" 
        onPress={obtenerConsejo} 
        disabled={cargando} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  texto: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
}); 

