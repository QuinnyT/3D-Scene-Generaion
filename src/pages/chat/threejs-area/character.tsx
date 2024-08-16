
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface CharacterProps {
  animationName: string;
  width: number;
  height: number;
}
 
// interface ModelAnimation {
//   characterUrl: string;
//   animaUrl: string;
// }
type Position = {
  x: number,
  y: number,
  z: number
}

const Character: React.FC<CharacterProps> = ({animationName, width, height}) => {
    const mount = useRef<HTMLDivElement>(null);

    useEffect(() => {

      // 创建场景
      const scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xa0a0a0 );
			scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

      // 添加光源
			const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 1 );
			hemiLight.position.set( 0, 20, 0 );
			scene.add( hemiLight );

      const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
      dirLight.position.set( 3, 10, 10 );
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 2;
      dirLight.shadow.camera.bottom = - 2;
      dirLight.shadow.camera.left = - 2;
      dirLight.shadow.camera.right = 2;
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 40;
      scene.add( dirLight );
   
      // 添加相机
      const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 100 );
			camera.position.set( 5, 3, 4 );

   
      // 创建渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const dom = renderer.domElement;

      const controls = new OrbitControls( camera, dom);
      controls.enablePan = false;
      controls.enableZoom = true;
      controls.target.set( 0, 1, 0 );
      controls.update();
      

      if (mount.current) {
        mount.current.appendChild(renderer.domElement);
      }
  
  
      const clock = new THREE.Clock();
   
      const loader = new GLTFLoader();
      
      const mixer = new THREE.AnimationMixer(scene);

      // async function loadModel({characterUrl, animaUrl}: ModelAnimation) {
      //   try {
      //     const character = await loader.loadAsync(characterUrl);
      //     const model = character.scene;
      //     scene.add(model);
          
      //     const anima = await loader.loadAsync(animaUrl);
      //     const clip = anima.animations[0];
      //     const action = mixer.clipAction(clip, model);
      //     action.play();

      //   } catch (error) {
      //     console.error('Error loading the model:', error);
      //   }
      // }

      async function loadModelWithAnima(characterUrl: string, position: Position, rotateDeg: number) {
          const character = await loader.loadAsync(characterUrl);
          const model = character.scene;
          console.log("character", character)
          scene.add(model);
          model.position.set(position.x, position.y, position.z);
          model.rotation.set(
            0,
            THREE.MathUtils.degToRad(rotateDeg),
            0,
        );
          // const clip = character.animations[0];
          const clip = character.animations.find(animation => animation.name == animationName);
          const action = mixer.clipAction(clip as THREE.AnimationClip, model);
          action.play();
      }
      
      async function loadModelsAndAnimations() {
        // for (let index = 0; index < models.length; index++) {
        //   await loadModel(models[index])
        // }
        await loadModelWithAnima('/GirlWithAnima.glb', {x: 1, y: 0, z: 0}, -90);
        await loadModelWithAnima('/BoyWithAnima.glb', {x: -1, y: 0, z: 0}, 90);
        animate();
      }

      // 渲染循环
      function animate() {
        requestAnimationFrame( animate );
        
        const mixerUpdateDelta = clock.getDelta();
        mixer.update( mixerUpdateDelta );

        renderer.render( scene, camera );
      }

      loadModelsAndAnimations()
  

      // return () => {
      //   // 组件卸载时，清理DOM
      //   mount.current.removeChild(dom);
      // };
    }, [animationName, width, height]);
   
    return (
      <div ref={mount} />
    );
};
 
export default Character;