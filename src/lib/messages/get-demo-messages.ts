import { MessageType, StoryType } from './types'

export const defaultMessages: MessageType[] = [
    {
      index: 0,
      sender: 'robot',
      content: '嘿，我是来帮你写精彩故事的。告诉我你们想一起创作什么样的故事，我会提出一个情节构想。',
      timestamp: new Date(),
    },
    {
      index: 1,
      sender: 'robot',
      content: '第一个问题，你的故事是为谁写的?',
      timestamp: new Date()
    },
    {
      index: 2,
      sender: 'user',
      content: {
        placeholder: "你的故事是为谁准备的？",
        questionIndex: 0,
        seletableChip: ["中国的儿童", "高中生"]
      },
      timestamp: new Date()
}]

export const getRobotMessages = (newMessage: string | StoryType, messagesLength: number, questionIndex: number) => {
    const robotMessages: MessageType[] = [{
        index: messagesLength,
        sender: 'robot',
        content: "",
        timestamp: new Date()
    }, {
        index: messagesLength + 1,
        sender: 'robot',
        content: "",
        timestamp: new Date()
    }]

    switch (questionIndex) {
        case 0:
            robotMessages[0].content = "好的，我会帮助你创造一个关于" + newMessage + "的故事";
            robotMessages[1].content = "请告诉我创作这个故事的目的是什么？";
            break;

        case 1:
            robotMessages[0].content = "好的，我会帮助你创造以" + newMessage + "为目的的故事";
            robotMessages[1].content = "这个故事属于什么类型呢？";
            break;

        case 2:
            robotMessages[0].content =  "好的！";
            robotMessages[1].content = "你还有什么关于这个故事的想法吗？";
            break;

    }

    return robotMessages;
}

export const getUserMessage = (newMessage: string | StoryType, index: number, questionIndex: number) => {
    const userMessage: MessageType = {
        index: index,
        sender: 'user',
        content: null,
        timestamp: new Date()
    };

    switch (questionIndex) {
        case 0:
            userMessage.content = {
                placeholder: '你的故事的目的？',
                questionIndex: 1,
                seletableChip: ["给他一个惊喜", "吸引我的YouTube观众", "为自己提供灵感"]
            };
            break;

        case 1:
            userMessage.content = {
                questionIndex: 2,
                seletableChip: ["幻想", "儿童故事", "动作", "浪漫", "冲突"]
            };
            break;

        case 2:
            userMessage.content = {
                questionIndex: 3,
                placeholder: '关于这个故事的想法？',
            };
            break;

        case 3:
        case 4:
            if (typeof newMessage === 'string') {
                userMessage.content = {
                    isFinal: true,
                    seletableChip: ["幻想", "儿童故事", "动作", "浪漫", "冲突"],
                    characters: [
                      {
                        name: "李白",
                        description: "被誉为“诗仙”，李白的诗作以其豪放、想象力丰富而闻名。"
                      },
                      {
                        name: "杜甫",
                        description: "被尊称为“诗圣”，杜甫的诗歌以其深沉、严肃的社会责任感著称。"
                      }
                    ],
                    outline: " - 唐朝的一个清幽夜晚，两位伟大的诗人——李白和杜甫，偶然在庐山的半山腰重逢。他们多年未见，彼此都已成为诗歌界的巨擘。这一夜，他们决定共同赏月，畅谈诗歌与人生。\n - 李白携带着酒壶，踏月而来，偶遇正在庐山寻找灵感的杜甫。二人惊喜交集，决定在月光下共度这难得的夜晚。\n - 他们找到一个可以俯瞰山谷，又能仰望星空的绝佳地点，放下行囊，开启了一场诗意盎然的夜谈。\n - 李白首先吟诵了他的新作，诗中充满了对自然的热爱和对自由的向往。他的诗歌如清泉般流淌，带着豪放不羁的气息。\n - 杜甫则分享了他观察社会、关注百姓生活的诗作，他的诗深沉而充满情感，反映了对时世的深刻思考。\n - 在交流诗歌之后，两位诗人开始了关于人生、理想与现实的哲学对话。李白表达了他追求自由、逍遥自在生活的理想，而杜甫则谈到了他对社会责任的认识，以及诗人在社会中应承担的角色。\n - 他们虽然在观点上有所不同，但都表达了对对方深深的尊敬和理解。\n - 通过夜长谈，他们发现尽管出发点不同，但彼此都怀有一颗想要通过诗歌改变世界的心。李白梦想通过诗歌引导人们寻找心灵的自由，杜甫则希望通过诗歌唤醒人们的社会责任感。\n - 在分别之际，他们约定将各自最好的诗篇刻在庐山的石壁上，作为他们友谊和理想的见证。\n - 日后，庐山上那些刻有李白和杜甫诗篇的石壁成为了后人朝圣的地方，见证了两位诗人对美、自由、责任和理想的追求。\n - 故事以传达一个信息结束：虽然时间流逝，但真挚的友谊和伟大的理想会像庐山上的诗篇一样，永远照亮后来人的道路。",
                };
            } else {    // StoryType
                userMessage.content = {
                    isFinal: true,
                    seletableChip: ["幻想", "儿童故事", "动作", "浪漫", "冲突"],
                    characters: [
                      {
                        name: newMessage.character[0].name,
                        description: newMessage.character[0].description
                      },
                      {
                        name: newMessage.character[1].name,
                        description: newMessage.character[1].description
                      }
                    ],
                    outline: newMessage.outline,
                };
            }
            break;
    }

    return userMessage;
}
