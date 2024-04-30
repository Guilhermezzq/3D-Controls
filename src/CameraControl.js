import { CameraControls, Grid} from "@react-three/drei";
import { useRef } from "react";

import { buttonGroup, button, useControls } from "leva";

import * as THREE from "three";



const CameraControl = () => {

    // 2 - Criar uma referencia para camera
  const cameraControlRef = useRef();

    // Ler utilitários matemáticos de three.js
  const {DEG2RAD} = THREE.MathUtils; 
  console.log(DEG2RAD);

  // 4 - Adicionar controles no painel escrevendo 

  const cameraControls = useControls("Camera Controls", {
    // Girar a camera horizontal 
    horizontalRotation: buttonGroup({
      label: "Horizontal R",
      opts: {
        // Modicar numero 0.017533 por DEG2RAD
        "45deg": () => cameraControlRef.current.rotate(45 * DEG2RAD, 0, true),
        "90deg": () => cameraControlRef.current.rotate(-90 * DEG2RAD, 0, true),
        "360deg": () => cameraControlRef.current.rotate(360 * DEG2RAD, 0, true),
      },
    }) ,

    // 5 - Girar a camera na vertical

    verticalRotation: buttonGroup({
      label: "Vertical R",
      opts: {
        // Agora aqui escrevemos zero no primeiro campo para não girarmos a câmera horizontalmente.
        "20deg": () => cameraControlRef.current.rotate(0, 20 * DEG2RAD, true),
        "-40deg": () => cameraControlRef.current.rotate(0, -40 * DEG2RAD, true),
        
      },
    }) ,

    // 6 - Metodo do caminho

    truckGroup: buttonGroup({
      label: "Truck R",
      opts: {
        // a câmera moverá uma unidade para a direita, e cada vez
        "(1,0)": () => cameraControlRef.current.truck(1, 0, true),

        //  a câmera moverá uma unidade para baixo e este botão moverá a câmera,
        "(0,+1)": () => cameraControlRef.current.truck(0, 1, true),

        // moverá a câmera uma unidade para a esquerda e uma unidade para cima.
        "(-1,-1)": () => cameraControlRef.current.truck(-1, -1, true),
        
      },
    }) ,

    // 7 - Método do Zoom

    zoomGroup: buttonGroup({
      label: "Zoom",
      opts: {
        // Agora aqui escrevemos zero no primeiro campo para não girarmos a câmera horizontalmente.
        0.25: () => cameraControlRef.current.zoom(0.25, true),
        "-0.25": () => cameraControlRef.current.zoom(-0.25, true),
        
      },
    }) ,

    // 8 - Método é o conjunto irá mover a câmera e olhar para o ponto específico

    lookAtBox: button(() => {
      // Aceita três posições X, Y ,Z ;Ponto que você deseja que a câmera olhe X, Y, Z ; 
      cameraControlRef.current.setLookAt(0, 1, 3, 0, 0, 0, true );
    }),

  });

 
    return (
        
        <>

    {/* // 2 - Primeiro Controle  */}
    <CameraControls  
    ref={cameraControlRef} // 3 - Atribuímos ele na camera
    smoothTime={0.35}
    // Podemos aumentar ou diminuir a velocidade da animação usando o atributo smooth time.

    
    /> 
     {/* // O controle da câmera é semelhante aos controles de órbita, mas a diferença é que ele suporta movimentos suaves transições e mais recursos. */}






     {/* // 1 - Grid e importar ela apertando ctrl + espaço  */}
    <Grid 

    sideDouble
    args={[30, 30]} // Decidir o número de grades dentro da matriz na posição X, Y , Z 
    cellSize={0.25} // Decidir o tamanho das celulas e padrão= 0.5, 
    cellColor="black" // Alterar a cor das células
    sectionSize={1} // Alterar tamanho da seção, valor padrão=1 valor maior que 1 aumentará 
    sectionThickness={1.5} // Valor da espessura da seção , padrão = 1.5
    sectionColor="#6364A6" // Alterar cor da seção 
    fadeDistance={20} // Distância que a grade começa a desaparecer, valor padrão e 100
    fadeStrength={1} // Decidir a intensidade do campo menor que 1 campo diminui e mair aumenta



    />

      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="#B900F7" />
      </mesh>

    </>

  )
}

export default CameraControl;
