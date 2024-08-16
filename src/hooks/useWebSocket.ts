import { useEffect, useRef, useState } from 'react';
import { create } from "zustand";

// import * as protobuf from "protobufjs";
// import { ToGame, FromGame } from '@/proto/TCProto_pb2';
import * as protobuf from "protobufjs";
import { IntVector, MoveState, CreatePlayerReq, MoveAction, BubbleAction, TeleportAction, AnimateAction, MoveToAction, ToGame, PlayerState  } from '@/lib/proto-types'


interface usePlayersStore {
  players: PlayerState[],
  addPlayers: (newPlayers: CreatePlayerReq[]) => void,
  setPosAndYaw: (newState: {playerId: number, position: IntVector, yaw: number}) => void,
  setMovement: (movement: {playerId: number, moveState: MoveState}) => void,   // 返回的数据与传入的一致，所以直接用MoveAction
  // setMoveTo: (moveTo: MoveToAction) => void,
  setBubble: (bubble: {playerId: number, text: string}) => void,
  clearBubble: (playerId: number) => void,
  // setTeleport: (teleportAction: TeleportAction) => void,
  setAnimation: (animateAction: AnimateAction) => void
  stopAnimation: (animateAction: AnimateAction) => void
  setMoveToInProgress: (inProgressState: {playerId: number, state: boolean}) => void
  setNearbyPlayerIds: (nearby: {playerId: number, nearbyPlayerIds: number[]}) => void
}

export const usePlayers = create<usePlayersStore>((set) => ({
  players: [
    {
      playerId: 10001,
      position: {
        x: 1,
        y: 0,
        z: 6
      },
      moveState: MoveState.STOP,
      yaw: 60,
      bubbleText: "",
      animateState: 0,
      chattingPlayerId: 0,
      nearbyPlayerIds: [],
      moveToInProgress: false
    },
    {
      playerId: 10002,
      position: {
        x: 2,
        y: 0,
        z: -3
      },
      moveState: MoveState.STOP,
      yaw: 45,
      bubbleText: "",
      animateState: 0,
      chattingPlayerId: 0,
      nearbyPlayerIds: [],
      moveToInProgress: false
    },
    {
      playerId: 10003,
      position: {
        x: -4,
        y: 0,
        z: -4
      },
      moveState: MoveState.STOP,
      yaw: 0,
      bubbleText: "",
      animateState: 0,
      chattingPlayerId: 0,
      nearbyPlayerIds: [],
      moveToInProgress: false
    },
],

  addPlayers: (newPlayers) => set((state) => ({
    players: [
      ...state.players,
      ...newPlayers.map(newPlayer => {
        return {
          playerId: newPlayer.playerId,
          position: newPlayer.position,
          moveState: MoveState.STOP,
          yaw: newPlayer.yaw,
          bubbleText: "",
          animateState: 0,
          chattingPlayerId: 0,
          nearbyPlayerIds: [],
          moveToInProgress: false
        }
      })
    ]
  })),

  setPosAndYaw: (newState) => set((state) => ({
    players: state.players.map((item) => {
      if(item.playerId === newState.playerId) {
        return {
          ...item,
          position: newState.position,
          yaw: newState.yaw,
		}
      }
      else return item
    })
  })),

  setMovement: (movement) => set((state) => ({
    players: state.players.map((item) => {
      if(item.playerId === movement.playerId) {
        return {
			...item,
			moveState: movement.moveState,
		}
      }
      else return item
    })
  })),

  // setMoveTo: (moveTo) => set((state) => ({
  //   players: state.players.map((item) => {
  //     if(item.playerId === moveTo.playerId) {
  //       return {
	// 		...item,
	// 		position: moveTo.position,
	// 		yaw: moveTo.yaw,
	// 		moveState: moveTo.moveState
	// 	}
  //     }
  //     else return item
  //   })
  // })),

  setBubble: (bubble) => set((state) => ({
    players: state.players.map((item) => {
      if(item.playerId === bubble.playerId) {
        return {
          ...item,
          bubbleText: bubble.text
        }
      }
      else return item
    })
  })),

  clearBubble: (playerId) => set((state) => ({
    players: state.players.map((item) => {
      if(item.playerId === playerId) {
        return {
          ...item,
          bubbleText: ""
        }
      }
      else return item
    })
  })),

  // setTeleport: (teleportAction) => set((state) => ({
	// players: state.players.map((item) => {
  //     if(item.playerId === teleportAction.playerId) {
  //       return {
  //         ...item,
  //         position: teleportAction.position,
  //         yaw: teleportAction.yaw
  //       }
  //     }
  //     else return item
	// })
  // })),

  setAnimation: (animateAction) => set((state) => ({
    players: state.players.map((item) => {
      if(item.playerId === animateAction.playerId) {
        return {
          ...item,
          animate_state: animateAction.animateState
        }
      }
      else return item
    })
  })),

  stopAnimation: (animateAction) => set((state) => ({
    players: state.players.map((item) => {
        if(item.playerId === animateAction.playerId) {
          return {
            ...item,
            animate_state: 0
          }
        }
        else return item
    })
  })),

  setMoveToInProgress: (inProgressState) => set((state) => ({
    players: state.players.map((item) => {
        if(item.playerId === inProgressState.playerId) {
          return {
            ...item,
            moveToInProgress: inProgressState.state
          }
        }
        else return item
    })
    })),

  setNearbyPlayerIds: (nearby) => set((state) => ({
    players: state.players.map((item) => {
        if(item.playerId === nearby.playerId) {
          return {
            ...item,
            nearbyPlayerIds: nearby.nearbyPlayerIds
          }
        }
        else return item
    })
    })),
}))


