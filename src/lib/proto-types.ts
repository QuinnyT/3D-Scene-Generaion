// --------------------- General  --------------------
export interface IntVector {
	x: number
	y: number
	z: number
}

export enum MoveState {
	STOP,
	WALK,
	RUN,
	SPRINT
}

// --------------------- ToGame --------------------


interface ObserveReq {
	valid: boolean
	playerIds: number[]
	observeAllPlayers: boolean
}

interface CreatePlayerReq {
	playerId: number
	position: IntVector
	yaw: number
	model_id: number
	name: string
}

interface MoveAction {
	playerId: number
	moveState: MoveState
	yaw: number
}

interface BubbleAction {
	playerId: number
	text: string
	duration: number
}

interface TeleportAction {
	playerId: number
	position: IntVector
	yaw: number
}

interface AnimateAction {
	playerId: number
	animateState: number
	isRepeat: boolean
}

interface MoveToAction {
	playerId: number
	position: IntVector
	yaw: number
	moveState: MoveState
  abort: boolean
}

interface ChatAction {
	playerId: number
	chattingPlayerId: number
}

interface KeyPlotAction {
	playerId: number
	text: string
	eventId: number
}


interface ToGame {
    observeReq: ObserveReq
    createPlayerReqsList: CreatePlayerReq[]
	moveActionsList: MoveAction[]
	bubbleActionsList: BubbleAction[]
	teleportActionsList: TeleportAction[]
	animateActionsList: AnimateAction[]
	chatActionsList: ChatAction[]
	keyPlotActionsList: KeyPlotAction[]
	moveToActionsList: MoveToAction[]
}




// --------------------- FromGame --------------------


interface PlayerState {
	playerId: number
	position: IntVector
	moveState: MoveState
	yaw: number
	bubbleText: string
	animateState: number
	chattingPlayerId: number
	nearbyPlayerIds: number[]
	moveToInProgress: boolean
}

// ------------- related MoveTo --------------

// interface ToGame {
// 	move_to_actions: MoveToAction[]
// }



export type { CreatePlayerReq, MoveAction, BubbleAction, TeleportAction, AnimateAction, MoveToAction, ChatAction, ToGame, PlayerState }