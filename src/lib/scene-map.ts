interface Character {
    name: string;
    animation: string;
    position: {x: number, y: number, z: number};
    angle: number;
}
interface Camera {
    position: {x: number, y: number, z: number};
    target : {x: number, y: number, z: number};
}

interface ScenePlacement {
    sceneName: string;
    cameraPlacement: Camera;
    characters: Character[];
}

const scenePlacements: ScenePlacement[] = [
    {
        sceneName: "cafe",
        cameraPlacement: {
            position: {x: -3, y: 1.5, z: 1},
            target: {x: 2, y: 1, z: 0}
        },
        characters: [
            {
                name: "StudentGirlWithAnima",
                animation: "Talking",
                position: {x: 1, y: 0, z: 0},
                angle: -20
            },
            {
                name: "StudentBoyWithAnima",
                animation: "Talking",
                position: {x: 1, y: 0, z: 1},
                angle: 180
            },
        ]
    },
    {
        sceneName: "station",
        cameraPlacement: {
            position: {x: 4, y: 1.5, z: 12},
            target: {x: 0, y: 1.5, z: 0}
        },
        characters: [
            {
                name: "GirlWithAnima",
                animation: "TalkingWithPhone",
                position: {x: 3.5, y: 0, z: 4},
                angle: -80
            },
            {
                name: "BoyWithAnima",
                animation: "TalkingWithPhone",
                position: {x: 3, y: 0, z: 6},
                angle: -100
            },
        ]
    },
    {
        sceneName: "office",
        cameraPlacement: {
            position: {x: 6, y: 1.5, z: -1},
            target: {x: 0, y: 1.5, z: 2}
        },
        characters: [
            {
                name: "WorkGirlWithAnima",
                animation: "Arguing",
                position: {x: 1, y: 0, z: 1.5},
                angle: 45
            },
            {
                name: "WorkBoyWithAnima",
                animation: "Arguing",
                position: {x: 1.5, y: 0, z: 2.5},
                angle: -145
            },
        ]
    },
    {
        sceneName: "factory",
        cameraPlacement: {
            position: {x: 0, y: 2, z: 0},
            target: {x: 0, y: 1, z: 4}
        },
        characters: [
            {
                name: "GirlWithAnima",
                animation: "Dancing",
                position: {x: 1, y: 0, z: 4},
                angle: -90
            },
            {
                name: "BoyWithAnima",
                animation: "Dancing",
                position: {x: -1, y: 0, z: 4},
                angle: 90
            },
        ]
    },
    {
        sceneName: "street",
        cameraPlacement: {
            position: {x: 4, y: 2.5, z: 8},
            target: {x: 0, y: 1, z: 0}
        },
        characters: [
            {
                name: "GirlWithAnima",
                animation: "Fighting",
                position: {x: 1.5, y: 0, z: 1},
                angle: 0
            },
            {
                name: "BoyWithAnima",
                animation: "Fighting",
                position: {x: 1.5, y: 0, z: 3.5},
                angle: 180
            },
        ]
    },
]

export default scenePlacements;