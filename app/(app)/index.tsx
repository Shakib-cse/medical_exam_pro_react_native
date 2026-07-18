import { Redirect } from 'expo-router';
import { Routes } from '../../src/helpers/Routes';

export default function AppIndex() {
  return <Redirect href={Routes.homeScreen} />;
}
