import { SceneProvider } from '../components/SceneContext';
import Three from '../components/three';

export default function Home() {
  return (
    <SceneProvider>
      <Three/>
    </SceneProvider>
  );
}
