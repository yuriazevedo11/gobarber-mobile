import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import {
  Container,
  Separator,
  Title,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Title>Meu perfil</Title>

        <Form>
          <FormInput
            value={name}
            icon="person-outline"
            autoCorrect={false}
            placeholder="Nome completo"
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            onChangeText={setName}
          />

          <FormInput
            value={email}
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            blurOnSubmit={false}
            returnKeyType="next"
            ref={emailRef}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            value={oldPassword}
            icon="lock-outline"
            placeholder="Sua senha atual"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            blurOnSubmit={false}
            ref={oldPasswordRef}
            onChangeText={setOldPassword}
          />

          <FormInput
            value={password}
            icon="lock-outline"
            placeholder="Sua nova senha"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            blurOnSubmit={false}
            ref={passwordRef}
            onChangeText={setPassword}
          />

          <FormInput
            value={confirmPassword}
            icon="lock-outline"
            placeholder="Confirme sua senha"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            ref={confirmPasswordRef}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do GoBarber</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

function navIcon({ tintColor }) {
  return <Icon name="person" size={20} color={tintColor} />;
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: navIcon,
};

navIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
