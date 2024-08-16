
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import scenePlacements from '@/lib/scene-map'

export interface SceneProps {
    width: number;
    height: number;
}
   
type Position = {
  x: number,
  y: number,
  z: number
}


const Scene: React.FC<SceneProps>  = ({width, height}) => {
    const mount = useRef<HTMLDivElement>(null);
   
    useEffect(() => {

      const scenePlacement = scenePlacements[Math.floor(Math.random()*4)];
      // const scenePlacement = scenePlacements[4];
      const sceneName = scenePlacement.sceneName;
      const cameraPlacement = scenePlacement.cameraPlacement;
      const characters = scenePlacement.characters;

      // 创建场景
      const scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xa0a0a0 );
			// scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

      // 添加光源
			const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 3 );
			hemiLight.position.set( 0, 20, 0 );
			scene.add( hemiLight );

      // const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
      // dirLight.position.set( 3, 10, 10 );
      // dirLight.castShadow = true;
      // dirLight.shadow.camera.top = 2;
      // dirLight.shadow.camera.bottom = - 2;
      // dirLight.shadow.camera.left = - 2;
      // dirLight.shadow.camera.right = 2;
      // dirLight.shadow.camera.near = 0.1;
      // dirLight.shadow.camera.far = 40;
      // scene.add( dirLight );
   
      // 添加相机
      const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );
      const position = cameraPlacement.position;
			camera.position.set( position.x, position.y, position.z );
      // const lookAtPosition = new THREE.Vector3(0, 1, 4);
      // camera.lookAt(lookAtPosition);

   
      // 创建渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      const dom = renderer.domElement;

      const controls = new OrbitControls( camera, dom);
      controls.enablePan = true;
      controls.enableZoom = true;
      const target = cameraPlacement.target;
      controls.target.set( target.x, target.y, target.z );
      controls.update();
      

      if (mount.current) {
        mount.current.appendChild(renderer.domElement);
      }
    
      const clock = new THREE.Clock();
   
      const loader = new GLTFLoader();

      const mixer = new THREE.AnimationMixer( scene );

			// loader.load( '/'+ sceneName + '.glb', function ( gltf ) {

      //     console.log("gltf", gltf)

			// 		const model = gltf.scene;
			// 		scene.add( model );
      //     model.position.set(0, -10, 0);

			// 		model.traverse( function ( object ) {

			// 			if ( object.isMesh ) object.castShadow = true;

			// 		} );

			// 		const skeleton = new THREE.SkeletonHelper( model );
			// 		skeleton.visible = false;
			// 		scene.add( skeleton );

      //     const animations = gltf.animations;
          
      //     const mixer = new THREE.AnimationMixer( model );
      //     if(animations.length > 0) {
      //       const action = mixer.clipAction( animations[0]);
      //       action.play();
      //     }



			// 		animate();


      //     // 渲染循环
      //     function animate() {
      //       requestAnimationFrame( animate );
            
      //       if(animations.length > 0) {
      //         const mixerUpdateDelta = clock.getDelta();
      //         mixer.update( mixerUpdateDelta );
      //       }

      //       renderer.render( scene, camera );
      //     }
			// } );
      
      
      async function loadScene( sceneUrl: string ) {
        try {
          const character = await loader.loadAsync(sceneUrl);
          const model = character.scene;
          scene.add(model);
        } catch (error) {
          console.error('Error loading the model:', error);
        }
      }

      async function loadModelWithAnima(characterUrl: string, position: Position, rotateDeg: number) {
        const character = await loader.loadAsync(characterUrl);
        const model = character.scene;
        // console.log("character", character)
        scene.add(model);
        model.position.set(position.x, position.y, position.z);
        model.rotation.set(
          0,
          THREE.MathUtils.degToRad(rotateDeg),
          0,
        );
        // const clip = character.animations[0];
        
        const clip = character.animations.find(animation => animation.name == characters[0].animation);
        const action = mixer.clipAction(clip as THREE.AnimationClip, model);
        action.play();
    }

      async function loadModelsAndAnimations() {
        // for (let index = 0; index < models.length; index++) {
        //   await loadModel(models[index])
        // }
        await loadScene('/'+ sceneName + '.glb');
        await loadModelWithAnima('/' + characters[0].name + '.glb', characters[0].position, characters[0].angle);
        await loadModelWithAnima('/' + characters[1].name + '.glb', characters[1].position, characters[1].angle);
        animate();
        function animate() {
          requestAnimationFrame( animate );
          
          const mixerUpdateDelta = clock.getDelta();
          mixer.update( mixerUpdateDelta );
  
          renderer.render( scene, camera );
        }
      }
      loadModelsAndAnimations();
      // return () => {
      //   mount.current.removeChild(dom);
      // };
    }, [width, height]);
   
    return (
      <div ref={mount} />
    );
};
 
export default Scene;