interface UseMoveToStore {
  moveToActions: MoveToAction[]
  setMoveToActions: (moveToActions: MoveToAction[]) => void;
}
export const useMoveTo = create<UseMoveToStore>((set) => ({
  moveToActions: [],
  setMoveToActions: (moveToActions) => set(() => ({ moveToActions }))
}))


interface UseMoveStore {
  moveActions: MoveAction[]
  setMoveActions: (moveActions: MoveAction[]) => void;
}
export const useMove = create<UseMoveStore>((set) => ({
  moveActions: [],
  setMoveActions: (moveActions) => set(() => ({ moveActions }))
}))


interface UseBubbleStore {
  bubbleActions: BubbleAction[]
  setBubbleActions: (bubbleActions: BubbleAction[]) => void;
}
export const useBubbles = create<UseBubbleStore>((set) => ({
  bubbleActions: [],
  setBubbleActions: (bubbleActions) => set(() => ({ bubbleActions }))
}))


interface UseTeleportsStore {
  teleportActions: TeleportAction[]
  setTeleportActions: (teleportActions: TeleportAction[]) => void,
}
export const useTeleports = create<UseTeleportsStore>((set) => ({
  teleportActions: [],
  setTeleportActions: (teleportActions) => set(() => ({
    teleportActions: [...teleportActions]
  })),
}))


interface UseAnimateStore {
  animateActions: AnimateAction[]
  setAnimateActions: (animateActions: AnimateAction[]) => void;
}
export const useAnimates = create<UseAnimateStore>((set) => ({
  animateActions: [],
  setAnimateActions: (animateActions) => set(() => ({ animateActions }))
}))


const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket>()
  const [messageData, setMessageData] = useState();
  const { players, addPlayers } = usePlayers();
  const { setTeleportActions } = useTeleports();
  const { setMoveToActions } = useMoveTo();
  const { setMoveActions } = useMove();
  const { setBubbleActions } = useBubbles();
  const { setAnimateActions } = useAnimates();

  const FromGameRef = useRef<protobuf.Type>();
  
  useEffect(() => {
    protobuf.load("TCProto.proto", function(err, root) {
      console.log("root", root)
      if (err)
        throw err;
      FromGameRef.current = (root as protobuf.Root).lookupType("FromGame");
    });
  }, [])

  useEffect(() => {
    const socket = new WebSocket(url);
    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      setMessageData(data)
      setSocket(socket);
    }
    socket.onopen = function () {
      socket.send("Hi, from the client.");
    };

    return () => {
      socket.close(); // 关闭WebSocket连接
    }
    
  }, [url]);


  useEffect(() => {
    if (messageData) {
      const data = messageData as ToGame;

      if (data.createPlayerReqsList && data.createPlayerReqsList.length > 0)
        {
          console.log("data.createPlayerReqsList", data.createPlayerReqsList)
          const newPlayers: CreatePlayerReq[] = [];
          data.createPlayerReqsList.map(newPlayer => {
            console.log(newPlayer, players)
            const playerInListIndex = players.findIndex(player => player.playerId === newPlayer.playerId);
            if (playerInListIndex < 0)
              newPlayers.push(newPlayer);
          })
          if (newPlayers.length > 0)
            addPlayers(newPlayers);
      }
      
      if (data.moveToActionsList && data.moveToActionsList.length > 0)
        setMoveToActions(data.moveToActionsList);

      if (data.moveActionsList && data.moveActionsList.length > 0 )
        setMoveActions(data.moveActionsList);
      
      if (data.bubbleActionsList && data.bubbleActionsList.length > 0 ) {
        // if (data.bubbleActions.length > 0) {
        //   data.bubbleActions.map((bubbleAction: BubbleAction) => {
        //     setBubble(bubbleAction);
        //     setTimeout(() => {
        //       clearBubble(bubbleAction.playerId);
        //     }, bubbleAction.duration);
        //   }) 
        // }
        setBubbleActions(data.bubbleActionsList);
      }

      if (data.teleportActionsList && data.teleportActionsList.length > 0)
        setTeleportActions(data.teleportActionsList);
      
      if (data.animateActionsList && data.animateActionsList.length > 0)
        setAnimateActions(data.animateActionsList);

      if (data.observeReq && socket) {
        console.log("players", players)
        if (FromGameRef.current) {
          const FromGame = FromGameRef.current;
          const message = FromGame.create({ playerStates: players });
          const buffer = FromGame.encode(message).finish();
          socket.send(buffer);
        }
      }
      
    }
  }, [messageData])
};


export default useWebSocket;
