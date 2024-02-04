import { SceneProvider } from '../components/SceneProvider';
import ThreeCanvas from '../components/ThreeCanvas';

export default function Home() {
  return (
    <SceneProvider>
      <ThreeCanvas/>
    </SceneProvider>
  );
}
