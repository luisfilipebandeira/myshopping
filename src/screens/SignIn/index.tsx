import React, { useState } from 'react';

import auth from '@react-native-firebase/auth'

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleCreateUserAccount(){
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => Alert.alert('Usuário criado com sucesso'))
    .catch(error => {
      if(error.code === 'auth/email-already-in-use'){
        return Alert.alert('Este e-mail não está disponível.')
      }

      if(error.code === 'auth/invalid-email'){
        return Alert.alert('Este e-mail não é valido.')
      }

      if(error.code === 'auth/weak-password'){
        return Alert.alert('A senha deve ter no minimo 6 digitos')
      }
    })
  }

  function handleSignInWithEmailAndPassword(){
    auth().signInWithEmailAndPassword(email, password)
    .then(({ user }) => console.log(user))
    .catch(error => {
      if(error.code === 'auth/user-not-found'){
        Alert.alert('Usuário não encontrado. Email ou a senha estão inválidos!')
      }
    })
  }

  function handleForgotPassword(){
    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert('Siga as instruções que foram enviadas no seu email'))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        onChangeText={setPassword}
        secureTextEntry
        keyboardType="email-address"
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}