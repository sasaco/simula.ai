import { SceneProvider } from '../components/SceneContext';
import ThreeCanvas from '../components/ThreeCanvas';

export default function Home() {
  return (
    <SceneProvider>
      <ThreeCanvas/>
    </SceneProvider>
  );
}
