import { Redirect } from 'expo-router';
import { Routes } from '../src/helpers/Routes';

export default function Index() {
  return <Redirect href={Routes.loginScreen} />;
}
