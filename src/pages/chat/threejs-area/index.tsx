

// import { useState } from 'react';
// import Character, { CharacterProps } from './character';

// 场景变化的demo
// import Scene from './scene';

// 控制逻辑的demo
import Scene from './controlByMessage';

export interface SceneProps {
  width: number;
  height: number;
}
   
// const ThreeJsArea: React.FC<CharacterProps>  = ({animationName, width, height}) => {
const ThreeJsArea: React.FC<SceneProps>  = ({width, height}) => {
  // const [sceneName, setSceneName] = useState("street")
  return (
    <>
      <Scene width={width} height={height} />
      {/* <Character animationName={animationName} width={width} height={height} /> */}
      {/* <button onClick={() => setSceneName("scene2")}>scene2</button>
      <button onClick={() => setSceneName("scene3")}>scene3</button> */}
    </>
  );
};
 
export default ThreeJsArea;