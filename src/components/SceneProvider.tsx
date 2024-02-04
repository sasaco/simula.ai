"use client";
import { createContext, useContext } from 'react';
import * as THREE from 'three';

// SceneContextを作成
export const SceneContext = createContext<THREE.Scene | null>(null);

// SceneContextを使用するためのカスタムフック
export function useScene(): THREE.Scene {
  const scene = useContext(SceneContext);
  if (!scene) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return scene;
};


// SceneContextのProviderコンポーネント
export function SceneProvider({ children }: { children: React.ReactNode })
{
  const scene = new THREE.Scene(); // Sceneインスタンスを作成
  // Providerを通じてsceneを渡す
  return <SceneContext.Provider value={scene}>{children}</SceneContext.Provider>;
}